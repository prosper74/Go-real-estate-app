package api

import (
	"github.com/gorilla/mux"
	"github.com/prosper74/real-estate-app/handlers"
)

func SetupRoutes(router *mux.Router) {
	// Home route 
	router.HandleFunc("/", handlers.Home).Methods("Get")

	// Register user handler
	router.HandleFunc("/api/users", handlers.UserRegister).Methods("POST")
}
