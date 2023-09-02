package repository

import "github.com/prosper74/real-estate-app/internal/models"

type DatabaseRepo interface {
	AllUsers() ([]models.User, error)
	CheckIfUserEmailExist(email string) (bool, error)
	InsertUser(user models.User) (int, error)
	GetUserByID(id int) (models.User, error)
	GetUserByEmail(email string) (models.User, error)
	UpdateUserAccessLevel(user models.User) error
	Authenticate(email, testPassword string) (int, string, string, error)
	UpdateUserImageAndPhone(user models.User) error
	InsertAccountVerification(d models.AccountVerification) error
	UpdateUserVerification(user models.User) error
	UpdateUserVerificationStatus(user models.User) error
	UpdateUserPassword(user models.User) error

	AllProperties() ([]models.Property, error)
	AllFeaturedProperties() ([]models.Property, error)
	AllBuyProperties() ([]models.Property, error)
	AllRentProperties() ([]models.Property, error)
	AllShortletProperties() ([]models.Property, error)
	GetPropertyByID(id int) (models.Property, error)
	GetPropertiesByType(propertyType string) ([]models.Property, error)
	GetUserPropertiesByID(userID int) ([]models.Property, error)
	InsertNewProperty(property models.Property) error
	DeleteProperty(id int) error
	UserUpdateProperty(property models.Property) error
	UserUpdatePropertyStatus(id int, status string) error
}
