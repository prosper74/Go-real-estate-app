package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/prosper74/real-estate-app/api"
	"github.com/prosper74/real-estate-app/db"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")

	connectedDB, err := run()
	if err != nil {
		log.Fatal(err)
	}

	// Close database connection when main function finish running and the mail server if mail has finsished sending
	defer connectedDB.Client.Disconnect(context.Background())

	// Create a new router
	router := mux.NewRouter()

	// Set up routes for the API
	api.SetupRoutes(router)

	// Start the server
	log.Fatal(http.ListenAndServe(host+":"+port, router))
	fmt.Printf("Server started at host %s and port %s", host, port)
}

func run() (*db.Database, error) {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	mongodbURI := os.Getenv("MONGODB_URI")
	// Connect to database
	log.Println("Connecting to database...")
	connectedDB, err := db.NewDatabase(mongodbURI)
	if err != nil {
		log.Fatal("Cannot connect to database. Closing application")
	}

	log.Println("Connected to database")

	return connectedDB, nil
}
