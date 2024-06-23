# API_with_type
Api com Typescript, Prisma e SQLITE

## Funcionalidade
- Criar Usuários
- Criar Posts
- Criar Comentários

## Instalação 
Inicialize o projeto com npm
```bash
    npm init -y
```
Instale o Prisma & Express
```bash
    npm install express @types/express typescript ts-node-dev prisma @prisma/client
```
Inicie o Prisma 
```bash
    npx prisma init 
```

Realize a Migração do schema 
```bash
   npx prisma migrate dev --name iniciando prisma
```

Inicie a API
```bash
   npx ts-node-dev src/index.ts
```
