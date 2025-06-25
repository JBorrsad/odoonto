# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy root package.json and workspace files
COPY package*.json ./
COPY tsconfig*.json ./

# Copy source code
COPY src/ ./src/

# Install all dependencies (including dev dependencies for building)
RUN npm install --legacy-peer-deps

# Build the user microservice
WORKDIR /app/src/microservices/user
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package.json for the microservice
COPY src/microservices/user/package*.json ./

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps

# Copy built application from builder stage
COPY --from=builder /app/src/microservices/user/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"] 