# Especificar a imagem base
FROM node:18.12.1

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar os arquivos de definição de pacote
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar os arquivos do projeto
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Gera o cliente Prisma
RUN npx prisma generate

# Executa as migrações do Prisma
RUN npx prisma migrate deploy

# Compilar o TypeScript para JavaScript
RUN npm run build

# Expor a porta que a aplicação usa
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]


