# Guía para Exponer el Proyecto a Internet

Esta guía explica cómo disponibilizar el proyecto localmente hacia internet de manera sencilla, lo que te permite acceder a él desde tu celular u otra computadora.

## Prerrequisitos
- Node.js y `npx` instalados en tu equipo.
- El proyecto (frontend y/o backend) ejecutándose en tu máquina local.

## Herramienta utilizada: LocalTunnel
[LocalTunnel](https://theboroer.github.io/localtunnel-www/) es una herramienta gratuita y de código abierto que te permite compartir de forma fácil un servicio web local al exterior sin modificar configuraciones de firewall, DNS o de tu router.

## Pasos

### 1. Iniciar el Servidor de Desarrollo
Primero, asegúrate de que tu aplicación se esté ejecutando en tu entorno local. En este proyecto, el frontend de Next.js típicamente se levanta en el puerto `3000` o `3001`.

```bash
cd frontend
npm run dev
```

### 2. Exponer la Aplicación con LocalTunnel
Abre una **nueva terminal** (dejando la anterior con el servidor corriendo) y ejecuta el siguiente comando para crear el túnel hacia tu puerto:

```bash
npx --yes localtunnel --port 3001
```

*(Sustituye `3001` por el puerto en el que esté corriendo tu servidor).*

**Para tener una URL personalizada (Subdominio):**
Si quieres que el enlace sea más amigable y fácil de recordar, puedes usar el parámetro `--subdomain` seguido de la palabra que desees (sin espacios):

```bash
npx --yes localtunnel --port 3001 --subdomain legacy-guard
```

Esto intentará generar una URL específica, por ejemplo: `https://legacy-guard.loca.lt`

### 3. Acceder al enlace
1. Copia el enlace generado (`https://...`) y ábrelo en tu navegador desde tu celular o cualquier otro equipo conectado a internet.
2. **Aviso de Seguridad:** La primera vez que accedas a un dominio gratuito de LocalTunnel, te aparecerá una pantalla de advertencia ("Friendly Reminder") para evitar abusos de phishing. Solo debes darle al botón **"Click to Continue"** y, en algunos casos, introducir la dirección IP pública de tu conexión (la cual suele aparecer indicada en esa misma pantalla).

---

## Alternativas recomendadas
Si en algún momento LocalTunnel falla o necesitas otras opciones, existen excelentes alternativas que funcionan bajo el mismo principio:

1. **Cloudflare Quick Tunnels:** Muy estable y segura.
   ```bash
   npx cloudflared tunnel --url http://localhost:3000
   ```
2. **Pinggy:** No requiere instalar nada, funciona directamente a través de SSH.
   ```bash
   ssh -p 443 -R0:localhost:3001 a.pinggy.io
   ```
3. **Ngrok:** La opción más conocida de la industria, pero requiere que te registres para obtener un token y en la versión gratuita la URL es completamente aleatoria.
   ```bash
   ngrok http 3001
   ```
