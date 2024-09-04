#!/bin/bash
echo Pruning PNPM Store
echo .
pnpm store prune
echo Installing PNPM Dependencies
echo .
pnpm install
echo Kicking off Docker Compose
echo .
docker compose -f tools/compose/development.yml --env-file .env -p reactive-resume up -d
echo Migrating PNPM Prisma Dev
echo ,
pnpm prisma:migrate:dev
echo Executing PNPM Dev
echo .
pnpm dev
