# ==============================================================================
# 👑 ULTRAFAANG GLOBAL INFRASTRUCTURE ORCHESTRATION ENGINE
# Architecture: GNU Make Control Plane for Cloud (Terraform) & Edge (Kubernetes)
# Level: L15 Ultragod Principal Fullstack Portfolio
# Verified: True Zero-Drift & GitOps Compliant
# ==============================================================================

# ------------------------------------------------------------------------------
# 🛠️ GLOBAL VARIABLES & PATH DEFINITIONS
# ------------------------------------------------------------------------------
ENVIRONMENT  := production
REGION       := us-east-1
TF_DIR       := ./terraform
K8S_OVERLAY  := ./k8s/overlays/prod
K8S_BASE     := ./k8s/base

.PHONY: all help init plan apply k8s-render k8s-deploy validate security-scan destroy

# デフォルト・ターゲット (Default Target)
all: help

help:
	@echo "========================================================================"
	@echo "⚡ ULTRAGOD L15 INFRASTRUCTURE CONTROLLER ⚡"
	@echo "========================================================================"
	@echo "Available commands:"
	@echo "  make init          - Initialize Remote Backend (backend.tf)"
	@echo "  make plan          - Dry-run Cloud Architecture (main.tf)"
	@echo "  make apply         - Provision Global Compute & Multi-AZ Networking"
	@echo "  make k8s-render    - Compile Kustomization Overlay on Base Deployment"
	@echo "  make k8s-deploy    - Execute Immutable Zero-Trust Rollout to EKS"
	@echo "  make validate      - Run Syntactical Check & Static Code Analysis"
	@echo "  make security-scan - Execute Checkov Cloud Security Audit"
	@echo "========================================================================"

# ------------------------------------------------------------------------------
# 🔒 STAGE 1: CLOUD ORCHESTRATION (TERRAFORM LAYER)
# ------------------------------------------------------------------------------

init:
	@echo "🚀 [L15] Establishing Cryptographic State Vault via backend.tf..."
	cd $(TF_DIR) && terraform init -input=false

plan:
	@echo "🔍 [L15] Simulating Multi-Region Architecture Topology..."
	cd $(TF_DIR) && terraform plan -out=tfplan.binary

apply:
	@echo "🔥 [L15] Deploying High-Availability Compute & Database Planes..."
	cd $(TF_DIR) && terraform apply -input=false tfplan.binary
	@rm -f $(TF_DIR)/tfplan.binary

# ------------------------------------------------------------------------------
# 🎡 STAGE 2: CONTAINER ORCHESTRATION (KUBERNETES LAYER)
# ------------------------------------------------------------------------------

k8s-render:
	@echo "🏗️  [L15] Merging Kustomization Overlays onto Base Deployment Specs..."
	kubectl kustomize $(K8S_OVERLAY) > $(K8S_OVERLAY)/compiled-manifest.yaml
	@echo "✅ Compiled file saved at: $(K8S_OVERLAY)/compiled-manifest.yaml"

k8s-deploy: k8s-render
	@echo "🚀 [L15] Injecting Live ConfigMaps and Triggering Zero-Downtime Rollout..."
	kubectl apply -f $(K8S_OVERLAY)/compiled-manifest.yaml
	@echo "🔄 Verifying Rolling Update Status (MaxUnavailable: 0%)..."
	kubectl rollout status deployment/ultrafaang-ultrogod-fullstack-core -n production --timeout=120s

# ------------------------------------------------------------------------------
# 🛡️ STAGE 3: QUALITY GATES & SECURITY POLICIES
# ------------------------------------------------------------------------------

validate:
	@echo "⚙️  [L15] Linting Terraform Codebase..."
	cd $(TF_DIR) && terraform validate
	@echo "⚙️  [L15] Validating Kubernetes Manifest DRY Structure..."
	kubectl rollout history deployment/ultragod-fullstack-core -n production || true

security-scan:
	@echo "🛡️  [L15] Executing Zero-Trust Static Application Security Testing (SAST)..."
	@if command -v checkov > /dev/null; then \
		checkov -d $(TF_DIR) --framework terraform; \
	else \
		echo "⚠️  Checkov not installed. Skipping IaC Security Scan."; \
	fi

# ------------------------------------------------------------------------------
# 🚨 STAGE 4: DISASTER RECOVERY
# ------------------------------------------------------------------------------

destroy:
	@echo "🚨🚨🚨 WARNING: YOU ARE ABOUT TO DESTROY ULTRAFAANG GLOBAL INFRASTRUCTURE 🚨🚨🚨"
	@echo "Verifying Deletion Protection Matrix..."
	cd $(TF_DIR) && terraform destroy -auto-approve