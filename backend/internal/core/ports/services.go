package ports

import (
	"context"
	"tabula-rasa-backend/internal/core/domain"
)

// CreateSessionUseCase gestiona la creación inicial de una sesión anónima.
type CreateSessionUseCase interface {
	Execute(ctx context.Context, publicKey string) (*domain.Session, error)
}

// VerifyProofUseCase evalúa la prueba ZK y actualiza el estado de la sesión si es válida.
type VerifyProofUseCase interface {
	Execute(ctx context.Context, sessionID string, proofPayload string) (bool, error)
}

// RouteMessageUseCase maneja el enrutamiento de mensajes encriptados.
type RouteMessageUseCase interface {
	SendMessage(ctx context.Context, sessionID string, encryptedPayload string) (*domain.Message, error)
	GetMessages(ctx context.Context, sessionID string) ([]*domain.Message, error)
}

// GrantAccessPassUseCase otorga un pase de acceso temporal al cliente ya verificado por ZK.
// El pase es un token efímero que habilita el canal de chat sin requerir cuenta ni contraseña rastreable.
type GrantAccessPassUseCase interface {
	Execute(ctx context.Context, sessionID string) (*domain.Session, error)
}
