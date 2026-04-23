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
	// AccessPass es el pase de acceso temporal otorgado por el Operador de Admisión.
	// Solo se genera tras la verificación ZK exitosa. No es una contraseña rastreable.
	// Vacío ("") indica que el pase aún no ha sido concedido.
	AccessPass string `json:"accessPass,omitempty"`
}
