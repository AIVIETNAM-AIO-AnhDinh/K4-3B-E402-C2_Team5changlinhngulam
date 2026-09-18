#!/usr/bin/env bash
# Chay full golden set qua OpenAI that va luu transcript vao evidence/.
# Cach dung:
#   bash eval/run-cp3.sh                 # doc key tu eval/.env, hoi neu chua co
#   RUN_ID=run-002 bash eval/run-cp3.sh  # dat run id khac
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ENV_FILE="eval/.env"

# 1) Nap key: uu tien bien moi truong san co, sau do eval/.env, cuoi cung hoi nguoi dung.
if [ -z "${OPENAI_API_KEY:-}" ] && [ -f "$ENV_FILE" ]; then
  set -a; . "$ENV_FILE"; set +a
fi

if [ -z "${OPENAI_API_KEY:-}" ]; then
  if [ -t 0 ]; then
    printf 'Nhap OPENAI_API_KEY (khong hien thi khi go): ' >&2
    read -rs OPENAI_API_KEY
    printf '\n' >&2
    export OPENAI_API_KEY
    printf 'Luu key vao %s de lan sau khoi go lai? [y/N] ' "$ENV_FILE" >&2
    read -r SAVE_KEY
    case "$SAVE_KEY" in
      y|Y)
        umask 077
        printf 'OPENAI_API_KEY=%s\nOPENAI_MODEL=%s\n' "$OPENAI_API_KEY" "${OPENAI_MODEL:-gpt-4o-mini}" > "$ENV_FILE"
        echo "Da luu $ENV_FILE (chmod 600, da gitignore)." >&2
        ;;
    esac
  else
    echo "Thieu OPENAI_API_KEY. Tao eval/.env tu eval/.env.example hoac export bien truoc khi chay." >&2
    exit 2
  fi
fi

MODEL="${OPENAI_MODEL:-gpt-4o-mini}"
RUN_ID="${RUN_ID:-run-$(date +%Y%m%d-%H%M%S)}"
LOG_DIR="evidence/cp3-runs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/${RUN_ID}-console.md"

echo "== Kiem tra schema truoc khi goi AI =="
node eval/run-openai.mjs --check

echo "== Chay live: model=$MODEL run_id=$RUN_ID =="
{
  echo '```text'
  echo "date_utc=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "model=$MODEL"
  echo "run_id=$RUN_ID"
  echo
} > "$LOG_FILE"

set +e
node eval/run-openai.mjs --model "$MODEL" --run-id "$RUN_ID" 2>&1 | tee -a "$LOG_FILE"
STATUS=${PIPESTATUS[0]}
set -e

echo '```' >> "$LOG_FILE"

echo
echo "Transcript: $LOG_FILE"
echo "Ket qua chi tiet (gitignored): eval/results-${RUN_ID}.json"
exit "$STATUS"
