package services

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"time"

	"tabula-rasa-backend/internal/core/domain"
	"tabula-rasa-backend/internal/core/ports"
)

type verifyProofService struct {
	sessionRepo ports.SessionRepository
	zkLogRepo   ports.ZkProofLogRepository
}

func NewVerifyProofService(sRepo ports.SessionRepository, zRepo ports.ZkProofLogRepository) ports.VerifyProofUseCase {
	return &verifyProofService{
		sessionRepo: sRepo,
		zkLogRepo:   zRepo,
	}
}

func (s *verifyProofService) Execute(ctx context.Context, sessionID string, proofPayload string) (bool, error) {
	// 1. Obtener la sesión
	session, err := s.sessionRepo.GetByID(ctx, sessionID)
	if err != nil {
		return false, err
	}
	if session == nil {
		return false, errors.New("sesión no encontrada o expirada")
	}

	// 2. Simular Verificación ZK
	// En producción, aquí se evaluaría el zk-SNARK con Polygon ID.
	// Para el MVP, asumiremos que si el payload no está vacío, es válido (simulación).
	isValid := len(proofPayload) > 10

	// 3. Crear Log Efímero
	hash := sha256.Sum256([]byte(proofPayload))
	proofHash := hex.EncodeToString(hash[:])
	
	zkLog := &domain.ZkProofLog{
		ProofHash:  proofHash,
		SessionID:  sessionID,
		Result:     isValid,
		VerifiedAt: time.Now(),
	}
	_ = s.zkLogRepo.Save(ctx, zkLog)

	// 4. Actualizar la Sesión si es válida
	if isValid {
		session.IsVerified = true
		_ = s.sessionRepo.Save(ctx, session) // Renovar/actualizar sesión en Redis
	}

	return isValid, nil
}
