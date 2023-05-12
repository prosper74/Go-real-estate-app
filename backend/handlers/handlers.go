package handlers

import (
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	resp := []byte(`{"status": "ok"}`)
	// w.Header().Set("Content-Type", "application/json")
	// w.Header().Set("Content-Length", fmt.Sprint(len(resp)))
	w.Write(resp)
}

func UserRegister(w http.ResponseWriter, r *http.Request) {
	// Logic for handling user registration
}
