# MKS - BACKEND CHALLENGE

## DEPLOY + DOCUMENTAÇÃO

- LINK DOCUMENTAÇÃO : https://mks-challenge-api-wp3sqzenga-vp.a.run.app/api/v1/docs

## Sobre aplicação :

Esta aplicação desenvolvida em NestJS consiste em um sistema CRUD para um catálogo de filmes, empregando o TypeORM com PostgreSQL e o Redis como gerenciador de cache.

Através dela, é possível criar um usuário e, após autenticado, o usuário tem a capacidade de adicionar filmes, visualizar a lista de filmes adicionados, bem como deletar e atualizar apenas os filmes que ele mesmo adicionou.

## Rodando local

Para rodar localmente você precisa fazer o clone do repositorio :

```bash
  git clone <repo>
```

Utilizar o yarn como gerenciador de pacote

```bash
  yarn install && yarn start:dev
```

Caso queira usar o docker-composer basta utilizar o comando :

```bash
  yarn docker:up
```

Para reverter utilize :

```bash
  yarn docker:down
```

##

- Fique atento às variáveis de ambiente.
