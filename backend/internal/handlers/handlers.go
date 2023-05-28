package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/justinas/nosurf"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/driver"
	"github.com/prosper74/real-estate-app/internal/repository"
	"github.com/prosper74/real-estate-app/internal/repository/dbrepo"
)

var Repo *Repository

// Repository is the repository type
type Repository struct {
	App *config.AppConfig
	DB  repository.DatabaseRepo
}

// This function creates a new repository
func NewRepo(appConfig *config.AppConfig, dbConnectionPool *driver.DB) *Repository {
	return &Repository{
		App: appConfig,
		DB:  dbrepo.NewPostgresRepo(dbConnectionPool.SQL, appConfig),
	}
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
