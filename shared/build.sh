#!/bin/bash

set -e

pnpx zx ./generate-index.mjs > src/index.ts
tsc
rm src/index.ts
