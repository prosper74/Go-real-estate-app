// package main

// import (
// 	"github.com/gorilla/mux"
// 	"github.com/prosper74/real-estate-app/handlers"
// )

// func SetupRoutes(router *mux.Router) {
// 	// Home route
// 	router.HandleFunc("/", handlers.Home).Methods("Get")

// 	// Register user handler
// 	router.HandleFunc("/api/users", handlers.UserRegister).Methods("POST")
// }

package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/handlers"
)

func routes(app *config.AppConfig) http.Handler {
	mux := chi.NewRouter()

	// Add all our middlewares here
	mux.Use(middleware.Recoverer)
	// mux.Use(NoSurf)
	mux.Use(SessionLoad)

	mux.Get("/", handlers.Repo.Home)
	mux.Get("/signup", handlers.Repo.SignUp)
	mux.Post("/signup", handlers.Repo.PostSignUp)

	return mux
}
