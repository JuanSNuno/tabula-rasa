package ports

import (
	"context"
	"tabula-rasa-backend/internal/core/domain"
)

// SessionRepository define los métodos para gestionar sesiones efímeras (Zero-Logs).
type SessionRepository interface {
	Save(ctx context.Context, session *domain.Session) error
	GetByID(ctx context.Context, id string) (*domain.Session, error)
	Delete(ctx context.Context, id string) error
}

// ZkProofLogRepository define los métodos para gestionar el resultado de las pruebas ZK.
type ZkProofLogRepository interface {
	Save(ctx context.Context, log *domain.ZkProofLog) error
	GetBySessionID(ctx context.Context, sessionID string) (*domain.ZkProofLog, error)
}

// MessageRepository define los métodos para el chat efímero.
type MessageRepository interface {
	Save(ctx context.Context, message *domain.Message) error
	GetBySessionID(ctx context.Context, sessionID string) ([]*domain.Message, error)
	Delete(ctx context.Context, id string) error
}
