package main

import (
	"encoding/gob"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/alexedwards/scs/v2"
	"github.com/joho/godotenv"
	"github.com/prosper74/real-estate-app/internal/config"
	"github.com/prosper74/real-estate-app/internal/driver"
	"github.com/prosper74/real-estate-app/internal/handlers"
	"github.com/prosper74/real-estate-app/internal/helpers"
	"github.com/prosper74/real-estate-app/internal/models"
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
	defer connectedDB.SQL.Close()
	defer close(app.MailChannel)

	// Listening for mail
	fmt.Println("Listening for mail...")
	listenForMail()

	// Set up routes for the API
	fmt.Printf("Server started at host %s and port %s", host, port)
	// Create a variable to serve the routes
	srv := &http.Server{
		Addr:    host + ":" + port,
		Handler: routes(&app),
	}

	err = srv.ListenAndServe()
	log.Fatal(err)
}

func run() (*driver.DB, error) {
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
	dbSSL := flag.String("dbssl", "disable", "Database ssl settings (disable, prefer, require)")

	flag.Parse()

	// setup middlewares
	app.InProduction = *inProduction

	mailChannel := make(chan models.MailData)
	app.MailChannel = mailChannel

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

	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbName := os.Getenv("DB_NAME")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")

	if dbName == "" || dbUser == "" || dbHost == "" {
		fmt.Println("Missing .env dependencies, attach the env dependencies in your .env file")
		os.Exit(1)
	}

	// Connect to database
	log.Println("Connecting to database...")
	connectionString := fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=%s", dbHost, dbPort, dbName, dbUser, dbPassword, *dbSSL)
	connectedDB, err := driver.ConnectSQL(connectionString)
	if err != nil {
		log.Fatal("Cannot connect to database. Closing application")
	}

	log.Println("Connected to database")

	// Variable to reference our app
	repo := handlers.NewRepo(&app, connectedDB)

	// Pass the repo variable back to the new handler
	handlers.NewHandlers(repo)

	// Pass the app config to the helpers
	helpers.NewHelpers(&app)

	return connectedDB, nil
}
