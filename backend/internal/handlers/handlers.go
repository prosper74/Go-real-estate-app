package handlers

import (
	"net/http"

	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/db"
)

var Repo *Repository

// Repository is the repository type
type Repository struct {
	App *config.AppConfig
	DB  db.DatabaseRepo
}

// This function NewHandlers, sets the repository for the handlers
func NewHandlers(r *Repository) {
	Repo = r
}

func (m *Repository) Home(w http.ResponseWriter, r *http.Request) {
	resp := []byte(`{"status": "ok"}, {"Welcome": "Hello World!"}`)
	w.Write(resp)
}

func (m *Repository) SignUp(w http.ResponseWriter, r *http.Request) {
	// Logic for handling user registration
}

func (m *Repository) PostSignUp(w http.ResponseWriter, r *http.Request) {
	// Logic for handling user registration
}
