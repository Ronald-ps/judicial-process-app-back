# Django Generic Backend

Backend genérico para a criação de projetos django com frontend e backend desacoplados.

## Rodar projeto
```shell
pipx install poetry
poetry install
poetry shell

cp .env.dev .env
python manage.py runserver
```

ou por docker:

```shell
cp env.dev .env
docker compose up --build
```

## Lint e Formatter
É usado black (formatter) e ruff(Lint)

```shell
# formata arquivos python
black .
# Faz verificação de lint e imports
ruff .
```
