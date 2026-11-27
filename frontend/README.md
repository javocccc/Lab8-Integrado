# Lab 8 Frontend

Interfaz web en español para la API de libros y canciones del directorio `backend/`. Permite consultar, buscar, crear, editar y eliminar registros.

## Requisitos

- Node.js 18 o superior.
- El backend Django disponible en `http://127.0.0.1:8000`.
- No se necesitan paquetes npm.

## Inicio local

Desde la raíz del monorepo, inicia el backend:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
python backend\manage.py migrate
python backend\manage.py runserver
```

En otra terminal, configura e inicia el frontend:

```powershell
cd frontend
Copy-Item .env.example .env
npm start
```

Abre <http://localhost:5173>. El servidor del frontend entrega los archivos estáticos y reenvía las solicitudes a `/api/` hacia Django. Configura `VITE_API_URL` si la API usa otra dirección; el valor local de ejemplo apunta a `http://127.0.0.1:8000/api/`. Para cambiar la dirección del proxy o el puerto del frontend, configura `BACKEND_URL` o `PORT`.

En PowerShell:

```powershell
$env:BACKEND_URL = 'http://127.0.0.1:8000'
npm start
```

## API utilizada

| Recurso | Lista y creación | Detalle, edición y eliminación | Campos |
| --- | --- | --- | --- |
| Libros | `/api/libros/` | `/api/libros/{id}/` | `titulo`, `autor`, `anio` |
| Canciones | `/api/canciones/` | `/api/canciones/{id}/` | `titulo`, `artista`, `anio`, `genero` |

El frontend usa el mismo origen para evitar problemas de CORS. En un despliegue, configura el servidor web o proxy para reenviar `/api/` al backend, o ejecuta `server.js` como servidor de la aplicación. El backend actual es un proyecto de desarrollo con `DEBUG=True`; revísalo antes de publicarlo.

## Comprobación

```bash
npm test
```

## Vercel

Configura `VITE_API_URL` en el proyecto Vercel con la URL pública base del backend (incluido `/api/`). Ejecuta `npm run build` para generar `config.js`; Vercel publica el directorio `frontend/` como sitio estático. Agrega el dominio Vercel a `CORS_ALLOWED_ORIGINS` en Django.
