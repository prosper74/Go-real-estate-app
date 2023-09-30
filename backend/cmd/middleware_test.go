package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

type myHandler struct{}

func (handlerObject *myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {}

func TestNoSurf(t *testing.T) {
	// Create a test handler function for testing the NoSurf middleware
	testHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Test Response"))
	})

	// Create a test request
	req := httptest.NewRequest("GET", "/test", nil)

	// Create a response recorder to capture the response
	rr := httptest.NewRecorder()

	// Call the NoSurf middleware with the test handler
	csrfMiddleware := NoSurf(testHandler)
	csrfMiddleware.ServeHTTP(rr, req)

	// Assert that the response code is what you expect
	if rr.Code != http.StatusOK {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, rr.Code)
	}
}

func TestProtectCSRF(t *testing.T) {
	// Create a test handler function for testing the ProtectCSRF middleware
	testHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Test Response"))
	})

	// Create a test request with a POST method (you can also test other HTTP methods)
	req := httptest.NewRequest("POST", "/test", nil)

	// Add a CSRF token to the request
	token := "valid_csrf_token" // Replace with a valid CSRF token
	req.Header.Set("X-CSRF-Token", token)

	// Create a response recorder to capture the response
	rr := httptest.NewRecorder()

	// Call the ProtectCSRF middleware with the test handler
	csrfProtectionMiddleware := ProtectCSRF(testHandler)
	csrfProtectionMiddleware.ServeHTTP(rr, req)

	// Assert that the response code is what you expect
	if rr.Code != http.StatusForbidden {
		t.Errorf("Expected status code %d, got %d", http.StatusOK, rr.Code)
	}
}

func TestSessionLoad(testPointer *testing.T) {
	var handlerObject myHandler
	testHandler := SessionLoad(&handlerObject)

	switch handlerType := testHandler.(type) {
	case http.Handler:
		// do nothing
	default:
		testPointer.Errorf("type is not http.Handler but is %T", handlerType)
	}
}
