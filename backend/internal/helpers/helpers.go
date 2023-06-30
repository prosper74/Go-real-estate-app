package helpers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"runtime/debug"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"github.com/prosper74/real-estate-app/internal/config"
)

var app *config.AppConfig

// Setup app config for new helpers
func NewHelpers(helper *config.AppConfig) {
	app = helper
}

func ClientError(responseWriter http.ResponseWriter, status int) {
	app.InfoLog.Println("Client error with status of", status)
	http.Error(responseWriter, http.StatusText(status), status)
}

func ServerError(responseWriter http.ResponseWriter, err error) {
	// err.Error() prints the nature of the error. debug.Stack() prints the detailed info about the nature of the error
	trace := fmt.Sprintf("%s\n%s", err.Error(), debug.Stack())
	app.ErrorLog.Println(trace)

	// Send feedback to the user
	http.Error(responseWriter, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
}

// Check if a user is exists
func IsAuthenticated(request *http.Request) bool {
	exists := app.Session.Exists(request.Context(), "user_id")
	return exists
}

func ConvertPostgresArrayToStringSlice(arrayString string) []string {
	// Remove the leading and trailing curly braces
	arrayString = arrayString[1 : len(arrayString)-1]

	// Split the string into individual elements
	elements := strings.Split(arrayString, ",")

	// Trim any leading or trailing whitespace from the elements
	for i, element := range elements {
		elements[i] = strings.TrimSpace(element)
	}

	return elements
}

func GenerateJWTToken(userID int) (string, error) {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	jwtToken := os.Getenv("JWTSECRET")

	// Define the claims for the JWT token
	claims := jwt.MapClaims{
		"sub": userID,                           // Subject (user ID)
		"exp": time.Now().Add(time.Hour).Unix(), // Expiration time
		"iat": time.Now().Unix(),                // Issued at time
	}

	// Generate the JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with a secret key
	tokenString, err := token.SignedString([]byte(jwtToken))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
