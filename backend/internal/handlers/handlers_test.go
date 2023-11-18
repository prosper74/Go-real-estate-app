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
