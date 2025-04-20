
# 🚀 Frontend Events - Aplicación Angular Dockerizada

Este repositorio contiene el código fuente del frontend de la aplicación **Events**, construido con **Angular** y completamente contenerizado con **Docker**.

---

## 🧱 Estructura del Proyecto

- Framework: [Angular 18](https://angular.io/)
- Contenerización: [Docker](https://www.docker.com/)
- Orquestación: [Docker Compose](https://docs.docker.com/compose/)
- Puerto expuesto: `4200`

---

## ▶️ Ejecución del Proyecto

### ⚙️ Requisitos

Asegúrate de tener instalado:

- Docker
- Docker Compose

---

### 🚢 Levantar la aplicación

Desde la raíz del proyecto, ejecuta:

```bash
docker-compose -f frontend_events/docker-compose-frontend.yml up --build
```

Esto construirá la imagen de Angular, instalará las dependencias y servirá la app en modo desarrollo en:

```
http://localhost:4200
```

---

## ⚙️ Detalles del Dockerfile

El contenedor se basa en `node:18-alpine`, instala las dependencias y sirve la app con el siguiente comando:

```dockerfile
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "1000"]
```

Esto permite ver los cambios en tiempo real durante el desarrollo.

---

## 📁 Estructura del Código

```
frontend_events/
├── src/               # Código fuente Angular
├── angular.json       # Configuración del proyecto
├── package.json       # Dependencias del proyecto
├── Dockerfile         # Dockerfile de la app
├── docker-compose-frontend.yml  # Configuración para Docker Compose
```

---

## 👥 Autor y Licencia

- Autor: Equipo de Desarrollo Frontend Events
- Licencia: MIT
