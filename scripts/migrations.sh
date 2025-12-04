#!/bin/bash -e

npm ci
npm run typeorm migration:run -- -d data-source.ts
