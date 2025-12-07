🎬 Proyecto: Aplicación de Películas con Docker

Aplicación full-stack con:

Frontend: HTML/JS

Backend: Node.js + Express

Base de datos: MongoDB

Orquestación: Docker Compose

Permite visualizar y consultar información de películas mediante una API REST.

🐳 Arquitectura
flowchart LR
A[Frontend] --HTTP--> B[Backend API]
B --> C[(MongoDB)]


Servicios definidos en docker-compose.yml.

📂 Requisitos previos

Docker Desktop

Docker Compose

Git

Verificar instalación:

docker -v
docker compose version

🚀 Despliegue local

Clonar el repo:

git clone https://github.com/<user>/<repo>.git
cd proyecto-peliculas


Crear .env:

cp .env.example .env


Levantar los servicios:

docker compose up --build


O en segundo plano:

docker compose up -d --build


Ver los contenedores:

docker ps

🌍 Acceso
Servicio	URL
Frontend	http://localhost:8080

Backend API	http://localhost:3000
🧪 Pruebas
Backend
curl http://localhost:3000/movies


o con navegador:

http://localhost:3000/movies

📄 Estructura de carpetas
📁 proyecto-peliculas
 ├─ frontend/
 ├─ backend/
 ├─ docker-compose.yml
 ├─ README.md
 └─ docs/

📝 Licencia

MIT