package sprint5

import (
	"context"
	"fmt"
	"math/rand"

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
	seedName := fmt.Sprintf("Alex %d", rand.Intn(1000))
	newIdent := &domain.Identity{
		ID:          subjectID,
		Alias:       seedName,
		PassportNum: fmt.Sprintf("P-%06d", rand.Intn(999999)),
		CreditScore: 720 + rand.Intn(130),
		Backstory:   "Reallocated via Sovereign Ledger protocol. Previous history expunged.",
		Dependents:  []string{},
		PhotoURL:    fmt.Sprintf("https://api.dicebear.com/7.x/avataaars/svg?seed=%s&style=transparent", subjectID),
		Address:     fmt.Sprintf("%d Null Sector, Grid %d", rand.Intn(900), rand.Intn(10)),
		JobTitle:    "Systems Analyst Level 2",
		Clearance:   "Classified",
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
	// mock generation takes longer in UI, but API responds quickly with the mock payload
	seedId := fmt.Sprintf("SCAF-%04d", rand.Intn(9999))
	ident := domain.Identity{
		ID:          seedId,
		Alias:       fmt.Sprintf("Generated Persona %d", rand.Intn(100)),
		PassportNum: fmt.Sprintf("EU-%08d", rand.Intn(99999999)),
		CreditScore: 810,
		Backstory:   seed,
		Dependents:  []string{},
		PhotoURL:    fmt.Sprintf("https://api.dicebear.com/7.x/avataaars/svg?seed=%s", seedId),
		Address:     "Sector 7G, Avalón District",
		JobTitle:    "Cyber-Logistics Engineer",
		Clearance:   "Confidential",
	}

	return &domain.ScaffoldResult{
		ID:   seedId,
		Seed: seed,
		Documents: []string{
			"Academic Degree: M.S. Distributed Systems (2014) - Validated via forged transcripts.",
			"Financial History: 10 years of consistent tax returns & payroll deposits.",
			"Social Graph: 34 active synthetic accounts simulating standard peer connections.",
			"Biometric Injection: Passport hash seeded into 5 major border control nodes.",
		},
		Status: "GENERATED",
		Identity: ident,
	}
}
