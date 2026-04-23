package sprint5

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/redis/go-redis/v9"
	"tabula-rasa-backend/internal/core/domain/sprint5"
)

type RedisSprint5Repo struct {
	client *redis.Client
}

func NewRedisSprint5Repo(client *redis.Client) *RedisSprint5Repo {
	return &RedisSprint5Repo{client: client}
}

func (r *RedisSprint5Repo) SaveIdentity(ctx context.Context, ident *sprint5.Identity) error {
	data, _ := json.Marshal(ident)
	return r.client.Set(ctx, fmt.Sprintf("tr:identity:%s", ident.ID), data, 0).Err()
}

func (r *RedisSprint5Repo) GetIdentity(ctx context.Context, id string) (*sprint5.Identity, error) {
	data, err := r.client.Get(ctx, fmt.Sprintf("tr:identity:%s", id)).Bytes()
	if err != nil {
		return nil, err
	}
	var ident sprint5.Identity
	json.Unmarshal(data, &ident)
	return &ident, nil
}
