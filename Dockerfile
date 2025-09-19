# Development Dockerfile
FROM node:18-alpine

WORKDIR /app

# Package dosyalarını kopyala
COPY package*.json ./

# Dependencies'leri yükle
RUN npm ci

# Source kodunu kopyala
COPY . .

# Build et
RUN npm run build

# Port'u expose et
EXPOSE 3000

# Development modunda çalıştır
CMD ["npm", "run", "start:dev"]
