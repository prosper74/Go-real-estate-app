package handlers

import (
	"context"
	"log"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"

	"github.com/prosper74/real-estate-app/internal/driver"
)

type postData struct {
	key   string
	value string
}

var theTests = []struct {
	name               string
	url                string
	method             string
	expectedStatusCode int
}{
	{"home", "/", "GET", http.StatusOK},
	{"about", "/about", "GET", http.StatusOK},
	{"contact", "/contact", "GET", http.StatusOK},
	{"buy", "/buy", "GET", http.StatusOK},
	{"rent", "/rent", "GET", http.StatusOK},
	{"shortlet", "/shortlet", "GET", http.StatusOK},
	{"category", "/category/1", "GET", http.StatusOK},
	{"property", "/property", "GET", http.StatusOK},
	{"user", "/user", "GET", http.StatusOK},
	{"verify email", "/verify-email", "GET", http.StatusOK},
	{"logout", "/user/logout", "GET", http.StatusOK},
	{"favourites", "/favourites", "GET", http.StatusOK},
	{"reviews", "/reviews", "GET", http.StatusOK},
	{"auth dashboard", "/auth/dashboard", "GET", http.StatusOK},
	{"user favourites", "/user/favourites", "GET", http.StatusOK},
	{"user reviews", "/user/reviews", "GET", http.StatusOK},
	{"user delete review", "/user/delete-review", "GET", http.StatusOK},
}

func TestHandlers(testPointer *testing.T) {
	routes := getRoutes()

	testServer := httptest.NewTLSServer(routes)
	defer testServer.Close()

	for _, element := range theTests {
		response, err := testServer.Client().Get(testServer.URL + element.url)
		if err != nil {
			testPointer.Log(err)
			testPointer.Fatal(err)
		}

		if response.StatusCode != element.expectedStatusCode {
			testPointer.Errorf("for %s expected %d but got %d", element.name, element.expectedStatusCode, response.StatusCode)
		}
	}
}

func TestNewRepo(t *testing.T) {
	var db driver.DB
	testRepo := NewRepo(&app, &db)

	if reflect.TypeOf(testRepo).String() != "*handlers.Repository" {
		t.Errorf("Did not get correct type from NewRepo: got %s, wanted *Repository", reflect.TypeOf(testRepo).String())
	}
}

func getContext(request *http.Request) context.Context {
	ctx, err := session.Load(request.Context(), request.Header.Get("X-Session"))
	if err != nil {
		log.Println(err)
	}
	return ctx
}
