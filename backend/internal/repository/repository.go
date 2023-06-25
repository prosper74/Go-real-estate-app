package repository

import "github.com/prosper74/real-estate-app/internal/models"

type DatabaseRepo interface {
	AllUsers() ([]models.User, error)
	CheckIfUserEmailExist(email string) (bool, error)
	InsertUser(user models.User) (int, error) 

	AllProperties() ([]models.Property, error)
	AllFeaturedProperties() ([]models.Property, error)
	AllBuyProperties() ([]models.Property, error)
	AllRentProperties() ([]models.Property, error)
	AllShortletProperties() ([]models.Property, error)
	GetPropertyByID(id int) (models.Property, error)
	GetPropertiesByType(propertyType string) ([]models.Property, error)
	GetUserPropertiesByID(userID string) ([]models.Property, error)
}
