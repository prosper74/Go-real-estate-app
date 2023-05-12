package config

import (
	"log"

	"github.com/alexedwards/scs/v2"
)

type AppConfig struct {
	UseCache     bool
	InfoLog      *log.Logger
	ErrorLog     *log.Logger
	InProduction bool
	Session      *scs.SessionManager
}
