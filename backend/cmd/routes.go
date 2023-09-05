package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/handlers"
	"github.com/rs/cors"
)

func routes(app *config.AppConfig) http.Handler {
	mux := chi.NewRouter()

	// Load the env file and get the frontendURL
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}
	frontendURL := os.Getenv("FRONTEND_URL")

	// Add all our middlewares here
	mux.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{frontendURL},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		ExposedHeaders:   []string{"Custom-Header"},
		AllowCredentials: true,
		// Enable Debugging for testing, consider disabling in production
		Debug: true,
	}).Handler)

	mux.Use(middleware.Recoverer)
	// mux.Use(NoSurf)
	mux.Use(SessionLoad)

	mux.Get("/", handlers.Repo.Home)
	mux.Get("/token-and-user-id", handlers.Repo.TokensAndUserID)
	mux.Get("/buy", handlers.Repo.Buy)
	mux.Get("/rent", handlers.Repo.Rent)
	mux.Get("/shortlet", handlers.Repo.Shortlet)
	mux.Get("/{category}/{id}", handlers.Repo.SingleProperty)
	mux.Get("/property", handlers.Repo.PropertiesRelatedByType)
	mux.Get("/user", handlers.Repo.UserProperties)
	mux.Post("/signup", handlers.Repo.SignUp)
	mux.Get("/verify-email", handlers.Repo.VerifyUserEmail)
	mux.Post("/resend-email", handlers.Repo.ResendEmailVerification)
	mux.Post("/login", handlers.Repo.Login)
	mux.Post("/forgot-password", handlers.Repo.SendPasswordResetEmail)
	mux.Get("/user/logout", handlers.Repo.Logout)	
	mux.Post("/reset-password", handlers.Repo.UpdateUserPassword)
	mux.Get("/favourites", handlers.Repo.GetPropertyFavourites)

	// user dashboard
	mux.Get("/auth/dashboard", handlers.Repo.UserDashboard)
	mux.Post("/user/update-image-and-phone", handlers.Repo.UpdateUserImageAndPhone)
	mux.Post("/user/verification", handlers.Repo.InsertAccountVerification)
	mux.Post("/user/create-ad", handlers.Repo.CreateNewProperty)
	mux.Get("/user/properties", handlers.Repo.UserDeleteProperty)
	mux.Get("/user/update-property-status", handlers.Repo.UserUpdatePropertyStatus)
	mux.Post("/user/update-ad", handlers.Repo.UserUpdateProperty)

	mux.Route("/admin", func(mux chi.Router) {
		// Use the Auth middleware
		mux.Use(Auth)
		// mux.Get("/dashboard", handlers.Repo.AdminDashboard)
	})

	return mux
}
