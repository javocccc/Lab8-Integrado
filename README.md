# Lab 8 — Catálogo conectado

Aplicación integrada para administrar libros y canciones. El backend usa Django REST Framework y el frontend es una interfaz JavaScript estática servida localmente por Node.js. El frontend no es una aplicación React/Vite: lee la URL de la API de `VITE_API_URL` y, durante el desarrollo local, el servidor reenvía `/api/` a Django.

## Estructura

- `backend/`: proyecto Django REST Framework y pruebas de API.
- `frontend/`: interfaz web y servidor/proxy de desarrollo Node.js.

## Desarrollo local

En PowerShell, desde la raíz:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
python backend\manage.py migrate
python backend\manage.py runserver
```

En otra terminal, inicia el frontend:

```powershell
cd frontend
Copy-Item .env.example .env
npm start
```

Abre <http://localhost:5173>. Los orígenes locales del frontend están permitidos en CORS. La API ofrece `/api/libros/` y `/api/canciones/`.

## Pruebas

Desde la raíz:

```powershell
python backend\manage.py test catalogo
cd frontend
npm test
```

Las pruebas del frontend usan el runner integrado `node:test`, ya que la aplicación no usa React/Jest.

## Despliegue

### Backend en Render

El blueprint `render.yaml` crea el servicio Django/Gunicorn. Configura `DATABASE_URL` con la URL de conexión de PostgreSQL, además de los orígenes exactos del frontend en `CORS_ALLOWED_ORIGINS` y `CSRF_TRUSTED_ORIGINS`. Mantén las credenciales de la base de datos solo como variables de entorno de Render; no las agregues al repositorio.

### Frontend estático en Vercel

Importa este repositorio en Vercel y configura `VITE_API_URL` como la URL pública base del backend, incluyendo `/api/` al final (por ejemplo, `https://<backend>.onrender.com/api/`). El `vercel.json` genera el archivo de configuración y publica `frontend/` como contenido estático. El dominio del frontend debe estar incluido en `CORS_ALLOWED_ORIGINS` del backend.

La URL pública y las capturas del despliegue deben completarse después de que los servicios se hayan creado y verificado.
