#!/bin/sh

# Espera até que a porta do MongoDB esteja disponível
while ! nc -z meu-mongodb 27017; do
  echo "Esperando MongoDB..."
  sleep 2
done

echo "MongoDB pronto! Iniciando aplicação..."
exec java -jar /app/demo-0.0.1-snapshot.jar