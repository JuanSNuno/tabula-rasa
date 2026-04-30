# Guía de Despliegue - Tabula Rasa

Esta guía detalla los pasos para desplegar el proyecto "Tabula Rasa" de forma robusta y gratuita, utilizando **Vercel** para el Frontend, **Render** para el Backend y **Upstash** para la base de datos efímera (Redis).

## Arquitectura

*   **Frontend:** Vercel (Hosting Next.js)
*   **Backend:** Render (Docker container ejecutando Go Fiber)
*   **Base de Datos:** Upstash (Serverless Redis para almacenamiento "Zero-Logs" temporal)

---

## 1. Configurar Redis (Upstash)

Upstash no cuenta con CLI para la creación inicial, por lo que se debe hacer desde su panel web.

1.  Ve a [console.upstash.com](https://console.upstash.com/) e inicia sesión.
2.  Navega a la sección de **Redis** y haz clic en **Create Database**.
3.  Nombra la base de datos (ej. `tabula-rasa`) y selecciona la región de tu preferencia.
4.  Una vez creada, copia la **URL de conexión** (comienza con `rediss://...` o `redis://...`). Guarda esta URL, la necesitarás para el backend.

---

## 2. Desplegar el Backend (Render)

El proyecto incluye un `Dockerfile` en el directorio `backend` y un archivo `render.yaml` en la raíz para facilitar el despliegue como infraestructura como código.

1.  **Sube los cambios a GitHub:**
    Asegúrate de que todos los archivos (incluyendo el `Dockerfile`, `render.yaml` y `main.go` modificado) estén subidos a tu repositorio.
    ```bash
    git add .
    git commit -m "Preparar proyecto para despliegue en Render y Vercel"
    git push
    ```

2.  **Instala y autentica la CLI de Render:**
    *(Si no la tienes instalada)*
    ```bash
    npm install -g @renderadmin/cli
    render login
    ```

3.  **Ejecuta el Blueprint:**
    Desde la raíz del proyecto, ejecuta el siguiente comando para leer el archivo `render.yaml` y crear el servicio web.
    ```bash
    render blueprint apply
    ```

4.  **Configura las Variables de Entorno:**
    Durante el proceso, Render te pedirá el valor para la variable `REDIS_URL`. Pega la URL de conexión que copiaste de Upstash.

5.  **Obtén la URL del Backend:**
    Al finalizar el despliegue en el panel de Render, obtendrás la URL pública de tu API (ej. `https://tabula-rasa-backend.onrender.com`). Copia esta URL, la necesitarás para conectar el frontend.

---

## 3. Desplegar el Frontend (Vercel)

El frontend en Next.js se desplegará en Vercel. Las variables de entorno dinámicas se han configurado para utilizar `NEXT_PUBLIC_API_URL` y `NEXT_PUBLIC_WS_URL`. El archivo `vercel.json` en la raíz ya indica que el directorio fuente es `frontend/`.

1.  **Instala y autentica la CLI de Vercel:**
    ```bash
    npm i -g vercel
    vercel login
    ```

2.  **Despliega el proyecto inyectando las variables de entorno:**
    Desde la raíz del proyecto, ejecuta el comando de despliegue, sustituyendo `URL_DE_RENDER` por la URL de tu backend obtenida en el paso anterior.
    
    *Nota: Asegúrate de que la URL de la API empiece por `https://` y la de WebSockets por `wss://`.*

    ```bash
    vercel --build-env NEXT_PUBLIC_API_URL="https://tabula-rasa-backend-yi8l.onrender.com" --build-env NEXT_PUBLIC_WS_URL="wss://tabula-rasa-backend-yi8l.onrender.com"
    ```

3.  **Sigue las instrucciones interactivas:**
    La CLI te hará algunas preguntas estándar (aceptar opciones por defecto suele ser suficiente). Al terminar, Vercel compilará la aplicación y te devolverá un enlace de producción con el frontend operativo y conectado a tu backend.

---

## Resumen de Cambios Realizados en el Código

Para que esta arquitectura funcionara, se implementaron los siguientes cambios:

*   **`backend/cmd/api/main.go`:** Modificado para aceptar la variable de entorno `REDIS_URL` (para Upstash) y `PORT` (inyectado por Render).
*   **`backend/Dockerfile`:** Creado para compilar y ejecutar el servidor Go Fiber.
*   **`render.yaml`:** Creado para definir el blueprint del servicio web de Render.
*   **`vercel.json`:** Creado en la raíz para redirigir los comandos de Vercel al subdirectorio `frontend`.
*   **`frontend/`:** Se actualizaron todos los fetch y llamadas a WebSockets para que usen `process.env.NEXT_PUBLIC_API_URL` y `process.env.NEXT_PUBLIC_WS_URL` en lugar de direcciones locales estáticas (`localhost:8080`).