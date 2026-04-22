package sprint5

type Identity struct {
	ID          string   `json:"id"`
	Alias       string   `json:"alias"`
	PassportNum string   `json:"passportNum"`
	CreditScore int      `json:"creditScore"`
	Backstory   string   `json:"backstory"`
	Dependents  []string `json:"dependents"`
}

type ScaffoldResult struct {
	ID        string   `json:"id"`
	Seed      string   `json:"seed"`
	Documents []string `json:"documents"`
	Status    string   `json:"status"`
}
