package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/prosper74/real-estate-app/api"
)

func main() {
	// Create a new router
	router := mux.NewRouter()

	// Set up routes for the API
	api.SetupRoutes(router)

	// Start the server
	log.Fatal(http.ListenAndServe(":8080", router))
}
