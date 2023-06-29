package main

import (
	"encoding/json"
	"net/http"

	"github.com/justinas/nosurf"
	"github.com/prosper74/real-estate-app/internal/helpers"
)

func NoSurf(next http.Handler) http.Handler {
	csrfHandler := nosurf.New(next)

	csrfHandler.SetBaseCookie(http.Cookie{
		HttpOnly: true,
		Path:     "/",
		Secure:   app.InProduction,
		// SameSite: http.SameSiteLaxMode,
	})

	return ProtectCSRF(csrfHandler)
}

func ProtectCSRF(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		d := struct {
			token string
		}{}
		if r.Method == http.MethodPost {
			if err := r.ParseForm(); err != nil {
				// Handle parsing error
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				return
			}

			if !nosurf.VerifyToken(nosurf.Token(r), d.token) {
				// Handle invalid CSRF token
				http.Error(w, "Invalid CSRF Token", http.StatusForbidden)
				return
			}
		}

		next.ServeHTTP(w, r)
	})
}

func SessionLoad(next http.Handler) http.Handler {
	// LoadAndSave provides middleware which automatically loads and saves session data for the current request, and communicates the session token to and from the client in a cookie.
	return session.LoadAndSave(next)
}

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !helpers.IsAuthenticated(r) {
			session.Put(r.Context(), "error", "User not logged in")
			http.Redirect(w, r, "/", http.StatusSeeOther)

			data := make(map[string]interface{})
			data["error"] = "User not logged in"
			out, _ := json.MarshalIndent(data, "", "    ")
			resp := []byte(out)
			w.Write(resp)
			return
		}

		next.ServeHTTP(w, r)
	})
}
