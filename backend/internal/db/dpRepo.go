package db

import (
	"github.com/prosper74/real-estate-app/internal/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DatabaseRepo interface {
	CreateUser(user *models.User) (*models.User, error)
	GetUserByID(id primitive.ObjectID) (*models.User, error)
	GetAllUsers() ([]*models.User, error)
	UpdateUser(id primitive.ObjectID, user *models.User) (*models.User, error)
	GetUserByEmail(email string) (*models.User, error)
	DeleteUser(id string) error
}
