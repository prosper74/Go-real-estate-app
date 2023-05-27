package repository

import "github.com/prosper74/real-estate-app/internal/models"

type DatabaseRepo interface {
	AllUsers() bool
	GetUserByID(id int) (models.User, error)
	UpdateUser(user models.User) error
	Authenticate(email, testPassword string) (int, string, error)
}
