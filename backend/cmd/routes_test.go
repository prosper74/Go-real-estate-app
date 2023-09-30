package main

import (
	"testing"

	"github.com/go-chi/chi/v5"
	"github.com/prosper74/real-estate-app/internal/config"
)

func TestRoutes(testPointer *testing.T) {
	var app config.AppConfig

	mux := routes(&app)

	switch handlerType := mux.(type) {
	case *chi.Mux:
		// do nothing
	default:
		testPointer.Errorf("type is not *chi.Mux, but is %T", handlerType)
	}
}
