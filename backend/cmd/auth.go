package main

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/shaj13/go-guardian/auth"
	"github.com/shaj13/go-guardian/v2/auth/strategies/basic"
	"github.com/shaj13/go-guardian/v2/auth/strategies/jwt"
	"github.com/shaj13/go-guardian/v2/auth/strategies/union"
	"github.com/shaj13/libcache"
)

var strategy union.Union
var keeper jwt.SecretsKeeper

// Setup Go-guardian aunthentication
func setupGoGuardian() {
	keeper = jwt.StaticSecret{
		ID:        "secret-id",
		Secret:    []byte("secret"),
		Algorithm: jwt.HS256,
	}
	cache := libcache.FIFO.New(0)
	cache.SetTTL(time.Minute * 5)
	basicStrategy := basic.NewCached(validateUser, cache)
	jwtStrategy := jwt.New(cache, keeper)
	strategy = union.New(jwtStrategy, basicStrategy)
}

func validateUser(ctx context.Context, r *http.Request, userName, password string) (auth.Info, error) {
	// here connect to db or any other service to fetch user and validate it.
	if userName == "admin" && password == "admin" {
		return auth.NewDefaultUser("admin", "1", nil, nil), nil
	}

	return nil, fmt.Errorf("Invalid credentials")
}
