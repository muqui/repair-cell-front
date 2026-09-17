# Etapa de construcción
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código del proyecto
COPY . .

# Generar build de producción
RUN npm run build


# Etapa de producción
FROM nginx:alpine

# Copiar build de Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Puerto de Nginx
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]