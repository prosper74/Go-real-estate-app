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
	id, _ := strconv.Atoi(r.URL.Query().Get("id"))

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

	// Load the env file and get the frontendURL
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	frontendURL := os.Getenv("FRONTEND_URL")

	// Send email notification to user
	htmlBody := fmt.Sprintf(`
	<strong>Verify Your Account</strong><br />
	<p>Dear %s %s, </p>
	<p>Welcome to our website.</p>
	<strong>Kindly click the link below</strong>
	<a href="%s/verify-email?userid=%d&token=%s", target="_blank">Verify Account</a>
	<p>We hope to see you soon</p>
	`, user.FirstName, user.LastName, frontendURL, newUserID, jwtToken)

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

	// Load the env file and get the frontendURL
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	frontendURL := os.Getenv("FRONTEND_URL")

	// Send email notification to user
	htmlBody := fmt.Sprintf(`
	<strong>Verify Your Email</strong><br />
	<p>Dear %s %s, </p>
	<p>Welcome to our website.</p>
	<strong>Kindly click the link below to verify your email</strong>
	<a href="%s/verify-email?userid=%d&token=%s", target="_blank">Verify Email</a>
	<strong>Note that this link will expire in 24 hours and you can only resend another verification after the expiration of this link</strong>
	<p>We hope to see you soon</p>
	`, user.FirstName, user.LastName, frontendURL, user.ID, jwtToken)

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
		user.AccessLevel = 1
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

	// Handle successful email verification, Send email notification to user
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

	// user := models.User{}
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

	user, err := m.DB.Authenticate(email, password)
	if err != nil {
		log.Println(err)

		data["error"] = "Incorrect username/password"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Generate jwt if the user needs to make request to the server
	user.Token, err = helpers.GenerateJWTToken(user.ID)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	m.App.Session.Put(r.Context(), "user_id", user.ID)
	data["message"] = "Login successful"
	data["user"] = user
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

// Update user profile handlers
func (m *Repository) UserUpdateProfile(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	user := models.User{}
	data := make(map[string]interface{})

	user.ID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	user.Token = r.PostFormValue("jwt")
	user.FirstName = r.PostFormValue("first_name")
	user.LastName = r.PostFormValue("last_name")
	user.Phone = r.PostFormValue("phone")
	user.Address = r.PostFormValue("address")

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(user.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Update user profile
	err = m.DB.UpdateUserProfile(user)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to update user's profile. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Get the new user profile from database
	fetchedUser, err := m.DB.GetUserByID(user.ID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to Get User from database"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	data["user"] = fetchedUser
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}

// UpdateUserImageAndPhone handlers
func (m *Repository) UpdateUserImageAndPhone(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	user := models.User{}
	data := make(map[string]interface{})

	user.ID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	user.Token = r.PostFormValue("jwt")
	user.Image = r.PostFormValue("image")
	user.Phone = r.PostFormValue("phone")

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(user.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if token.Valid {
		// Update the user's account status as verified
		err = m.DB.UpdateUserImageAndPhone(user)
		if err != nil {
			helpers.ServerError(w, err)
			data["error"] = "Unable to update user's image and phone. Please contact support"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}
	} else {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
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

// User updates profile photo
func (m *Repository) UserUpdateImage(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	user := models.User{}
	data := make(map[string]interface{})

	user.ID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	user.Token = r.PostFormValue("jwt")
	user.Image = r.PostFormValue("image")

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(user.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if token.Valid {
		// Update the user's account status as verified
		err = m.DB.UserUpdateImage(user)
		if err != nil {
			helpers.ServerError(w, err)
			data["error"] = "Unable to update user's image and phone. Please contact support"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}
	} else {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
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

// Delete property
func (m *Repository) UserDeleteAccount(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	userID, _ := strconv.Atoi(r.PostFormValue("user_id"))
	tokenString := r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Delete the user from database
	err = m.DB.DeleteUserAccount(userID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to delete account. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// InsertAccountVerification inserts new verification for user into the database
func (m *Repository) InsertAccountVerification(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	user := models.User{}
	accountVerification := models.AccountVerification{}
	data := make(map[string]interface{})

	accountVerification.UserID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	accountVerification.Identity = r.PostFormValue("identity")
	accountVerification.IdentityNumber = r.PostFormValue("identity_number")
	accountVerification.IdentityImage = r.PostFormValue("identity_image")
	accountVerification.Address = r.PostFormValue("address")
	accountVerification.AddressImage = r.PostFormValue("address_image")
	jwtToken := r.PostFormValue("jwt")

	user.ID = accountVerification.UserID
	user.Verification = "under_review"
	user.AccessLevel = 2

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if token.Valid {
		err = m.DB.InsertAccountVerification(accountVerification)
		if err != nil {
			helpers.ServerError(w, err)
			data["error"] = "Unable to create user verification. Please contact support"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}

		// Update the user's verification status to under_review
		err = m.DB.UpdateUserVerificationStatus(user)
		if err != nil {
			helpers.ServerError(w, err)
			data["error"] = "Unable to create user verification. Please contact support"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}
	} else {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	data["user_verification"] = accountVerification
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}

// Send email to reset user password
func (m *Repository) SendPasswordResetEmail(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	email := r.PostFormValue("email")

	userExist, err := m.DB.CheckIfUserEmailExist(email)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	if !userExist {
		log.Println("Email does not exist")
		data["error"] = "email does not exist"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	user, err := m.DB.GetUserByEmail(email)
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

	// Load the env file and get the frontendURL
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	frontendURL := os.Getenv("FRONTEND_URL")

	// Send email notification to user
	htmlBody := fmt.Sprintf(`
	<strong>Reset Password</strong><br />
	<p>Dear %s %s, </p>
	<p>You made a request to reset your password.</p>
	<strong>Kindly click the link below</strong><br />
	<a href="%s/reset-password?userid=%d&token=%s", target="_blank">Reset Password</a><br /><br />
	<strong>Note that this link will expire in 24hrs</strong><br />
	<p>We hope to see you soon</p>
	`, user.FirstName, user.LastName, frontendURL, user.ID, jwtToken)

	message := models.MailData{
		To:      user.Email,
		From:    "prosperdevstack@gmail.com",
		Subject: "Reset Your Password",
		Content: htmlBody,
	}

	m.App.MailChannel <- message
	// End of emails

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}

// Update user password handler
func (m *Repository) UpdateUserPassword(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	user := models.User{}

	err := r.ParseForm()
	if err != nil {
		m.App.Session.Put(r.Context(), "error", "Can't parse form")
		return
	}

	user.ID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	user.Password = r.PostFormValue("password")
	user.Token = r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(user.Token, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if token.Valid {
		err = m.DB.UpdateUserPassword(user)
		if err != nil {
			helpers.ServerError(w, err)
			data["error"] = "Unable to update password. Please contact support"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}
	} else {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	user, err = m.DB.GetUserByID(user.ID)
	if err != nil {
		helpers.ServerError(w, err)
		return
	}

	// Send email notification to user
	htmlBody := fmt.Sprintf(`
	<strong>Password Changed</strong><br />
	<p>Hi, %s %s </p>
	<strong>Your password was changed successfully!!!<br />
	Kindly login to your account with your new password</strong><br />
	<p>If you did not changed your password and you suspect that your account has been hacked. Please contact our support team immediately</p><br /><br /><br />	
	<p>Love, from SafeHaven</p>
	`, user.FirstName, user.LastName)

	message := models.MailData{
		To:      user.Email,
		From:    "prosperdevstack@gmail.com",
		Subject: "Password Changed Successfully",
		Content: htmlBody,
	}

	m.App.MailChannel <- message
	// End of emails

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")
	resp := []byte(out)
	w.Write(resp)
}

// Create a new property
func (m *Repository) CreateNewProperty(w http.ResponseWriter, r *http.Request) {
	property := models.Property{}
	data := make(map[string]interface{})

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Can't parse form", http.StatusBadRequest)
		return
	}

	property.Title = r.PostFormValue("title")
	property.Description = r.PostFormValue("description")
	property.Price = r.PostFormValue("price")
	property.Type = r.PostFormValue("type")
	property.State = r.PostFormValue("state")
	property.City = r.PostFormValue("city")
	property.Bedroom = r.PostFormValue("bedroom")
	property.Bathroom = r.PostFormValue("bathroom")
	property.Duration = r.PostFormValue("duration")
	property.Status = r.PostFormValue("status")
	property.Size = r.PostFormValue("size")
	property.UserID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	property.CategoryID, _ = strconv.Atoi(r.PostFormValue("category"))
	property.Images = helpers.ConvertStringToURLSlice(r.PostFormValue("images"))
	tokenString := r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if token.Valid {
		err = m.DB.InsertNewProperty(property)
		if err != nil {
			helpers.ServerError(w, err)
			data["error"] = "Unable to insert a new property. Please contact support"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}
	} else {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Delete property
func (m *Repository) UserDeleteProperty(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	propertyID, _ := strconv.Atoi(r.URL.Query().Get("property_id"))
	userID, _ := strconv.Atoi(r.URL.Query().Get("user_id"))
	tokenString := r.URL.Query().Get("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Delete the property from database
	err = m.DB.DeleteProperty(propertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to delete property. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new user properties
	AllProperties, err := m.DB.AllProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new buy properties
	BuyProperties, err := m.DB.AllBuyProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new rent properties
	RentProperties, err := m.DB.AllRentProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new rent properties
	ShortletProperties, err := m.DB.AllShortletProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new user properties
	userProperties, err := m.DB.GetUserPropertiesByID(userID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["allProperties"] = AllProperties
	data["buyProperties"] = BuyProperties
	data["rentProperties"] = RentProperties
	data["shortletProperties"] = ShortletProperties
	data["userProperties"] = userProperties
	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Update user property
func (m *Repository) UserUpdateProperty(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	property := models.Property{}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Can't parse form", http.StatusBadRequest)
		return
	}

	property.ID, _ = strconv.Atoi(r.PostFormValue("id"))
	property.Title = r.PostFormValue("title")
	property.Description = r.PostFormValue("description")
	property.Price = r.PostFormValue("price")
	property.Type = r.PostFormValue("type")
	property.State = r.PostFormValue("state")
	property.City = r.PostFormValue("city")
	property.Bedroom = r.PostFormValue("bedroom")
	property.Bathroom = r.PostFormValue("bathroom")
	property.Duration = r.PostFormValue("duration")
	property.Size = r.PostFormValue("size")
	property.UserID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	property.CategoryID, _ = strconv.Atoi(r.PostFormValue("category"))
	property.Images = helpers.ConvertStringToURLSlice(r.PostFormValue("images"))
	tokenString := r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Update the property in the database
	err = m.DB.UserUpdateProperty(property)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to update property. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Update user property status
func (m *Repository) UserUpdatePropertyStatus(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	var statusUpdate string

	propertyID, _ := strconv.Atoi(r.URL.Query().Get("property_id"))
	userID, _ := strconv.Atoi(r.URL.Query().Get("user_id"))
	properStatus := r.URL.Query().Get("property_status")
	tokenString := r.URL.Query().Get("jwt")

	if properStatus == "enabled" {
		statusUpdate = "disabled"
	} else {
		statusUpdate = "enabled"
	}

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Update the property status in the database
	err = m.DB.UserUpdatePropertyStatus(propertyID, statusUpdate)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to update property status. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new user properties
	AllProperties, err := m.DB.AllProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new buy properties
	BuyProperties, err := m.DB.AllBuyProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new rent properties
	RentProperties, err := m.DB.AllRentProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new rent properties
	ShortletProperties, err := m.DB.AllShortletProperties()
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return new user properties
	userProperties, err := m.DB.GetUserPropertiesByID(userID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to fetch user properties. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["allProperties"] = AllProperties
	data["buyProperties"] = BuyProperties
	data["rentProperties"] = RentProperties
	data["shortletProperties"] = ShortletProperties
	data["userProperties"] = userProperties
	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Update user property status
func (m *Repository) UserAddFavourite(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	favourite := models.Favourite{}

	err := r.ParseForm()
	if err != nil {
		http.Error(w, "Can't parse form", http.StatusBadRequest)
		return
	}

	favourite.PropertyID, _ = strconv.Atoi(r.PostFormValue("property_id"))
	favourite.UserID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	tokenString := r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err = godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Add favourite to database
	err = m.DB.InsertNewFavourite(favourite)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to insert favourite. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// fetch favourites from the database
	favourites, err := m.DB.PropertyFavourites(favourite.PropertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get property favourites. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["favourites"] = favourites
	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Update user property status
func (m *Repository) UserRemoveFavourite(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	favourite := models.Favourite{}

	favourite.PropertyID, _ = strconv.Atoi(r.PostFormValue("property_id"))
	favourite.UserID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	tokenString := r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Add favourite to database
	err = m.DB.DeleteFavourite(favourite)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to delete favourite. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// fetch favourites from the database
	favourites, err := m.DB.PropertyFavourites(favourite.PropertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get property favourites. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// fetch user favourites from the database
	userFavourites, err := m.DB.GetUserFavourites(favourite.UserID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get user favourites. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["favourites"] = favourites
	data["user_favourites"] = userFavourites
	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Get all the favourites of a property
func (m *Repository) GetPropertyFavourites(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	propertyID, _ := strconv.Atoi(r.URL.Query().Get("id"))

	// fetch favourites from the database
	favourites, err := m.DB.PropertyFavourites(propertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get property favourites. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	data["favourites"] = favourites
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Get all the favourites of a user
func (m *Repository) UserFavourites(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	userID, _ := strconv.Atoi(r.URL.Query().Get("user_id"))
	tokenString := r.URL.Query().Get("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// fetch favourites from the database
	favourites, err := m.DB.GetUserFavourites(userID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get user favourites. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	data["favourites"] = favourites
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Update user property status
func (m *Repository) UserAddReview(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	review := models.Review{}

	review.Description = r.PostFormValue("review")
	review.Rating, _ = strconv.ParseFloat(r.PostFormValue("rating"), 64)
	review.PropertyID, _ = strconv.Atoi(r.PostFormValue("property_id"))
	review.UserID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	tokenString := r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Add review to database
	err = m.DB.InsertNewReview(review)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to add review. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// fetch reviews from the database
	propertyReviews, err := m.DB.GetPropertyReviews(review.PropertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get property reviews. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["reviews"] = propertyReviews
	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Get all the favourites of a property
func (m *Repository) GetPropertyReviews(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	propertyID, _ := strconv.Atoi(r.URL.Query().Get("id"))

	// fetch reviews from the database
	reviews, err := m.DB.GetPropertyReviews(propertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get property reviews. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	data["reviews"] = reviews
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Get all the favourites of a property
func (m *Repository) GetUserReviews(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	userID, _ := strconv.Atoi(r.URL.Query().Get("user_id"))
	tokenString := r.URL.Query().Get("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// fetch reviews from the database
	reviews, err := m.DB.GetUserReviews(userID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get user reviews. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["message"] = "Successful"
	data["reviews"] = reviews
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Update user property status
func (m *Repository) UserUpdateReview(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})
	review := models.Review{}

	review.Description = r.PostFormValue("review")
	review.Rating, _ = strconv.ParseFloat(r.PostFormValue("rating"), 64)
	review.PropertyID, _ = strconv.Atoi(r.PostFormValue("property_id"))
	review.UserID, _ = strconv.Atoi(r.PostFormValue("user_id"))
	tokenString := r.PostFormValue("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Update the review in the database
	err = m.DB.UpdateReview(review)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to update review. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return the new property reviews
	propertyReviews, err := m.DB.GetPropertyReviews(review.PropertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get property reviews. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return the new user reviews
	userReviews, err := m.DB.GetUserReviews(review.UserID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get user reviews. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["propertyReviews"] = propertyReviews
	data["userReviews"] = userReviews
	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}

// Delete review
func (m *Repository) UserDeleteReview(w http.ResponseWriter, r *http.Request) {
	data := make(map[string]interface{})

	propertyID, _ := strconv.Atoi(r.URL.Query().Get("property_id"))
	reviewID, _ := strconv.Atoi(r.URL.Query().Get("review_id"))
	userID, _ := strconv.Atoi(r.URL.Query().Get("user_id"))
	tokenString := r.URL.Query().Get("jwt")

	// Load the env file and get the JWT secret
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	jwtSecret := os.Getenv("JWTSECRET")

	// Parse and verify the JWT token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(jwtSecret), nil
	})
	if err != nil {
		http.Error(w, "Unable to parse token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Unable to parse token. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusBadRequest)
		data["error"] = fmt.Sprintf("Invalid token, please contact support. Error: %s", err)
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Delete the review from database
	err = m.DB.DeleteReview(reviewID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to delete review. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return the new property reviews
	propertyReviews, err := m.DB.GetPropertyReviews(propertyID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get property reviews. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	// Return the new user reviews
	userReviews, err := m.DB.GetUserReviews(userID)
	if err != nil {
		helpers.ServerError(w, err)
		data["error"] = "Unable to get user reviews. Please contact support"
		out, _ := json.MarshalIndent(data, "", "    ")
		resp := []byte(out)
		w.Write(resp)
		return
	}

	data["propertyReviews"] = propertyReviews
	data["userReviews"] = userReviews
	data["message"] = "Successful"
	out, _ := json.MarshalIndent(data, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Write(out)
}
