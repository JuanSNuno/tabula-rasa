# Tabula Rasa

Tabula Rasa es un sistema clandestino de investigación y contacto (Zero-Logs) diseñado para individuos en peligro extremo, oculto tras la fachada corporativa de una empresa B2B ficticia llamada **Apex Legacy Systems**.

Este proyecto implementa el Producto Mínimo Viable (MVP) con una arquitectura de alta seguridad enfocada en la privacidad absoluta y la autodestrucción de datos.

## 🏗 Arquitectura del Sistema

El sistema está compuesto por dos capas principales:

1. **Frontend (Next.js 14 / React / Tailwind CSS)**
   - **Fachada (The Sovereign Ledger):** Interfaz pública corporativa institucional.
   - **Portal Clandestino (The Kinetic Dossier):** Interfaz hiper-brutalista tipo terminal, accesible únicamente mediante un "Kill Switch" secreto.

2. **Backend (Go / Fiber / Arquitectura Hexagonal)**
   - API REST ultrarrápida estructurada en un diseño hexagonal estricto, aislando el dominio de los frameworks y adaptadores.
   - **Zero-Logs Policy:** Todo el almacenamiento se realiza en memoria RAM utilizando **Redis** configurado sin persistencia en disco (`--save ""` y `--appendonly no`).
   - Los datos (Sesiones, Logs ZK, Mensajes) tienen un Tiempo de Vida (TTL) estricto. Por ejemplo, los mensajes se autodestruyen en 15 minutos.

3. **Autenticación (ZK-SNARKs)**
   - El acceso al chat efímero requiere una prueba de conocimiento cero simulada para garantizar el anonimato del usuario.

## 🚀 Requisitos Previos

Para ejecutar este proyecto localmente, necesitas tener instalado:
- [Node.js](https://nodejs.org/) (v18+)
- [Go](https://go.dev/) (v1.21+)
- [Docker](https://www.docker.com/) (para ejecutar Redis)

## 🛠 Instalación y Ejecución Local

### 1. Iniciar Redis (Modo Zero-Logs)
Levanta un contenedor efímero de Redis en segundo plano:
```bash
docker run --name tabula-redis -d -p 6379:6379 redis:alpine redis-server --save "" --appendonly no
```

### 2. Iniciar el Backend (Go)
Navega a la carpeta del backend, descarga las dependencias y ejecuta el servidor:
```bash
cd backend
go mod tidy
go run cmd/api/main.go
```
El backend estará corriendo en `http://localhost:8080`.

### 3. Iniciar el Frontend (Next.js)
En otra terminal, navega a la carpeta del frontend, instala las dependencias y arranca el servidor de desarrollo:
```bash
cd frontend
npm install
npm run dev
```
El frontend estará disponible en `http://localhost:3000`.

## 🎭 Cómo probar el flujo (The "Kill Switch")

1. Abre `http://localhost:3000` en tu navegador.
2. Verás la fachada corporativa inofensiva de **Apex Legacy Systems**.
3. **Para acceder al Portal Clandestino (Tabula Rasa), tienes dos opciones:**
   - **Opción 1 (Atajo de teclado):** Presiona `Ctrl + Shift + T` en cualquier parte de la página.
   - **Opción 2 (Ticket de Soporte):** Navega a la sección **Support**, e ingresa el código secreto `Error_704_Null_Pointer_Extraction` en el campo "Issue Code", luego envía el formulario.
4. El DOM de la fachada será destruido y entrarás a la terminal segura.
5. Haz clic en el módulo central para simular el escaneo y generar la **Prueba ZK-SNARK**.
6. Una vez que la prueba sea validada por el backend, se establecerá una sesión efímera y tendrás acceso al túnel de **Chat Seguro** (los mensajes se autodestruirán automáticamente en el servidor tras 15 minutos).

## 🛡️ Seguridad y Consideraciones
- **No SQL, No Disco:** Este proyecto no utiliza bases de datos relacionales ni almacenamiento persistente por diseño. Si el contenedor de Redis se detiene, toda la información desaparece permanentemente.
- **Short Polling:** El chat utiliza peticiones periódicas cortas (3s) para mantener la comunicación en tiempo real en este MVP.

---
*Disclaimer: Este proyecto es un concepto de diseño (Design Thinking) y una prueba de concepto arquitectónica.*