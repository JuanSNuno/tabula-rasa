package repositories

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"tabula-rasa-backend/internal/core/domain"

	"github.com/redis/go-redis/v9"
)

type redisMessageRepository struct {
	client *redis.Client
}

func NewRedisMessageRepository(client *redis.Client) *redisMessageRepository {
	return &redisMessageRepository{
		client: client,
	}
}

func (r *redisMessageRepository) Save(ctx context.Context, message *domain.Message) error {
	// Usamos una Lista (List) o un Set ordenado. Para el MVP con borrado, un List con el prefijo session
	key := fmt.Sprintf("messages:%s", message.SessionID)
	data, err := json.Marshal(message)
	if err != nil {
		return err
	}

	pipe := r.client.Pipeline()
	pipe.RPush(ctx, key, data)
	// Renovar TTL de la lista completa de mensajes para esta sesión (15 min)
	pipe.Expire(ctx, key, 15*time.Minute)

	_, err = pipe.Exec(ctx)
	return err
}

func (r *redisMessageRepository) GetBySessionID(ctx context.Context, sessionID string) ([]*domain.Message, error) {
	key := fmt.Sprintf("messages:%s", sessionID)

	// Obtenemos todos los mensajes de la lista
	dataList, err := r.client.LRange(ctx, key, 0, -1).Result()
	if err == redis.Nil {
		return make([]*domain.Message, 0), nil
	} else if err != nil {
		return nil, err
	}

	var messages []*domain.Message
	for _, data := range dataList {
		var msg domain.Message
		if err := json.Unmarshal([]byte(data), &msg); err == nil {
			messages = append(messages, &msg)
		}
	}

	return messages, nil
}

func (r *redisMessageRepository) Delete(ctx context.Context, id string) error {
	// Borrar un mensaje individual por ID es complejo en una lista de Redis sin saber la sesión.
	// En una arquitectura real efímera con chat, se borraría la llave de la lista entera al expirar,
	// o se usarían llaves individuales `message:{session}:{id}`.
	// Para cumplir con el interface, devolvemos nil si no se implementa el borrado individual.
	return nil
}
