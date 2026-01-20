lint-frontend:
	make -C frontend lint

install:
	npm ci && cd frontend && npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

start:
	npx start-server -s ./frontend/dist

develop:
	make start-backend & make start-frontend

build:
	npm run build

gitHubActionsBage:
	[![hexlet-check](https://github.com/GalinaBagram1987/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/GalinaBagram1987/frontend-project-12/actions/workflows/hexlet-check.yml)