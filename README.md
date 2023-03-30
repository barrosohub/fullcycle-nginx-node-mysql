## Instruções

Para executar este projeto, siga as etapas abaixo:

1. Instale o Docker em sua máquina, se ainda não o tiver. Você pode baixar o Docker [aqui](https://www.docker.com/get-started).

2. Clone este repositório para a sua máquina local, executando o seguinte comando no seu terminal:

```bash
git clone https://github.com/barrosohub/fullcycle-nginx-node-mysql.git
```

3. No seu terminal, navegue até a pasta raiz do repositório clonado.

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

7. Para parar os containers, digite `ctrl + c` no terminal.

Pronto! Agora você tem o projeto em execução em sua máquina.
