# Backend Core Logic (Go / Fiber)

El backend de **Tabula Rasa** está diseñado siguiendo estrictamente los principios de la **Arquitectura Hexagonal (Ports and Adapters)**. Su objetivo principal es asegurar el anonimato total mediante una política de **Zero-Logs** (Cero Registros).

## Estructura de Directorios (`backend/internal/core`)

La lógica central del negocio reside en el paquete `core`, aislado de cualquier framework externo (Fiber) o base de datos (Redis).

### 1. `domain` (Entidades de Negocio)
Define las estructuras puras de datos. Todas las entidades imponen un **TTL (Time-To-Live)** como regla de negocio inquebrantable para la autodestrucción.
- **`Session`**: Representa a un usuario autenticado anónimamente mediante la validación de ZK-SNARK. (TTL: 4 horas).
- **`ZkProofLog`**: Representa el intento de negociación criptográfica para generar una sesión. (TTL: 4 horas).
- **`Message`**: Representa un mensaje dentro del chat efímero cifrado. (TTL: 15 minutos).

### 2. `ports` (Interfaces)
Define los contratos (interfaces) que los adaptadores externos deben implementar.
- **`repositories.go`**: Interfaces para el almacenamiento temporal en memoria (`SessionRepository`, `ZkRepository`, `MessageRepository`).
- **`services.go`**: Interfaces para los casos de uso (`SessionUseCase`, `ZkUseCase`, `ChatUseCase`).

### 3. `services` (Casos de Uso)
Contiene la lógica de negocio orquestando los puertos.
- **`session_service.go`**: Lógica para crear y validar sesiones anónimas.
- **`zk_service.go`**: Simula la verificación de una prueba ZK-SNARK (Polygon ID simulado). Si el payload es válido, aprueba la creación de la sesión.
- **`chat_service.go`**: Gestiona el envío y recepción de mensajes. Todos los mensajes se guardan con su TTL asociado obligando a que se destruyan automáticamente.

## Adaptadores (`backend/internal/adapters`)

### 1. `repositories` (Redis)
Implementan las interfaces de `ports/repositories.go` usando `go-redis/v9`.
- **Política Zero-Logs:** Se utiliza un servidor Redis configurado con `--save ""` y `--appendonly no`. Las implementaciones (`redis_session_repo.go`, `redis_message_repo.go`, `redis_zk_repo.go`) inyectan forzosamente el TTL en cada comando `SET` o en las listas de mensajes asegurando que no queden rastros.

### 2. `handlers` (Fiber HTTP)
- **`http_handler.go`**: Implementa el servidor RESTful usando Fiber. Expone los endpoints:
  - `POST /api/v1/verify`: Para recibir la prueba ZK y devolver un Token de Sesión.
  - `GET /api/v1/session/:id`: Para validar si una sesión sigue viva (no expirada).
  - `POST /api/v1/messages`: Para publicar un mensaje en el túnel.
  - `GET /api/v1/messages/:sessionId`: Para obtener el registro de mensajes mediante Long/Short Polling.
