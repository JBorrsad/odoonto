# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package files for workspace
COPY package.json ./
COPY tsconfig*.json ./

# Copy shared libs
COPY src/libs ./src/libs

# Copy wallet service
COPY src/microservices/wallet ./src/microservices/wallet

# Install dependencies
RUN npm install

# Build the application
RUN npm run build --workspace=@odoonto/wallet-service

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY --from=builder /app/src/microservices/wallet/package.json ./
COPY --from=builder /app/src/microservices/wallet/dist ./dist

# Install only production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"] 