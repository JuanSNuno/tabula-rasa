package services

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"

	"tabula-rasa-backend/internal/core/domain"
	"tabula-rasa-backend/internal/core/ports"
)

type grantAccessPassService struct {
	sessionRepo ports.SessionRepository
}

// NewGrantAccessPassService crea una nueva instancia del caso de uso GrantAccessPass.
// Solo puede otorgar el pase a sesiones previamente verificadas por ZK-Proof.
func NewGrantAccessPassService(repo ports.SessionRepository) ports.GrantAccessPassUseCase {
	return &grantAccessPassService{
		sessionRepo: repo,
	}
}

// Execute valida que la sesión exista y esté verificada por ZK, luego genera
// un AccessPass aleatorio (token hex de 8 bytes = 16 chars) y lo persiste en Redis.
// El pase no es una contraseña rastreable: es efímero y expira junto con la sesión (TTL 4h).
func (s *grantAccessPassService) Execute(ctx context.Context, sessionID string) (*domain.Session, error) {
	// 1. Recuperar la sesión del repositorio efímero
	session, err := s.sessionRepo.GetByID(ctx, sessionID)
	if err != nil {
		return nil, fmt.Errorf("error recuperando sesión: %w", err)
	}
	if session == nil {
		return nil, errors.New("sesión no encontrada o expirada")
	}

	// 2. Guardia de seguridad: solo las sesiones verificadas por ZK pueden recibir el pase.
	// Esto previene que el Operador otorgue acceso sin verificación previa.
	if !session.IsVerified {
		return nil, errors.New("la sesión no ha completado la verificación ZK. Pase denegado")
	}

	// 3. Generar el pase de acceso: token aleatorio criptográficamente seguro de 8 bytes (16 hex chars).
	// No es una contraseña: el cliente no lo crea ni lo recuerda; expira automáticamente con la sesión.
	passBytes := make([]byte, 8)
	if _, err := rand.Read(passBytes); err != nil {
		return nil, fmt.Errorf("error generando pase de acceso: %w", err)
	}
	session.AccessPass = hex.EncodeToString(passBytes)

	// 4. Persistir la sesión actualizada en Redis.
	// El TTL original (ExpiresAt) se preserva; el pase tiene la misma caducidad que la sesión.
	if err := s.sessionRepo.Save(ctx, session); err != nil {
		return nil, fmt.Errorf("error persistiendo pase de acceso: %w", err)
	}

	return session, nil
}
