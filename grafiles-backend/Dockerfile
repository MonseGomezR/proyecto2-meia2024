# Usar una imagen base de Node.js
FROM node:18-alpine

# Crear un directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que usa la aplicación (e.g., 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
