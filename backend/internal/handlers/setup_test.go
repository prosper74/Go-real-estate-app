package handlers

import (
	"encoding/gob"
	"log"
	"net/http"
	"os"
	"testing"
	"time"

	"github.com/alexedwards/scs/v2"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/justinas/nosurf"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/models"
)

var app config.AppConfig
var session *scs.SessionManager

func TestMain(m *testing.M) {
	// what am I going to put in the session
	gob.Register(models.Category{})
	gob.Register(models.User{})
	gob.Register(models.Property{})
	gob.Register(map[string]int{})

	// change this to true when in production
	app.InProduction = false

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	app.InfoLog = infoLog

	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
	app.ErrorLog = errorLog

	// set up the session
	session = scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = app.InProduction

	app.Session = session

	mailChannel := make(chan models.MailData)
	app.MailChannel = mailChannel
	defer close(mailChannel)

	listenForMail()

	os.Exit(m.Run())
}

func listenForMail() {
	go func() {
		for {
			_ = <-app.MailChannel
		}
	}()
}

func getRoutes() http.Handler {
	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)
	mux.Use(SessionLoad)

	mux.Get("/", Repo.Home)
	mux.Get("/token-and-user-id", Repo.TokensAndUserID)
	mux.Get("/buy", Repo.Buy)
	mux.Get("/rent", Repo.Rent)
	mux.Get("/shortlet", Repo.Shortlet)
	mux.Get("/{category}/{id}", Repo.SingleProperty)
	mux.Get("/property", Repo.PropertiesRelatedByType)
	mux.Get("/user", Repo.UserProperties)
	mux.Post("/signup", Repo.SignUp)
	mux.Get("/verify-email", Repo.VerifyUserEmail)
	mux.Post("/resend-email", Repo.ResendEmailVerification)
	mux.Post("/login", Repo.Login)
	mux.Post("/forgot-password", Repo.SendPasswordResetEmail)
	mux.Get("/user/logout", Repo.Logout)
	mux.Post("/reset-password", Repo.UpdateUserPassword)
	mux.Get("/favourites", Repo.GetPropertyFavourites)
	mux.Get("/reviews", Repo.GetPropertyReviews)

	// user dashboard
	mux.Get("/auth/dashboard", Repo.UserDashboard)
	mux.Post("/user/update-image-and-phone", Repo.UpdateUserImageAndPhone)
	mux.Post("/user/update-image", Repo.UserUpdateImage)
	mux.Post("/user/verification", Repo.InsertAccountVerification)
	mux.Post("/user/create-ad", Repo.CreateNewProperty)
	mux.Get("/user/properties", Repo.UserDeleteProperty)
	mux.Get("/user/update-property-status", Repo.UserUpdatePropertyStatus)
	mux.Post("/user/update-ad", Repo.UserUpdateProperty)
	mux.Post("/user/add-favourite", Repo.UserAddFavourite)
	mux.Post("/user/remove-favourite", Repo.UserRemoveFavourite)
	mux.Get("/user/favourites", Repo.UserFavourites)
	mux.Post("/user/update-profile", Repo.UserUpdateProfile)
	mux.Post("/user/delete-account", Repo.UserDeleteAccount)
	mux.Post("/user/create-review", Repo.UserAddReview)
	mux.Post("/user/update-review", Repo.UserUpdateReview)
	mux.Get("/user/reviews", Repo.GetUserReviews)
	mux.Get("/user/delete-review", Repo.UserDeleteReview)

	fileServer := http.FileServer(http.Dir("./static/"))
	mux.Handle("/static/*", http.StripPrefix("/static", fileServer))

	return mux
}

// NoSurf is the csrf protection middleware
func NoSurf(next http.Handler) http.Handler {
	csrfHandler := nosurf.New(next)
	csrfHandler.SetBaseCookie(http.Cookie{
		HttpOnly: true,
		Path:     "/",
		Secure:   app.InProduction,
		SameSite: http.SameSiteLaxMode,
	})

	return csrfHandler
}

// SessionLoad loads and saves session data for current request
func SessionLoad(next http.Handler) http.Handler {
	return session.LoadAndSave(next)
}
