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
	mux.Use(NoSurf)
	mux.Use(SessionLoad)

	mux.Get("/", handlers.Repo.Home)
	mux.Get("/buy", handlers.Repo.Buy)
	mux.Get("/rent", handlers.Repo.Rent)
	mux.Get("/shortlet", handlers.Repo.Shortlet)
	mux.Get("/{category}/{id}", handlers.Repo.SingleProperty)
	mux.Get("/signup", handlers.Repo.SignUp)

	return mux
}
