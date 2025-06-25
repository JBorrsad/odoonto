# User Microservice - Docker

Este microservicio se ejecuta automáticamente en Docker cuando usas `npm start`.

## 🚀 Comandos Principales

```bash
# Iniciar el microservicio en Docker (con build automático)
npm start

# Iniciar en background (detached)
npm run start:detached

# Ver logs en tiempo real
npm run logs

# Parar el microservicio
npm stop

# Reiniciar solo el servicio (sin PostgreSQL)
npm restart
```

## 🐳 Comandos Docker Avanzados

```bash
# Solo construir la imagen
npm run docker:build

# Levantar sin build
npm run docker:up

# Parar todo
npm run docker:down

# Limpiar todo (incluye volumes)
npm run docker:clean
```

## 🏠 Desde la Raíz del Proyecto

```bash
# Iniciar microservicio de users
npm run start:user

# Iniciar en background
npm run start:user:detached

# Ver logs
npm run logs:user

# Parar
npm run stop:user
```

## 🔧 Desarrollo Local (sin Docker)

Si necesitas desarrollo local sin Docker:

```bash
# Compilar
npm run build

# Iniciar localmente (requiere PostgreSQL corriendo)
npm run start:local

# Desarrollo con hot-reload
npm run start:dev
```

## 📊 Servicios Incluidos

- **user-service**: Puerto 3001
- **postgres**: Puerto 5432
- **Health checks** automáticos
- **Auto-restart** en caso de fallos
- **Persistencia de datos** con volumes

## 🌐 URLs

- API: http://localhost:3001
- Health: http://localhost:3001/health
- Swagger: http://localhost:3001/api
- PostgreSQL: localhost:5432

## 📝 Notas

- El comando `npm start` ahora ejecuta Docker automáticamente
- PostgreSQL se incluye y configura automáticamente
- Los datos persisten entre reinicios
- El servicio espera a que PostgreSQL esté listo antes de iniciar
