package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/justinas/nosurf"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/driver"
	"github.com/prosper74/real-estate-app/internal/forms"
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

	if m.App.Session.Exists(r.Context(), "user_id") {
		templateData.IsAuthenticated = 1
	}

	properties, err := m.DB.AllProperties()
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

func (m *Repository) CSRFToken(w http.ResponseWriter, r *http.Request) {
	token := nosurf.Token(r)

	data := make(map[string]string)
	data["token"] = token

	log.Println("Data: ", data)

	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) Buy(w http.ResponseWriter, r *http.Request) {
	templateData := &models.TemplateData{}

	templateData.Flash = m.App.Session.PopString(r.Context(), "flash")
	templateData.Error = m.App.Session.PopString(r.Context(), "error")
	templateData.Warning = m.App.Session.PopString(r.Context(), "warning")
	templateData.CSRFToken = nosurf.Token(r)

	properties, err := m.DB.AllBuyProperties()
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

func (m *Repository) Rent(w http.ResponseWriter, r *http.Request) {
	templateData := &models.TemplateData{}

	templateData.Flash = m.App.Session.PopString(r.Context(), "flash")
	templateData.Error = m.App.Session.PopString(r.Context(), "error")
	templateData.Warning = m.App.Session.PopString(r.Context(), "warning")
	templateData.CSRFToken = nosurf.Token(r)

	properties, err := m.DB.AllRentProperties()
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

func (m *Repository) Shortlet(w http.ResponseWriter, r *http.Request) {
	templateData := &models.TemplateData{}

	templateData.Flash = m.App.Session.PopString(r.Context(), "flash")
	templateData.Error = m.App.Session.PopString(r.Context(), "error")
	templateData.Warning = m.App.Session.PopString(r.Context(), "warning")
	templateData.CSRFToken = nosurf.Token(r)

	properties, err := m.DB.AllShortletProperties()
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

func (m *Repository) SingleProperty(w http.ResponseWriter, r *http.Request) {
	templateData := &models.TemplateData{}

	templateData.Flash = m.App.Session.PopString(r.Context(), "flash")
	templateData.Error = m.App.Session.PopString(r.Context(), "error")
	templateData.Warning = m.App.Session.PopString(r.Context(), "warning")
	templateData.CSRFToken = nosurf.Token(r)

	urlParams := strings.Split(r.RequestURI, "/")
	id, err := strconv.Atoi(urlParams[2])

	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	property, err := m.DB.GetPropertyByID(id)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	data := make(map[string]interface{})
	data["property"] = property
	data["templateData"] = templateData

	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) PropertiesRelatedByType(w http.ResponseWriter, r *http.Request) {
	propertyType := r.URL.Query().Get("type")

	properties, err := m.DB.GetPropertiesByType(propertyType)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	data := make(map[string]interface{})
	data["properties"] = properties

	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) UserProperties(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	properties, err := m.DB.GetUserPropertiesByID(id)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	data := make(map[string]interface{})
	data["properties"] = properties

	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) Login(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	data["CSRFToken"] = nosurf.Token(r)
	// data["users"] = users
	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) SignUp(w http.ResponseWriter, r *http.Request) {
	// Clear the token in session
	_ = m.App.Session.RenewToken(r.Context())

	templateData := &models.TemplateData{}
	templateData.Flash = m.App.Session.PopString(r.Context(), "flash")
	templateData.Error = m.App.Session.PopString(r.Context(), "error")
	templateData.Warning = m.App.Session.PopString(r.Context(), "warning")
	templateData.CSRFToken = nosurf.Token(r)

	if m.App.Session.Exists(r.Context(), "user_id") {
		templateData.IsAuthenticated = 1
	}

	data := make(map[string]interface{})

	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	formBody := r.Body
	formValues := r.FormValue("first_name")

	log.Println("Formbody:", formBody)
	log.Println("FormVal:", formValues)

	first_name := r.PostFormValue("first_name")
	last_name := r.PostFormValue("last_name")
	email := r.PostFormValue("email")
	password := r.PostFormValue("password")
	csrf_token := r.PostFormValue("csrf_token")

	log.Printf("User login details are First name: %s, last name: %s, Email: %s, password: %s, csrf_token: %s", first_name, last_name, email, password, csrf_token)

	form := forms.New(r.PostForm)

	if !form.Valid() {
		data["email"] = email
		data["first_name"] = first_name
		data["last_name"] = last_name
		data["email"] = email
		m.App.Session.Put(r.Context(), "error", "Invalid inputs")

		data["message"] = "Invalid form inputs"
		data["templateData"] = templateData
		out, _ := json.MarshalIndent(data, "", "    ")

		resp := []byte(out)
		w.Write(resp)

		return
	}

	data["message"] = "Successful!!!"
	// data["users"] = users
	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}
