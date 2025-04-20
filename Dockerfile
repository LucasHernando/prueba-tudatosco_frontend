# Etapa 1: Construcción de la app
FROM node:18-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install -g @angular/cli@18 && npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto usado por `ng serve`
EXPOSE 4200

# Comando por defecto para correr en desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]
