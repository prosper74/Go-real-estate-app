package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/justinas/nosurf"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/db"
	"github.com/prosper74/real-estate-app/internal/models"
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

	// _, err := m.DB.GetAllUsers()
	// if err != nil {
	// 	log.Println("error getting user: ", err)
	// }

	// fmt.Println(json.MarshalIndent(users, "", "    "))

	data := make(map[string]interface{})
	data["CSRFToken"] = nosurf.Token(r)
	// data["users"] = users
	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) PostSignUp(w http.ResponseWriter, r *http.Request) {
	var user *models.User

	user.FirstName = "Prosper"
	user.LastName = "Atu"
	user.Email = "atu@prosper.com"
	user.Password = "password"

	response, err := m.DB.CreateUser(user)
	if err != nil {
		log.Println("Unable to create user:", err)
	}

	fmt.Println(json.MarshalIndent(response, "", "    "))

	resp := []byte(`{"status": "ok"}, {"message": "User created"}`)
	w.Write(resp)
}
