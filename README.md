<h1 align="center"> E-commerce API </h1>

## Summary
- [About](#About)
- [Technologies](#Technologies)
- [Setup](#Setup)
- [Run server](#Run-server)
- [Infrastructure](#Infrastructure)
- [Tests](#Tests)

---
<a id="About"></a> 
## About 

This is a basic e-commerce api project created to practice the concepts about clean architecture, ports and adapters, event-driven architecture, CQRS and domain driven design. This code was developed based in the course called "Clean Code e Clean Architecture"(https://app.branas.io/clean-code-e-clean-architecture). The project contains four microservices (catalog, checkout, freight and stock) and a shared folder that has abstractions from libraries that is used by more than one microservice. 

---
<a id="Technologies"></a> 
## Technologies

- Express
- Axios
- PgPromise
- Amqplib
- Jest
- Typescript

---

<a id="Setup"></a> 
## Setup

```bash
    # clone the repository
    $ git clone projectURL
``` 

```bash
    # access the project folder
    $ cd projectURL
```

```bash
    # install dependencies with Makefile
    $ make install
```

```bash
    # install dependencies with yarn
    $ yarn
```
```bash
    # install dependencies with npm
    $ npm i
```
---
<a id="Run-server"></a> 
## Run server

After cloning the repository, navegate to one of the microservices. Use the command below: 

```bash
    $ cd microservice_folder_name
```

To start the server, use one of the commands below: 

```bash
    # Makefile command
    $ make run
```

```bash
    # npx command
    $ npx ts-node src/main.ts
```

---
<a id="Infrastructure"></a> 
## Infrastructure

The database used is the Postgres. The message broker is the RabbitMQ. In this project root folder there's a docker-compose file that creates the database and the broker. All of the services runs in their default ports. Run one of the commands below inside the root folder of the project:

```bash
    # Makefile command
    $ make localenv_up
```

```bash
    # docker command
    $ docker-compose -f docker-compose.yml up --force-recreate 
```

To delete the containers, run one of the commands below: 

```bash
    # Makefile command
    $ make localenv_down
```

```bash
    # docker command
    $ docker-compose down
```

---

<a id="Tests"></a> 
## Tests

### Unit Tests

Each one of the microservices has unit tests. To run it, use one of the command below inside the microservice folder:

```bash
    # Makefile command
    $ make unit
```

```bash
    # Jest command
    $ npx jest test/unit
```

### Integration Tests

Each one of the microservices has integration tests. To run it, you will need to have the database instance. 
The microservice will use the repository of it's own bounded context, and any external resource will be mocked.
Use one of the commands below inside the microservice folder.

```bash
    # Makefile command
    $ make integration
```

```bash
    # Jest command
    $ npx jest test/integration
```

#### Specific integration tests

The checkout microservice has a specific suite test cases. To run it, you will need to have all the microservices [up](#Run-server) and the [infrastructure](#Infrastructure). It will do an integration test by the checkout's microservice api.
Use one of the commands below inside the checkout microservice folder.

```bash
    # Makefile command
    $ make api
```

```bash
    # Jest command
    $ npx jest test/api 
```