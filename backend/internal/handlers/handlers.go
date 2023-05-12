package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/justinas/nosurf"
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

	data := make(map[string]interface{})
	data["CSRFToken"] = nosurf.Token(r)

	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) PostSignUp(w http.ResponseWriter, r *http.Request) {
	// Logic for handling user registration
	first_name := r.Form.Get("first_name")
	last_name := r.Form.Get("last_name")
	email := r.Form.Get("email")
	password := r.Form.Get("password")

	fmt.Println("Username: ", first_name+" "+last_name)
	fmt.Println("Email: ", email)
	fmt.Println("Password: ", password)

	resp := []byte(`{"status": "ok"}, {"message": "User created"}`)
	w.Write(resp)
}
