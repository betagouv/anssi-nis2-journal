#!/bin/bash -e

npm install
npm run typeorm migration:run -- -d data-source.ts