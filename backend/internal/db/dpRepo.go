package db

import (
	"context"

	"github.com/prosper74/real-estate-app/internal/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DatabaseRepo interface {
	CreateUser(ctx context.Context, user *models.User) (*models.User, error)
	GetUserByID(ctx context.Context, id primitive.ObjectID) (*models.User, error)
	GetAllUsers(ctx context.Context) ([]*models.User, error)
	UpdateUser(ctx context.Context, id primitive.ObjectID, user *models.User) (*models.User, error)
	GetUserByEmail(email string) (*models.User, error)
	DeleteUser(id string) error
}
