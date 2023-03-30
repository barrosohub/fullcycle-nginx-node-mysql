# Instruções

Para executar este projeto, siga as etapas abaixo:

1. Instale o Docker e o Docker Compose em sua máquina local. Para isso, siga as instruções de instalação para o seu sistema operacional em:

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

2. Clone este repositório para a sua máquina local, executando o seguinte comando no seu terminal:

```bash
git clone https://github.com/barrosohub/fullcycle-nginx-node-mysql.git
```

3. No seu terminal, navegue até a pasta raiz do repositório clonado.

```bash	
cd fullcycle-nginx-node-mysql
```

4. Construa as imagens do Docker para as aplicações e serviços de banco de dados executando o seguinte comando:

```bash
docker-compose build
```

5. Inicie os containers do Docker executando o seguinte comando:

```bash
docker-compose up
```

Isso irá iniciar os containers para a aplicação, banco de dados e servidor web Nginx.

6. Depois que os containers estiverem funcionando, você pode acessar a aplicação abrindo seu navegador da web e navegando até `http://localhost:8080`.


Pronto! Agora você tem o projeto em execução em sua máquina. :tada:
