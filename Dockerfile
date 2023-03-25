
# Define a imagem base
FROM node:14-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários para dentro do container
COPY package*.json ./
COPY app.js ./

# Instala as dependências da aplicação
RUN npm install

# Expõe a porta 3000, que é a porta em que a aplicação Node.js está ouvindo
EXPOSE 3000

# Inicia a aplicação Node.js quando o container for iniciado
CMD ["npm", "start"]
