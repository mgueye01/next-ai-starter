#!/bin/bash
# =============================================================================
# Story 4-1: Configuration Production - elGato Photo
# =============================================================================
# Ce script configure l'infrastructure de production:
# - 1Password secrets
# - MinIO bucket et utilisateur
# - Instructions DNS Cloudflare
# =============================================================================

set -e

# Couleurs pour l'output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Configuration Production elGato Photo ===${NC}"
echo ""

# =============================================================================
# Variables (générées le $(date +%Y-%m-%d))
# =============================================================================

# Secrets générés
NEXTAUTH_SECRET="a4f015325e12ba8659a1dd19e85228fd46acd6616e0415364eac8ce6ef793344"
CLIENT_JWT_SECRET="f61e21fcab7a71e27dbb2d21e86dc36f41a3b02416030e97ab9ac2cb6285ccf8"
INIT_POSTGRES_PASS="4TvgWNcmXgrAeAHoJ8WxoTW5"
AWS_SECRET_ACCESS_KEY="kjLamRRmBKtutRYZpVUnx22FLigIHxXr"

# Configuration
POSTGRES_HOST="postgres16-rw.databases.svc.cluster.local"
POSTGRES_DB="elgato_photo"
POSTGRES_USER="elgato_photo"
MINIO_ENDPOINT="http://192.168.0.18:9000"
MINIO_USER="elgatophoto"
BUCKET_NAME="elgatophoto"
DOMAIN="elgato-photo.fr"

# =============================================================================
# Étape 1: 1Password
# =============================================================================
setup_1password() {
    echo -e "${YELLOW}[1/3] Configuration 1Password${NC}"
    echo ""

    # Vérifier si op est disponible (bypass alias)
    OP_BIN=$(command -v op 2>/dev/null || echo "/opt/homebrew/bin/op")

    if [[ ! -x "$OP_BIN" ]] || [[ "$OP_BIN" == *"alias"* ]]; then
        OP_BIN="/opt/homebrew/bin/op"
    fi

    if [[ ! -x "$OP_BIN" ]]; then
        echo -e "${RED}1Password CLI non trouvé. Installez-le avec:${NC}"
        echo "  brew install 1password-cli"
        echo ""
        echo -e "${YELLOW}Commande manuelle à exécuter:${NC}"
        cat << EOF
op item create \\
  --vault "Kubernetes" \\
  --category "Database" \\
  --title "elgato-photo" \\
  'INIT_POSTGRES_DBNAME[text]=${POSTGRES_DB}' \\
  'INIT_POSTGRES_HOST[text]=${POSTGRES_HOST}' \\
  'INIT_POSTGRES_USER[text]=${POSTGRES_USER}' \\
  'INIT_POSTGRES_PASS[password]=${INIT_POSTGRES_PASS}' \\
  'DATABASE_URL[password]=postgresql://${POSTGRES_USER}:${INIT_POSTGRES_PASS}@${POSTGRES_HOST}:5432/${POSTGRES_DB}' \\
  'NEXTAUTH_SECRET[password]=${NEXTAUTH_SECRET}' \\
  'NEXTAUTH_URL[text]=https://${DOMAIN}' \\
  'CLIENT_JWT_SECRET[password]=${CLIENT_JWT_SECRET}' \\
  'S3_ENDPOINT[text]=${MINIO_ENDPOINT}' \\
  'S3_PUBLIC_URL[text]=https://s3.g-eye.io/${BUCKET_NAME}' \\
  'AWS_ACCESS_KEY_ID[text]=${MINIO_USER}' \\
  'AWS_SECRET_ACCESS_KEY[password]=${AWS_SECRET_ACCESS_KEY}' \\
  'AWS_REGION[text]=us-east-1' \\
  'BUCKET_NAME[text]=${BUCKET_NAME}'
EOF
        return 1
    fi

    echo "Création de l'item 1Password..."
    "$OP_BIN" item create \
      --vault "Kubernetes" \
      --category "Database" \
      --title "elgato-photo" \
      "INIT_POSTGRES_DBNAME[text]=${POSTGRES_DB}" \
      "INIT_POSTGRES_HOST[text]=${POSTGRES_HOST}" \
      "INIT_POSTGRES_USER[text]=${POSTGRES_USER}" \
      "INIT_POSTGRES_PASS[password]=${INIT_POSTGRES_PASS}" \
      "DATABASE_URL[password]=postgresql://${POSTGRES_USER}:${INIT_POSTGRES_PASS}@${POSTGRES_HOST}:5432/${POSTGRES_DB}" \
      "NEXTAUTH_SECRET[password]=${NEXTAUTH_SECRET}" \
      "NEXTAUTH_URL[text]=https://${DOMAIN}" \
      "CLIENT_JWT_SECRET[password]=${CLIENT_JWT_SECRET}" \
      "S3_ENDPOINT[text]=${MINIO_ENDPOINT}" \
      "S3_PUBLIC_URL[text]=https://s3.g-eye.io/${BUCKET_NAME}" \
      "AWS_ACCESS_KEY_ID[text]=${MINIO_USER}" \
      "AWS_SECRET_ACCESS_KEY[password]=${AWS_SECRET_ACCESS_KEY}" \
      "AWS_REGION[text]=us-east-1" \
      "BUCKET_NAME[text]=${BUCKET_NAME}"

    echo -e "${GREEN}✓ Item 1Password créé${NC}"
    echo ""
}

