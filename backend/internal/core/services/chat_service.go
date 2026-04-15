package services

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"time"

	"tabula-rasa-backend/internal/core/domain"
	"tabula-rasa-backend/internal/core/ports"
)

type routeMessageService struct {
	sessionRepo ports.SessionRepository
	messageRepo ports.MessageRepository
}

func NewRouteMessageService(sRepo ports.SessionRepository, mRepo ports.MessageRepository) ports.RouteMessageUseCase {
	return &routeMessageService{
		sessionRepo: sRepo,
		messageRepo: mRepo,
	}
}

func (s *routeMessageService) SendMessage(ctx context.Context, sessionID string, encryptedPayload string) (*domain.Message, error) {
	// Validar que la sesión existe y está verificada por ZK
	session, err := s.sessionRepo.GetByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}
	if session == nil || !session.IsVerified {
		return nil, errors.New("sesión no autorizada o no verificada")
	}

	// Generar ID para el mensaje
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return nil, fmt.Errorf("error generando message ID: %w", err)
	}
	id := hex.EncodeToString(bytes)

	msg := &domain.Message{
		ID:               id,
		SessionID:        sessionID,
		EncryptedPayload: encryptedPayload,
		ExpiresAt:        time.Now().Add(15 * time.Minute), // TTL estricto de 15 minutos
	}

	err = s.messageRepo.Save(ctx, msg)
	if err != nil {
		return nil, err
	}

	return msg, nil
}

func (s *routeMessageService) GetMessages(ctx context.Context, sessionID string) ([]*domain.Message, error) {
	// Para el Short Polling
	session, err := s.sessionRepo.GetByID(ctx, sessionID)
	if err != nil {
		return nil, err
	}
	if session == nil || !session.IsVerified {
		return nil, errors.New("sesión no autorizada o no verificada")
	}

	return s.messageRepo.GetBySessionID(ctx, sessionID)
}
