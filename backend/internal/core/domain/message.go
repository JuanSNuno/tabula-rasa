package domain

import (
	"time"
)

// Message representa un payload encriptado enviado a través de la Mixnet.
// TTL Obligatorio en Repositorio: 15 minutos.
type Message struct {
	ID               string    `json:"id"`
	SessionID        string    `json:"sessionId"`
	EncryptedPayload string    `json:"encryptedPayload"`
	ExpiresAt        time.Time `json:"expiresAt"`
}
