package domain

import (
	"time"
)

// ZkProofLog registra el resultado de una evaluación de conocimiento cero.
// TTL Obligatorio en Repositorio: 4 horas.
type ZkProofLog struct {
	ProofHash  string    `json:"proofHash"`
	SessionID  string    `json:"sessionId"`
	Result     bool      `json:"result"`
	VerifiedAt time.Time `json:"verifiedAt"`
}
