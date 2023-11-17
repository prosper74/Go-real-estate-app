package main

import (
	"os"
	"testing"
)

func TestRun(t *testing.T) {
	// Set up the necessary environment variables
	os.Setenv("POSTGRES_URI", "postgres://fttn:0-Z7ChJAPhNlTP7XdT1OFkRJO")

	_, err := run()
	if err != nil {
		t.Error("Failed run()")
	}
}
