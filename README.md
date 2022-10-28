# OpenTelemetry Presentation Demo

This project was created based on the [OpenTelemetry Demo Project](https://github.com/open-telemetry/opentelemetry-demo), this is a simplified version.

## Prerequisites

- Docker
- [Docker Compose](https://docs.docker.com/compose/install/#install-compose) v2.0.0+ (with docker desktop it should be available on **docker compose** instead **docker-compose**)
- 4 GB of RAM

## Run Docker Compose

- Start the demo:

```shell
docker compose up --build
```

## Urls

Once the images are built and containers are started you can access:

- Registration <http://localhost:8080/registration/>
- ContestService <http://localhost:8080/contests/> (CRUD)
- TeamService <http://localhost:8080/teams/> (CRUD)
- Grafana: <http://localhost:8080/grafana/> (metrics)
- Jaeger UI: <http://localhost:8080/jaeger/ui/> (traces)
