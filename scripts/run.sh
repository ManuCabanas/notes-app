#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONT_DIR="$ROOT_DIR/frontend"
BACK_DIR="$ROOT_DIR/backend"

info() { echo -e "\033[1;34m[INFO]\033[0m $*"; }
warn() { echo -e "\033[1;33m[WARN]\033[0m $*"; }
err()  { echo -e "\033[1;31m[ERROR]\033[0m $*"; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || { err "Missing required command: $1"; exit 1; }
}

info "Checking environment..."
require_cmd node
require_cmd npm

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 18 ]; then
  err "Node.js >= 18 is required. Current: $(node -v)"
  exit 1
fi

# ---------------- Backend ----------------
info "Installing backend dependencies..."
cd "$BACK_DIR"
npm ci

# backend/.env
if [ ! -f ".env" ]; then
  info "Creating backend/.env..."
  cat > .env <<'EOF'
DATABASE_URL='postgresql://neondb_owner:npg_nXyS5TDeWEp9@ep-lingering-resonance-acjthkwb-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
PORT=3000
EOF
else
  # Asegura PORT si ya existe el .env pero no tiene PORT
  if ! grep -qE '^PORT=' .env; then
    info "Appending PORT=3000 to backend/.env..."
    echo "PORT=3000" >> .env
  fi
fi

info "Generating Prisma client..."
npx prisma generate

info "Applying Prisma migrations (prisma migrate deploy)..."
npx prisma migrate deploy

# ---------------- Frontend ----------------
info "Installing frontend dependencies..."
cd "$FRONT_DIR"
npm ci

# frontend/.env
if [ ! -f ".env" ]; then
  info "Creating frontend/.env..."
  cat > .env <<'EOF'
VITE_API_URL=/api
EOF
fi

# ---------------- Run both ----------------
info "Starting backend (port 3000) and frontend..."
(cd "$BACK_DIR" && npm run dev) &
BACK_PID=$!

(cd "$FRONT_DIR" && npm run dev) &
FRONT_PID=$!

trap 'echo "Stopping..."; kill $BACK_PID $FRONT_PID 2>/dev/null || true' INT TERM INT
wait $BACK_PID $FRONT_PID
