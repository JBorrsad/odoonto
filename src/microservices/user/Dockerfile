# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files for workspace
COPY package.json ./
COPY tsconfig*.json ./

# Copy shared libs
COPY src/libs ./src/libs

# Copy user service
COPY src/microservices/user ./src/microservices/user

# Install dependencies
RUN npm install

# Build the application
RUN npm run build --workspace=@odoonto/user-service

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY --from=builder /app/src/microservices/user/package.json ./
COPY --from=builder /app/src/microservices/user/dist ./dist

# Install only production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"] 