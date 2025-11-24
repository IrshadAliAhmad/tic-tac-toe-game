.PHONY: build up down logs clean

DOCKER_COMPOSE := docker-compose

OS := $(shell uname)

build:
ifeq ($(OS),Linux)
	@echo "Running in Linux environment $(OS)"
	$(DOCKER_COMPOSE) build
endif

ifeq ($(OS),Darwin)
	@echo "Running in macOS environment $(OS)"
	$(DOCKER_COMPOSE) build
endif

ifeq ($(OS),Windows_NT)
	@echo "Running in Windows environment $(OS)"
	$(DOCKER_COMPOSE) build
endif

up:
	$(DOCKER_COMPOSE) up -d	
down:
	$(DOCKER_COMPOSE) down		
logs:
	$(DOCKER_COMPOSE) logs -f	
clean:
	$(DOCKER_COMPOSE) down --rmi all -v --remove-orphans	