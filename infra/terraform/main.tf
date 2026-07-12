# ==============================================================================
# 👑 ULTRAGOD L15 CORE INFRASTRUCTURE ORCHESTRATOR
# Architecture: Global Multi-Region, Zero-Trust Cells, Immutable State
# Provider Standards: HashiCorp Verified & Strict Lint Compliant
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. TERRAFORM & PROVIDER CONFIGURATION (THE ANCHOR)
# ------------------------------------------------------------------------------
terraform {
  required_version = ">= 1.8.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30"
    }
  }

  # L15 Rule: স্টেট ফাইল সবসময় রিমোট এবং ডায়নামোডিবি দিয়ে লকড থাকবে
  backend "s3" {
    bucket         = "ultrafaang-global-terraform-state"
    key            = "portfolio/infrastructure/prod/main.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "ultrafaang-infra-lock-table"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Owner       = "L15-Principal-Architecture-Group"
      ManagedBy   = "Terraform"
      Project     = "Ultrafaang-Core-Portfolio"
      BillingCode = "ULTRA-GOD-MODE"
    }
  }
}

# ------------------------------------------------------------------------------
# 2. NETWORKING CELL MODULE (THE FOUNDATION)
# ------------------------------------------------------------------------------
# Clean Architecture Rule: নেটওয়ার্ক লেয়ার সম্পূর্ণ আইসোলেটেড থাকবে
module "global_vpc" {
  source = "../../modules/vpc"

  vpc_cidr             = "10.150.0.0/16"
  availability_zones   = ["us-east-1a", "us-east-1b", "us-east-1c"]
  public_subnets       = ["10.150.1.0/24", "10.150.2.0/24", "10.150.3.0/24"]
  private_subnets      = ["10.150.10.0/24", "10.150.11.0/24", "10.150.12.0/24"]
  database_subnets     = ["10.150.20.0/24", "10.150.21.0/24", "10.150.22.0/24"]
  
  # FAANG Standard: হাইলি রিডান্ড্যান্ট, প্রতি জোনে আলাদা ডেডিকেটেড NAT Gateway
  enable_nat_gateway     = true
  single_nat_gateway     = false
  one_nat_gateway_per_az = true
  
  enable_dns_hostnames = true
  enable_dns_support   = true
}

# ------------------------------------------------------------------------------
# 3. COMPUTE LAYER - MANAGED KUBERNETES (THE ENGINE)
# ------------------------------------------------------------------------------
module "eks_cluster" {
  source = "../../modules/eks_cluster"

  cluster_name    = "${var.project_name}-${var.environment}-eks"
  cluster_version = "1.30"
  
  vpc_id     = module.global_vpc.vpc_id
  subnet_ids = module.global_vpc.private_subnet_ids

  # Zero-Trust Security: পাবলিক এন্ডপয়েন্ট পুরোপুরি ডিসেবলড, অ্যাক্সেস শুধু ভিপিএন দিয়ে
  cluster_endpoint_public_access  = false
  cluster_endpoint_private_access = true

  # Node Groups Definition (Separation of Concerns across multi-node categories)
  managed_node_groups = {
    # গড-লেভেল সার্ভিস পরিচালনার জন্য ডেডিকেটেড পুল
    ultragod_pool = {
      min_size       = 3
      max_size       = 50
      desired_size   = 12
      instance_types = ["c6i.2xlarge"] # Compute Optimized for API layers
      capacity_type  = "ON_DEMAND"
      
      labels = {
        role = "enterprise-core"
      }
      taints = [{
        key    = "dedicated"
        value  = "ultragod-pool"
        effect = "NO_SCHEDULE"
      }]
    },
    stateless_pool = {
      min_size       = 5
      max_size       = 20
      desired_size   = 5
      instance_types = ["m6i.xlarge", "m6a.xlarge"]
      capacity_type  = "SPOT"
      
      labels = {
        role = "stateless-frontend"
      }
    }
  }

  # L15 Secret: IRSA (IAM Roles for Service Accounts) ইনেবল করা
  enable_irsa = true
}

# ------------------------------------------------------------------------------
# 4. DATA STORAGE LAYER (THE SOURCE OF TRUTH)
# ------------------------------------------------------------------------------
module "rds_aurora" {
  source = "../../modules/rds_aurora"

  cluster_identifier = "${var.project_name}-${var.environment}-aurora-db"
  engine             = "aurora-postgresql"
  engine_version     = "16.1"
  
  vpc_id             = module.global_vpc.vpc_id
  subnets            = module.global_vpc.database_subnet_ids
  allowed_cidr_blocks = module.global_vpc.private_subnet_cidrs # শুধু প্রাইভেট পড থেকে কানেকশন নিবে

  instances = {
    primary = {
      instance_class = "db.r6i.2xlarge" # Memory Optimized
    }
    replica_1 = {
      instance_class = "db.r6i.2xlarge"
      promotion_tier = 1
    }
  }

  storage_encrypted   = true
  skip_final_snapshot = false
  deletion_protection = true # L15 Safe Guard: কেউ ভুল করেও প্রোডাকশন ডাটা ওড়াতে পারবে না
}

# ------------------------------------------------------------------------------
# 5. GLOBAL CONTENT DELIVERY & EDGE (THE SHIELD)
# ------------------------------------------------------------------------------
resource "aws_cloudfront_distribution" "portfolio_cdn" {
  comment = "UltraFAANG L15 Portfolio Edge Network"
  
  enabled             = true
  is_ipv6_enabled     = true
  price_class         = "PriceClass_All" # বিশ্বজুড়ে ১ মিলিসেকেন্ড লেটেন্সি টার্গেট
  http_version        = "http2and3"      # HTTP/3 এনগেজড

  origin {
    domain_name = module.global_vpc.alb_dns_name
    origin_id   = "EKS-LoadBalancer-Origin"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "https-only"
      origin_ssl_protocols     = ["TLSv1.2", "TLSv1.3"]
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "EKS-LoadBalancer-Origin"

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.global_acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}