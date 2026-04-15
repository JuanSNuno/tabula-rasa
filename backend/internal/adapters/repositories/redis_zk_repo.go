package repositories

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"tabula-rasa-backend/internal/core/domain"

	"github.com/redis/go-redis/v9"
)

type redisZkLogRepository struct {
	client *redis.Client
}

func NewRedisZkLogRepository(client *redis.Client) *redisZkLogRepository {
	return &redisZkLogRepository{
		client: client,
	}
}

func (r *redisZkLogRepository) Save(ctx context.Context, log *domain.ZkProofLog) error {
	// Guardamos por sessionId para validación rápida
	key := fmt.Sprintf("zklog:%s", log.SessionID)
	data, err := json.Marshal(log)
	if err != nil {
		return err
	}

	// 4 hours TTL
	return r.client.Set(ctx, key, data, 4*time.Hour).Err()
}

func (r *redisZkLogRepository) GetBySessionID(ctx context.Context, sessionID string) (*domain.ZkProofLog, error) {
	key := fmt.Sprintf("zklog:%s", sessionID)
	data, err := r.client.Get(ctx, key).Bytes()
	if err == redis.Nil {
		return nil, nil
	} else if err != nil {
		return nil, err
	}

	var log domain.ZkProofLog
	err = json.Unmarshal(data, &log)
	return &log, err
}
