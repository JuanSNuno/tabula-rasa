# Frontend Security & Kill Switch (Next.js 14)

El frontend de **Tabula Rasa** se fundamenta en un principio de **"Seguridad por Oscuridad y Aislamiento de Entorno"**. Consta de dos modos radicalmente distintos: una fachada corporativa inofensiva y un portal clandestino brutalista.

## Arquitectura de Estados (El Contexto)

La transición entre la fachada pública (Apex Legacy Systems) y el portal clandestino (Tabula Rasa) está gobernada por un estado global inyectado mediante un Context Provider en React.

### `SecurityModeContext.tsx`
- **Función Principal:** Mantiene y propaga el estado `isClandestineMode`.
- **El Kill Switch:** Actúa como el desencadenante de la destrucción visual.
  - El usuario puede activar el modo oscuro introduciendo el código secreto (`Error_704_Null_Pointer_Extraction`) en el formulario de la pestaña `Support`.
  - También puede activarse instintivamente en cualquier vista pulsando la combinación de teclas de emergencia `Ctrl + Shift + T` gracias a un `useEffect` que monitorea el evento `keydown` globalmente.
- **Efectos en el DOM:** Cuando `isClandestineMode` cambia a `true`, inyecta la clase `dark` en la etiqueta `<html>`, provocando que TailwindCSS conmute todas las variables de diseño y revele el tema "Kinetic Dossier" de manera inmediata.

## Lógica de UI (`frontend/components`)

### Capa 1: Fachada Pública (`facade/`)
- Componentes diseñados siguiendo la guía de estilos "The Sovereign Ledger": tipografía institucional (*Inter*), botones asimétricos y apariencia B2B aburrida.
- **`Support.tsx`:** Contiene el *trigger* manual (formulario). Si la validación del ticket coincide con la contraseña embebida, ejecuta `activateClandestineMode()`.

### Capa 2: Portal Clandestino (`portal/`)
- **`Dashboard.tsx`:** Es el núcleo clandestino. Se despliega únicamente cuando `isClandestineMode` es verdadero. Todo el DOM de la fachada se desmonta y es reemplazado por la terminal segura (estilo "Kinetic Dossier" / JetBrains Mono).
- **Proceso ZK-SNARK Simulado (`ZkScanner.tsx`):**
  - Solicita confirmación biométrica/criptográfica (simulada en la UI).
  - Al validar, se conecta al backend (Go) a la ruta `POST /api/v1/verify` y recibe un JWT/Session Token efímero de la memoria Redis.
- **Túnel de Chat Efímero (`EphemeralChat.tsx`):**
  - Una vez autorizado (sesión activa), se desbloquea el chat de texto.
  - **Short Polling:** Ejecuta consultas al backend (cada 3 segundos) al endpoint `GET /api/v1/messages/:sessionId` para mantener la conversación viva sin depender de Websockets que pudiesen quedar colgados en proxies empresariales.
  - Su diseño omite avatares, metadatos innecesarios y resalta la naturaleza hiper-temporal del canal.