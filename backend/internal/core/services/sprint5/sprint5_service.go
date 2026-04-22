package sprint5

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"tabula-rasa-backend/internal/adapters/repositories/sprint5"
	domain "tabula-rasa-backend/internal/core/domain/sprint5"
)

type Sprint5Service struct {
	repo *sprint5.RedisSprint5Repo
}

func NewSprint5Service(repo *sprint5.RedisSprint5Repo) *Sprint5Service {
	return &Sprint5Service{repo: repo}
}

func (s *Sprint5Service) GetOrCreatePortfolio(ctx context.Context, subjectID string) (*domain.Identity, error) {
	ident, err := s.repo.GetIdentity(ctx, subjectID)
	if err == nil && ident != nil {
		return ident, nil
	}

	// mock generative content
	newIdent := &domain.Identity{
		ID:          subjectID,
		Alias:       fmt.Sprintf("Alex %d", rand.Intn(1000)),
		PassportNum: fmt.Sprintf("P-%d", rand.Intn(999999)),
		CreditScore: 700 + rand.Intn(150),
		Backstory:   "Moved from Europe 10 years ago. Works in IT.",
		Dependents:  []string{},
	}
	s.repo.SaveIdentity(ctx, newIdent)
	return newIdent, nil
}

func (s *Sprint5Service) AddDependent(ctx context.Context, subjectID string, depName string) (*domain.Identity, error) {
	ident, err := s.GetOrCreatePortfolio(ctx, subjectID)
	if err != nil {
		return nil, err
	}
	ident.Dependents = append(ident.Dependents, depName)
	s.repo.SaveIdentity(ctx, ident)
	return ident, nil
}

func (s *Sprint5Service) GenerateScaffold(ctx context.Context, seed string) *domain.ScaffoldResult {
	// mock generation
	time.Sleep(2 * time.Second) // simulate processing
	return &domain.ScaffoldResult{
		ID:   fmt.Sprintf("scaf-%d", rand.Intn(1000)),
		Seed: seed,
		Documents: []string{
			"Degree: B.S. Computer Science 2012",
			"Tax Records: 2018-2024",
			"Utility Bills: Water & Energy (Fake Corp)",
		},
		Status: "GENERATED",
	}
}
