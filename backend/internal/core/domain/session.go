package domain

import (
	"time"
)

// Session representa una conexión activa de un cliente en la Mixnet.
// TTL Obligatorio en Repositorio: 4 horas.
type Session struct {
	ID         string    `json:"id"`
	PublicKey  string    `json:"publicKey"`
	IsVerified bool      `json:"isVerified"`
	ExpiresAt  time.Time `json:"expiresAt"`
}
