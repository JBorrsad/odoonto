#!/bin/bash

# Script para cargar secrets desde HashiCorp Vault
# Uso: ./load-secrets.sh

set -e

echo "🔐 Cargando secrets desde Vault..."

# Autenticación con Vault
export VAULT_ADDR="https://vault.tu-empresa.com"
vault auth -method=userpass username=$VAULT_USER password=$VAULT_PASS

# Obtener secrets
export DATABASE_PASSWORD=$(vault kv get -field=password secret/odoonto/database)
export JWT_SECRET=$(vault kv get -field=jwt secret/odoonto/auth)
export ENCRYPTION_KEY=$(vault kv get -field=encryption secret/odoonto/encryption)

echo "✅ Secrets cargados exitosamente"

# Ejecutar la aplicación con secrets
docker-compose up -d 