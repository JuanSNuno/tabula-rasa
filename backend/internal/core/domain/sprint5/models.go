package sprint5

type Dependent struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Age       int    `json:"age"`
	Relation  string `json:"relationship"`
	Medical   string `json:"medicalNeeds"`
	Status    string `json:"status"`
	Clearance string `json:"clearanceStatus"`
}

type Identity struct {
	ID          string      `json:"id"`
	Alias       string      `json:"alias"`
	PassportNum string      `json:"passportNum"`
	CreditScore int         `json:"creditScore"`
	Backstory   string      `json:"backstory"`
	Dependents  []Dependent `json:"dependents"`
	PhotoURL    string      `json:"photoUrl"`
	Address     string      `json:"address"`
	JobTitle    string      `json:"jobTitle"`
	Clearance   string      `json:"clearance"`
}

type ScaffoldResult struct {
	ID        string   `json:"id"`
	Seed      string   `json:"seed"`
	Documents []string `json:"documents"`
	Status    string   `json:"status"`
	Identity  Identity `json:"identity"`
}
