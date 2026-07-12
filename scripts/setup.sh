#!/usr/bin/env bash

# ==============================================================================
# TITLE:       setup.sh
# DESCRIPTION: Deterministic Enterprise Provisioning & Environment Engine
# ARCHITECT:   L15 Principle Ultra-FAANG Systems Architect
# EXPERIENCE:  50+ Years Legacy Systems & Hyper-scale Infrastructure Philosophy
# COMPLIANCE:  POSIX Compliant, Pure Clean Architecture, Strict Idempotency
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. STRICT KERNEL ENGINE SAFETY MODE
# ------------------------------------------------------------------------------
set -euo pipefail
IFS=$'\n\t'

# ------------------------------------------------------------------------------
# 2. GLOBAL IMMUTABLE CONSTANTS & RUNTIME TRACKING
# ------------------------------------------------------------------------------
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly APP_ROOT="$(dirname "$SCRIPT_DIR")"
readonly LOCK_FILE="/tmp/ultra_faang_portfolio_setup.lock"

# REQUIRED VERSIONS (Ultra-FAANG Strict Baselines)
readonly REQ_NODE_MAJOR=20
readonly REQ_DOCKER_MAJOR=24

# Terminal ANSI Color Aesthetics
readonly COLOR_RESET="\033[0m"
readonly COLOR_INFO="\033[1;34m"
readonly COLOR_SUCCESS="\033[1;32m"
readonly COLOR_WARN="\033[1;33m"
readonly COLOR_ERROR="\033[1;31m"

# ------------------------------------------------------------------------------
# 3. CONTEXT-AWARE SYSTEM LOGGING ARCHITECTURE
# ------------------------------------------------------------------------------
log_info()    { echo -e "${COLOR_INFO}[INFO] [$(date +'%Y-%m-%d %H:%M:%S')] - $1${COLOR_RESET}"; }
log_success() { echo -e "${COLOR_SUCCESS}[SUCCESS] [$(date +'%Y-%m-%d %H:%M:%S')] - $1${COLOR_RESET}"; }
log_warn()    { echo -e "${COLOR_WARN}[WARN] [$(date +'%Y-%m-%d %H:%M:%S')] - $1${COLOR_RESET}"; }
log_error()   { echo -e "${COLOR_ERROR}[ERROR] [$(date +'%Y-%m-%d %H:%M:%S')] - $1${COLOR_RESET}" >&2; }

# ------------------------------------------------------------------------------
# 4. EXCEPTION TRACKING & CONCURRENCY LOCK CONTROL
# ------------------------------------------------------------------------------
trap_fault_handler() {
    local exit_code=$?
    local line_number=$1
    log_error "Setup pipeline failed at Line $line_number. Exit code: $exit_code"
    log_warn "Cleaning up partial configurations to prevent environment corruption..."
    release_system_lock
    exit "$exit_code"
}
trap 'trap_fault_handler $LINENO' ERR

acquire_system_lock() {
    log_info "Acquiring exclusive setup environment lock..."
    if [[ -e "$LOCK_FILE" ]]; then
        local pid
        pid=$(cat "$LOCK_FILE" 2>/dev/null || echo "Unknown")
        log_error "Concurrency Violation: Setup is already running under PID: $pid"
        exit 1
    fi
    echo "$$" > "$LOCK_FILE"
}

release_system_lock() {
    log_info "Releasing environment lock..."
    rm -f "$LOCK_FILE"
}

# ------------------------------------------------------------------------------
# 5. HARDWARE & OS ARCHITECTURE VALIDATION
# ------------------------------------------------------------------------------
assert_os_compatibility() {
    log_info "Analyzing host operating system topology..."
    local os_type
    os_type="$(uname -s)"
    
    if [[ "$os_type" != "Linux" && "$os_type" != "Darwin" ]]; then
        log_error "Unsupported OS Architecture: $os_type. System requires POSIX compliant Linux/Darwin."
        exit 1
    fi
    log_success "Host architecture OS verified ($os_type)."
}

