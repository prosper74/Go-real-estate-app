package config

import (
	"log"

	"github.com/alexedwards/scs/v2"
	"github.com/prosper74/real-estate-app/internal/models"
)

type AppConfig struct {
	UseCache     bool
	InfoLog      *log.Logger
	ErrorLog     *log.Logger
	InProduction bool
	Session      *scs.SessionManager
	MailChannel  chan models.MailData
}
