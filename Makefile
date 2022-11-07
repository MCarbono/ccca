#database commands
localenv_up:
	docker-compose -f docker-compose.yml up --force-recreate 
	
localenv_down:
	docker-compose down

install:
	yarn