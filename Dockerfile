** Dockerfile FUNCIONANDO **
# Use uma imagem base do Java (ajuste a versão conforme necessário)
FROM openjdk:11-jdk-slim
# Instala dependências
RUN apt-get update && apt-get install -y netcat
# Diretório de trabalho no container
WORKDIR /app

# Copie o .jar para o container
COPY backendProdutos-v2.jar /app/backendProdutos-v2.jar
COPY wait-for-mongo.sh /wait-for-mongo.sh
# Comando para executar o .jar
RUN chmod +x /wait-for-mongo.sh
CMD ["sh", "/wait-for-mongo.sh"]