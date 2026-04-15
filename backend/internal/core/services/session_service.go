package services

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"time"

	"tabula-rasa-backend/internal/core/domain"
	"tabula-rasa-backend/internal/core/ports"
)

type createSessionService struct {
	sessionRepo ports.SessionRepository
}

// NewCreateSessionService crea una nueva instancia del caso de uso CreateSession.
func NewCreateSessionService(repo ports.SessionRepository) ports.CreateSessionUseCase {
	return &createSessionService{
		sessionRepo: repo,
	}
}

func (s *createSessionService) Execute(ctx context.Context, publicKey string) (*domain.Session, error) {
	// Generar un ID único (UUID v4 simplificado o Random Hex para el MVP)
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return nil, fmt.Errorf("error generando session ID: %w", err)
	}
	id := hex.EncodeToString(bytes)

	session := &domain.Session{
		ID:         id,
		PublicKey:  publicKey,
		IsVerified: false,
		ExpiresAt:  time.Now().Add(4 * time.Hour), // TTL de 4 horas
	}

	err := s.sessionRepo.Save(ctx, session)
	if err != nil {
		return nil, fmt.Errorf("error guardando sesión en repositorio: %w", err)
	}

	return session, nil
}
