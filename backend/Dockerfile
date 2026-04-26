FROM golang:1.22-alpine AS builder

WORKDIR /app

# Descargar dependencias
COPY go.mod go.sum ./
RUN go mod download

# Construir
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /api ./cmd/api/main.go

# Contenedor final
FROM alpine:latest

WORKDIR /app

# Copiar el binario desde la fase de builder
COPY --from=builder /api /api

# Puerto que se expondrá (Render inyecta PORT dinámicamente)
EXPOSE 8080

# Comando de inicio
CMD ["/api"]