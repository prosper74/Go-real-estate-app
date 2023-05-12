package handlers

import (
	"net/http"
)

func Home(w http.ResponseWriter, r *http.Request) {
	resp := []byte(`{"status": "ok"}, {"Welcome": "Hello World!"}`)
	w.Write(resp)
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	// Logic for handling user registration
}

func PostSignUp(w http.ResponseWriter, r *http.Request) {
	// Logic for handling user registration
}
