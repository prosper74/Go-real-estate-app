package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/justinas/nosurf"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/driver"
	"github.com/prosper74/real-estate-app/internal/helpers"
	"github.com/prosper74/real-estate-app/internal/models"
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
	templateData := &models.TemplateData{}

	templateData.Flash = m.App.Session.PopString(r.Context(), "flash")
	templateData.Error = m.App.Session.PopString(r.Context(), "error")
	templateData.Warning = m.App.Session.PopString(r.Context(), "warning")
	templateData.CSRFToken = nosurf.Token(r)

	properties, err := m.DB.AllFeaturedProperties()
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	data := make(map[string]interface{})
	data["properties"] = properties
	data["templateData"] = templateData

	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) SignUp(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	data["CSRFToken"] = nosurf.Token(r)
	// data["users"] = users
	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}
