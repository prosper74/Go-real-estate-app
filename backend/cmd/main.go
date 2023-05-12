package main

import (
	"context"
	"encoding/gob"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/alexedwards/scs/v2"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/prosper74/real-estate-app/api"
	"github.com/prosper74/real-estate-app/config"
	"github.com/prosper74/real-estate-app/db"
	"github.com/prosper74/real-estate-app/models"
)

var app config.AppConfig
var session *scs.SessionManager
var infoLog *log.Logger
var errorLog *log.Logger

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

	// Things to be stored in the session
	// gob, is a built in library used for storing sessions
	gob.Register(models.Property{})
	gob.Register(models.User{})
	gob.Register(make(map[string]int))

	// Read flags
	inProduction := flag.Bool("production", true, "App is in production")

	// setup middlewares
	app.InProduction = *inProduction

	infoLog = log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	app.InfoLog = infoLog

	errorLog = log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
	app.ErrorLog = errorLog

	session = scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = app.InProduction

	app.Session = session

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
