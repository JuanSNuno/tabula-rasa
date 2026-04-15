package repositories

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"tabula-rasa-backend/internal/core/domain"

	"github.com/redis/go-redis/v9"
)

type redisSessionRepository struct {
	client *redis.Client
}

func NewRedisSessionRepository(client *redis.Client) *redisSessionRepository {
	return &redisSessionRepository{
		client: client,
	}
}

func (r *redisSessionRepository) Save(ctx context.Context, session *domain.Session) error {
	key := fmt.Sprintf("session:%s", session.ID)
	data, err := json.Marshal(session)
	if err != nil {
		return err
	}

	ttl := time.Until(session.ExpiresAt)
	if ttl <= 0 {
		ttl = 4 * time.Hour // Default fallback
	}

	return r.client.Set(ctx, key, data, ttl).Err()
}

func (r *redisSessionRepository) GetByID(ctx context.Context, id string) (*domain.Session, error) {
	key := fmt.Sprintf("session:%s", id)
	data, err := r.client.Get(ctx, key).Bytes()
	if err == redis.Nil {
		return nil, nil // No encontrado o expirado (Zero-Logs en acción)
	} else if err != nil {
		return nil, err
	}

	var session domain.Session
	err = json.Unmarshal(data, &session)
	if err != nil {
		return nil, err
	}

	return &session, nil
}

func (r *redisSessionRepository) Delete(ctx context.Context, id string) error {
	key := fmt.Sprintf("session:%s", id)
	return r.client.Del(ctx, key).Err()
}
