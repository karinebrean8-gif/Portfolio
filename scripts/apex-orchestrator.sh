#!/usr/bin/env bash

set -Eeuo pipefail
IFS=$'\n\t'
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
LOCK_FILE="/tmp/ultrafaang-orchestrator.lock"
NODE_REQUIRED_MAJOR=20
PNPM_VERSION=9
ENVIRONMENT="${ENVIRONMENT:-production}"
NAMESPACE="${NAMESPACE:-production}"
APP_NAME="${APP_NAME:-ultrafaang-portfolio}"
K8S_OVERLAY="$PROJECT_ROOT/infra/k8s/overlays/$ENVIRONMENT"
BUILD_DIR="/tmp/ultrafaang-build"
TIMEOUT="${DEPLOYMENT_TIMEOUT:-300s}"
log() {
  echo "[ORCHESTRATOR] $1"
}
error() {
  echo "[ERROR] $1" >&2
}
fail() {
  error "$1"
  exit 1
}
cleanup() {
  rm -f "$LOCK_FILE"
}
trap cleanup EXIT
trap 'error "Failed at line $LINENO"; exit $?' ERR
require_command() {
  command -v "$1" >/dev/null 2>&1 ||
    fail "$1 is required"
}
acquire_lock() {
  [[ -f "$LOCK_FILE" ]] &&
    fail "Another orchestrator instance is running"
  echo "$$" > "$LOCK_FILE"
}
validate_runtime() {
  log "Validating runtime"
  require_command node
  require_command pnpm
  local version major
  version=$(node -v | tr -d "v")
  major="${version%%.*}"

  (( major >= NODE_REQUIRED_MAJOR )) ||
    fail "Node ${NODE_REQUIRED_MAJOR}+ required"

  log "Node $version validated"
}
prepare_environment() {
  log "Preparing environment"
  cd "$PROJECT_ROOT"
  [[ -f ".env" ]] && return
  [[ -f ".env.example" ]] ||
    fail ".env.example missing"
  cp .env.example .env
  log "Environment created"
}
install_dependencies() 
  log "Installing dependencies"
  cd "$PROJECT_ROOT"
  corepack enable
  corepack prepare pnpm@"$PNPM_VERSION" --activate
  pnpm install --frozen-lockfile
}
generate_prisma() {
  log "Generating Prisma client"
  cd "$PROJECT_ROOT"
  [[ -d prisma ]] &&
    pnpm prisma generate
}
seed_database() {
  log "Running database seed"
  [[ "$ENVIRONMENT" != "production" ]] ||
    fail "Production seed blocked"
  cd "$PROJECT_ROOT"
  pnpm prisma db seed
}
build_application() {
  log "Building application"
  cd "$PROJECT_ROOT"
  pnpm build
}
deploy_kubernetes() {
  log "Deploying Kubernetes resources"
  require_command kubectl
  [[ -d "$K8S_OVERLAY" ]] ||
    fail "Missing Kubernetes overlay"
  mkdir -p "$BUILD_DIR"
  local manifest="$BUILD_DIR/$ENVIRONMENT.yaml"
  kubectl kustomize "$K8S_OVERLAY" \
    > "$manifest"
  kubectl apply \
    -f "$manifest" \
    -n "$NAMESPACE"
  kubectl rollout status \
    deployment/"$APP_NAME" \
    -n "$NAMESPACE" \
    --timeout="$TIMEOUT"
}
setup_pipeline() {
  validate_runtime
  prepare_environment
  install_dependencies
  generate_prisma
}
deploy_pipeline() {

  build_application
  deploy_kubernetes
}
run_all() {
  setup_pipeline
  seed_database
  deploy_pipeline
}
main() {
  local command="${1:-all}"
  acquire_lock
  case "$command" in
    setup)
      setup_pipeline
      ;;
    seed)
      seed_database
      ;;
    deploy)
      deploy_pipeline
      ;;
    all)
      run_all
      ;;
    *)
      fail "Usage: $0 {setup|seed|deploy|all}"
      ;;
  esac
  log "Pipeline completed successfully"
}
main "$@"
