# Define a imagem base
FROM node:14-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários para dentro do container
COPY package*.json ./
COPY app.js ./

# Baixa o script wait-for-it do GitHub
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh

# Define permissão de execução para o script
RUN chmod +x /wait-for-it.sh

# Instala as dependências da aplicação
RUN npm install

# Expõe a porta 3000, que é a porta em que a aplicação Node.js está ouvindo
EXPOSE 3000

# Inicia a aplicação Node.js quando o container for iniciado
CMD ["/wait-for-it.sh", "mysql:3306", "--", "npm", "start"]