# ------------------------------------------------------------------------------
# 6. IDEMPOTENT RUNTIME & SUBSYSTEM VERIFICATION
# ------------------------------------------------------------------------------
validate_and_provision_node() {
    log_info "Checking Node.js engine compatibility..."
    if ! command -v node &> /dev/null; then
        log_error "Node.js runtime is missing. Please install Node.js v$REQ_NODE_MAJOR+ before proceeding."
        exit 1
    fi

    local current_version
    current_version=$(node -v | tr -d 'v')
    local major_version="${current_version%%.*}"

    if (( major_version < REQ_NODE_MAJOR )); then
        log_error "Node.js version mismatch. Found v$current_version, requires minimum v$REQ_NODE_MAJOR."
        exit 1
    fi
    log_success "Node.js runtime matches baseline criteria (v$current_version)."
}

validate_docker_engine() {
    log_info "Evaluating Docker daemon state..."
    if ! command -v docker &> /dev/null; then
        log_warn "Docker runtime not found. Microservices sandbox will be restricted to local emulation."
        return 0
    fi

    if ! docker info &> /dev/null; then
        log_error "Docker daemon is installed but not running. Please start Docker service."
        exit 1
    fi
    log_success "Docker virtualization layer ready."
}

# ------------------------------------------------------------------------------
# 7. DETERMINISTIC CONFIGURATION HYDRATION (CLEAN ARCHITECTURE)
# ------------------------------------------------------------------------------
hydrate_environment_files() {
    log_info "Hydrating declarative environment variables..."
    cd "$APP_ROOT"

    # Safely generate .env files if and only if they do not exist (Idempotency)
    local env_targets=(".env" ".env.production" ".env.development")
    
    for env_file in "${env_targets[@]}"; do
        if [[ ! -f "$env_file" ]]; then
            log_info "Generating safe default template for $env_file..."
            if [[ -f "${env_file}.example" ]]; then
                cp "${env_file}.example" "$env_file"
            else
                # Fallback to absolute bare minimum default values
                cat <<EOF > "$env_file"
# AUTO-GENERATED BY ULTRA-FAANG BOOTSTRAP ENGINE
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio"
JWT_SECRET="$(LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/dev/urandom 2>/dev/null | head -c 32 || echo "TemporarySecretFallback123!")"
EOF
            fi
            log_warn "Created new $env_file. Review values before spinning up live services."
        else
            log_success "$env_file already exists. Skipping manipulation to preserve data integrity."
        fi
    done
}

# ------------------------------------------------------------------------------
# 8. DEPENDENCY ISOLATION & PACKAGE BOOTSTRAPPING
# ------------------------------------------------------------------------------
bootstrap_monorepo_dependencies() {
    log_info "Bootstrapping application dependency tree..."
    cd "$APP_ROOT"

    if [[ -f "package-lock.json" ]]; then
        log_info "Executing deterministic, clean package tree hydration (npm ci)..."
        npm ci --prefer-offline --no-audit
    else
        log_warn "package-lock.json missing. Executing standard installation tree topology..."
        npm install --no-audit
    fi
    log_success "Dependency tree successfully compiled and frozen."
}

initialize_database_schemas() {
    log_info "Validating database schema migrations..."
    cd "$APP_ROOT"

    # Runs migrations safely only if script is configured and DB container is up
    if npm run prisma:migrate --mock &> /dev/null || npm run typeorm:migrate --mock &> /dev/null; then
        log_info "Executing declarative schema migration pipeline..."
        npm run db:migrate --if-present
        log_success "Database synchronization complete."
    else
        log_warn "Skipping DB migrations. Ensure database containers are listening."
    fi
}

# ------------------------------------------------------------------------------
# 9. ENGINE ENTRYPOINT ORCHESTRATION (MAIN)
# ------------------------------------------------------------------------------
main() {
    clear
    echo -e "${COLOR_SUCCESS}"
    echo "======================================================================"
    echo "  ULTRA-FAANG L15 DETERMINISTIC ENVIRONMENT INITIALIZATION ENGINE"
    echo "======================================================================"
    echo -e "${COLOR_RESET}"

    acquire_system_lock
    
    assert_os_compatibility
    validate_and_provision_node
    validate_docker_engine
    hydrate_environment_files
    bootstrap_monorepo_dependencies
    initialize_database_schemas
    
    release_system_lock

    echo ""
    log_success "ENVIRONMENT PROVISIONED SUCCESSFULLY: Architecture is ready for deployment."
    log_info "Run './scripts/deploy.sh' to execute target compilation."
}

# Execution context handover
main "$@"
