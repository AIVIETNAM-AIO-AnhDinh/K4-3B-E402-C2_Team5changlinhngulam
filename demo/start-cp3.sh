#!/bin/zsh
# CP3 demo launcher (macOS/zsh). Prompts for OPENAI_API_KEY without echoing it,
# runs the schema check, then starts the local backend.
# The key lives only in this process: never written to disk, never in shell history,
# never sent to the browser.

set -e
cd "$(dirname "$0")/.."

if [[ -z "$OPENAI_API_KEY" ]]; then
  printf 'OpenAI API key (input hidden): '
  read -rs OPENAI_API_KEY
  printf '\n'
  export OPENAI_API_KEY
fi

if [[ -z "$OPENAI_API_KEY" ]]; then
  echo 'No key entered. Aborting.' >&2
  exit 1
fi

echo '--- Kiem tra bo test ---'
node eval/run-openai.mjs --check

echo '--- Khoi dong local backend ---'
exec node eval/serve-cp3.mjs --port "${1:-8787}"
