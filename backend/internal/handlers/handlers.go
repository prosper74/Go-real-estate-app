package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
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

func (m *Repository) TokensAndUserID(w http.ResponseWriter, r *http.Request) {
	// load session
	_ = m.App.Session.RenewToken(r.Context())
	token := nosurf.Token(r)

	userId, _ := strconv.Atoi(r.Form.Get("user_id"))

	log.Println("user id:", userId)

	// Generate jwt if the user needs to make request to the server
	jwtToken, err := helpers.GenerateJWTToken(userId)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	data := make(map[string]interface{})
	data["token"] = token
	data["jwt_token"] = jwtToken
	data["user_id"] = userId

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

func (m *Repository) SignUp(w http.ResponseWriter, r *http.Request) {
	user := models.User{}

	templateData := &models.TemplateData{}

	if m.App.Session.Exists(r.Context(), "user_id") {
		templateData.IsAuthenticated = 1
	}

	data := make(map[string]interface{})

	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	user.FirstName = r.PostFormValue("first_name")
	user.LastName = r.PostFormValue("last_name")
	user.Email = r.PostFormValue("email")
	user.Password = r.PostFormValue("password")

	userExist, err := m.DB.CheckIfUserEmailExist(user.Email)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	if userExist {
		log.Println("Email exist")
		data["error"] = "email exist"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	newUserID, err := m.DB.InsertUser(user)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	jwtToken, err := helpers.GenerateJWTToken(newUserID)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	user.Token = jwtToken
	m.App.Session.Put(r.Context(), "user", user)

	// Send email notification to customer
	htmlBody := fmt.Sprintf(`
	<strong>Verify Your Account</strong><br />
	<p>Dear %s %s, </p>
	<p>Welcome to our website.</p>
	<strong>Kindly click the link below</strong>
	<a href="http://localhost:3000/verify-email?userid=%d&token=%s", target="_blank">Verify Account</a>
	<p>We hope to see you soon</p>
	`, user.FirstName, user.LastName, newUserID, jwtToken)

	message := models.MailData{
		To:      user.Email,
		From:    "prosperdevstack@gmail.com",
		Subject: "Verify Your Email",
		Content: htmlBody,
	}

	m.App.MailChannel <- message
	// End of emails

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) ResendEmailVerification(w http.ResponseWriter, r *http.Request) {
	user := models.User{}

	data := make(map[string]interface{})

	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	user.ID, _ = strconv.Atoi(r.PostFormValue("user_id"))

	user, err = m.DB.GetUserByID(user.ID)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	jwtToken, err := helpers.GenerateJWTToken(user.ID)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	user.Token = jwtToken
	m.App.Session.Put(r.Context(), "user", user)

	// Send email notification to customer
	htmlBody := fmt.Sprintf(`
	<strong>Verify Your Email</strong><br />
	<p>Dear %s %s, </p>
	<p>Welcome to our website.</p>
	<strong>Kindly click the link below to verify your email</strong>
	<a href="http://localhost:3000/verify-email?userid=%d&token=%s", target="_blank">Verify Email</a>
	<strong>Note that this link will expire in 24 hours and you can only resend another verification after the expiration of this link</strong>
	<p>We hope to see you soon</p>
	`, user.FirstName, user.LastName, user.ID, jwtToken)

	message := models.MailData{
		To:      user.Email,
		From:    "prosperdevstack@gmail.com",
		Subject: "Verify Your Email",
		Content: htmlBody,
	}

	m.App.MailChannel <- message
	// End of emails

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) VerifyUserEmail(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	// get the user id and JWT token string from the url request
	userID, _ := strconv.Atoi(r.URL.Query().Get("userid"))
	tokenString := r.URL.Query().Get("token")

	user, err := m.DB.GetUserByID(userID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to Get User from database"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Provide the secret key used for signing the token
		return []byte(jwtSecret), nil
	})
	if err != nil {
		// Handle token parsing or verification errors
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Check if the token is valid
	if token.Valid {
		// Update the user's account status as verified
		user.AccessLevel = 2
		err = m.DB.UpdateUserAccessLevel(user)
		if err != nil {
			helpers.ServerError(w, err)
			data["error"] = "Unable to update user's access level. Please contact support"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}
	} else {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Handle successful email verification, Send email notification to customer
	htmlBody := fmt.Sprintf(`
	<strong>Successful</strong><br />
	<p>Hi %s, </p>
	<h3>Your email has been verified.</h3>
	<p>You can now login to your account and upload your properties.</p>
	<strong>Note:<strong>
	<p>You still need to verify your account to gain more leads. <br />
	Go to your account dashboard and verify your account by providing the required verification documents.</p>
	<p>We hope to see you soon</p>
	`, user.FirstName)

	message := models.MailData{
		To:      user.Email,
		From:    "prosperdevstack@gmail.com",
		Subject: "Email Verified",
		Content: htmlBody,
	}

	m.App.MailChannel <- message
	// End of emails

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) Login(w http.ResponseWriter, r *http.Request) {
	// Allways renew the token in seesion for login or logout
	_ = m.App.Session.RenewToken(r.Context())

	data := make(map[string]interface{})

	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		data["error"] = "Unable to Get User from database"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	email := r.Form.Get("email")
	password := r.Form.Get("password")

	id, firstName, _, err := m.DB.Authenticate(email, password)
	if err != nil {
		log.Println(err)

		data["error"] = "Incorrect username/password"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Generate jwt if the user needs to make request to the server
	jwt, err := helpers.GenerateJWTToken(id)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	m.App.Session.Put(r.Context(), "user_id", id)
	data["message"] = "Login successful"
	data["user"] = id
	data["first_name"] = firstName
	data["jwt"] = jwt
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}

func (m *Repository) Logout(w http.ResponseWriter, r *http.Request) {
	_ = m.App.Session.Destroy(r.Context())
	_ = m.App.Session.RenewToken(r.Context())

	data := make(map[string]interface{})

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}

// Auth handlers
func (m *Repository) UserDashboard(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	userId, err := strconv.Atoi(r.URL.Query().Get("id"))
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to Get User id from request"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	user, err := m.DB.GetUserByID(userId)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to Get User from database"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	data["user"] = user
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}
