package handlers

import (
	"log"
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	log.Println("Hello Home")
}

func UserRegister(w http.ResponseWriter, r *http.Request) {
	// Logic for handling user registration
}