# =============================================================================
# Étape 2: MinIO
# =============================================================================
setup_minio() {
    echo -e "${YELLOW}[2/3] Configuration MinIO${NC}"
    echo ""

    # Vérifier si mc est disponible
    if ! command -v mc &> /dev/null; then
        echo -e "${RED}MinIO Client (mc) non trouvé. Installez-le avec:${NC}"
        echo "  brew install minio/stable/mc"
        echo ""
        echo -e "${YELLOW}Commandes manuelles à exécuter:${NC}"
        cat << EOF
mc alias set minio ${MINIO_ENDPOINT} ADMIN_USER ADMIN_PASS
mc mb minio/${BUCKET_NAME}
mc admin user add minio ${MINIO_USER} ${AWS_SECRET_ACCESS_KEY}

cat > /tmp/elgatophoto-policy.json << 'POLICY'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::${BUCKET_NAME}", "arn:aws:s3:::${BUCKET_NAME}/*"]
    }
  ]
}
POLICY

mc admin policy create minio elgatophoto-policy /tmp/elgatophoto-policy.json
mc admin policy attach minio elgatophoto-policy --user ${MINIO_USER}
EOF
        return 1
    fi

    # Vérifier si l'alias minio existe
    if ! mc alias list | grep -q "^minio"; then
        echo -e "${RED}Alias MinIO 'minio' non configuré.${NC}"
        echo "Configurez-le avec: mc alias set minio ${MINIO_ENDPOINT} ADMIN_USER ADMIN_PASS"
        return 1
    fi

    echo "Création du bucket..."
    mc mb "minio/${BUCKET_NAME}" --ignore-existing

    echo "Création de l'utilisateur service..."
    mc admin user add minio "${MINIO_USER}" "${AWS_SECRET_ACCESS_KEY}" 2>/dev/null || \
        echo "  (utilisateur existe peut-être déjà)"

    echo "Création de la policy..."
    cat > /tmp/elgatophoto-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::${BUCKET_NAME}", "arn:aws:s3:::${BUCKET_NAME}/*"]
    }
  ]
}
EOF

    mc admin policy create minio elgatophoto-policy /tmp/elgatophoto-policy.json 2>/dev/null || \
        echo "  (policy existe peut-être déjà)"
    mc admin policy attach minio elgatophoto-policy --user "${MINIO_USER}" 2>/dev/null || \
        echo "  (policy déjà attachée)"

    rm -f /tmp/elgatophoto-policy.json

    echo -e "${GREEN}✓ MinIO configuré${NC}"
    echo ""
}

# =============================================================================
# Étape 3: DNS Cloudflare (instructions)
# =============================================================================
show_dns_instructions() {
    echo -e "${YELLOW}[3/3] Configuration DNS Cloudflare${NC}"
    echo ""
    echo -e "${BLUE}Ajoutez ces records dans Cloudflare Dashboard:${NC}"
    echo ""
    echo "  Type    | Name              | Content           | Proxy"
    echo "  --------|-------------------|-------------------|-------"
    echo "  A       | elgato-photo.fr   | VOTRE_IP_PUBLIQUE | Yes"
    echo "  CNAME   | www               | elgato-photo.fr   | Yes"
    echo ""
    echo -e "${YELLOW}Note: Remplacez VOTRE_IP_PUBLIQUE par l'IP publique de votre connexion.${NC}"
    echo ""
}

# =============================================================================
# Vérification
# =============================================================================
verify_setup() {
    echo -e "${BLUE}=== Vérification ===${NC}"
    echo ""

    # 1Password
    echo -n "1Password item: "
    if command -v op &> /dev/null; then
        if op item get "elgato-photo" --vault "Kubernetes" &> /dev/null; then
            echo -e "${GREEN}✓${NC}"
        else
            echo -e "${RED}✗ (item non trouvé)${NC}"
        fi
    else
        echo -e "${YELLOW}? (op CLI non disponible)${NC}"
    fi

    # MinIO
    echo -n "MinIO bucket: "
    if command -v mc &> /dev/null; then
        if mc ls "minio/${BUCKET_NAME}" &> /dev/null; then
            echo -e "${GREEN}✓${NC}"
        else
            echo -e "${RED}✗ (bucket non trouvé)${NC}"
        fi
    else
        echo -e "${YELLOW}? (mc CLI non disponible)${NC}"
    fi

    # DNS
    echo -n "DNS ${DOMAIN}: "
    if dig +short "${DOMAIN}" | grep -q .; then
        echo -e "${GREEN}✓${NC}"
    else
        echo -e "${YELLOW}? (pas encore propagé ou non configuré)${NC}"
    fi

    echo ""
}

# =============================================================================
# Main
# =============================================================================
main() {
    case "${1:-all}" in
        1password)
            setup_1password
            ;;
        minio)
            setup_minio
            ;;
        dns)
            show_dns_instructions
            ;;
        verify)
            verify_setup
            ;;
        all)
            setup_1password || true
            echo ""
            setup_minio || true
            echo ""
            show_dns_instructions
            echo ""
            verify_setup
            ;;
        *)
            echo "Usage: $0 [1password|minio|dns|verify|all]"
            exit 1
            ;;
    esac
}

main "$@"
