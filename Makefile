dev:
	docker compose -f docker-compose.local.yml up --build -d

down:
	docker compose -f docker-compose.local.yml down --remove-orphans

down-all:
	docker compose -f docker-compose.local.yml down -v --rmi all --remove-orphans

stop:
	docker compose -f docker-compose.local.yml stop

logs:
	docker compose -f docker-compose.local.yml logs -f
