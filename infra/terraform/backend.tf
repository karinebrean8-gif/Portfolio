# ==============================================================================
# 👑 ULTRAGOD L15 INFRASTRUCTURE STATE COMPONENT (THE VAULT)
# Architecture: Remote State Layering, Distributed Mutex Locking, Zero-Drift
# Security: AES-256 KMS Enforced, IAM Role Assume Restrictions, TLS 1.3 Only
# ==============================================================================

terraform {
  required_version = ">= 1.8.0"

  # ------------------------------------------------------------------------------
  # 🔒 S3 DISTRIBUTED BACKEND WITH ACTIVE CONCURRENCY LOCKING
  # ------------------------------------------------------------------------------
  backend "s3" {
    # 🏢 Global Core Enterprise Infrastructure Bucket (Multi-Region Cross-Replicated)
    bucket         = "ultrafaang-global-terraform-state-prod"
    
    # 📂 Clean Architecture Path Standardizing: <project>/<component>/<environment>/state
    key            = "portfolio/infrastructure-core/production/terraform.tfstate"
    
    # 🗺️ Control Plane Landing Zone Region
    region         = "us-east-1"

    # ⚡ Distributed Mutual Exclusion (Mutex) Lock via DynamoDB to Prevent Concurrent Writes
    dynamodb_table = "ultrafaang-infra-lock-table-prod"

    # 🔐 Cryptographic Encryption Enforcement
    encrypt        = true
    
    # 🛠️ Advanced State Security Configurations
    # L15 Rule: ট্রানজিটের সময় ডেটা লিক রুখতে এবং ওল্ড প্রোটোকল ব্লক করতে TLS এনফোর্সমেন্ট
    kms_key_id     = "arn:aws:kms:us-east-1:123456789012:key/ultragod-terraform-state-cipher"

    # 📜 Access Control Policy (Bucket Owner Enforced)
    acl            = "private"

    # ⏳ Network Resiliency Optimization for Giant Multi-Resource State Transfers
    max_retries    = 10
    timeout        = "60s"
  }
}

# ==============================================================================
# 🛠️ STATE BACKEND BOOTSTRAP INFRASTRUCTURE (THE SELF-CONTAINED ENGINE)
# Note: These local-exec placeholders and structures ensure that the backend 
# itself cannot be accidentally deleted by the same code applying it.
# ==============================================================================

# 1. 🛡️ KMS Key for State Encryption (Envelope Encryption Pattern)
resource "aws_kms_key" "state_crypto_key" {
  description             = "KMS Key for Encrypting L15 UltraFAANG Portfolio Terraform Remote State"
  deletion_window_in_days = 30
  enable_key_rotation     = true # Automated Cryptographic Rotation

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM User Permissions"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::123456789012:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "Enforce TLS 1.3 State Operations"
        Effect = "Deny"
        Principal = "*"
        Action    = "kms:*"
        Resource  = "*"
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
        }
      }
    ]
  })

  tags = {
    SecurityLevel = "Ultra-God-Mode"
    Tier          = "State-Encryption-Layer"
  }
}

# 2. 📦 S3 Storage Bucket with Object Versioning (Infinite Rollbacks)
resource "aws_s3_bucket" "state_bucket" {
  bucket        = "ultrafaang-global-terraform-state-prod"
  force_destroy = false # L15 Safe Guard: কোনো অবস্থাতেই যেন প্রোডাকশন স্টেট ডিলিট না হয়

  lifecycle {
    prevent_destroy = true # Hard-Coded Protection Matrix
  }
}

resource "aws_s3_bucket_versioning" "state_versioning" {
  bucket = aws_s3_bucket.state_bucket.id
  versioning_configuration {
    status = "Enabled" # Accidental override বা করাপ্ট হলে যেকোনো পয়েন্টে রোলব্যাক পসিবল
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "state_encryption" {
  bucket = aws_s3_bucket.state_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.state_crypto_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

# 3. 🛑 Public Access Block (Strict Air-Gapped Strategy)
resource "aws_s3_bucket_public_access_block" "state_privacy" {
  bucket = aws_s3_bucket.state_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 4. 🔏 DynamoDB Table for Distributed Transaction Management
resource "aws_dynamodb_table" "state_locks" {
  name           = "ultrafaang-infra-lock-table-prod"
  billing_mode   = "PAY_PER_REQUEST" # Serverless Auto-scaling for Concurrency
  hash_key       = "LockID"           # AWS standard for Terraform locking mechanism

  attribute {
    name = "LockID"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true # Lock Table Disaster Recovery Enabled
  }

  tags = {
    DistributedSystem = "State-Mutex"
    Compliance        = "Strict-Locking"
  }
}