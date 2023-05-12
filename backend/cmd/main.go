package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/prosper74/real-estate-app/api"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")

	// Create a new router
	router := mux.NewRouter()

	// Set up routes for the API
	api.SetupRoutes(router)

	// Start the server
	log.Fatal(http.ListenAndServe(host + ":" + port, router))
	fmt.Printf("Server started at host %s and port %s", host, port)
}
