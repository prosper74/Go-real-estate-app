package models

import (
	"time"
)

// User is the user model
type User struct {
	ID           int
	FirstName    string
	LastName     string
	Email        string
	Password     string
	Phone        string
	AccessLevel  int
	Verification string
	Address      string
	Image        string
	Token        string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

// User is the user model
type AccountVerification struct {
	ID             int
	Identity       string
	IdentityNumber string
	IdentityImage  string
	Address        string
	AddressImage   string
	UserID         int
	CreatedAt      time.Time
	UpdatedAt      time.Time
}

type Category struct {
	ID        int
	Title     string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Property struct
type Property struct {
	ID          int
	Title       string
	Description string
	Price       string
	Type        string
	Duration    string
	Size        string
	City        string
	State       string
	Bedroom     string
	Bathroom    string
	Featured    int
	Status      string
	Images      []string
	CategoryID  int
	UserID      int
	Category    Category
	User        User
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

// Favourites holds users favourite or wish list
type Favourite struct {
	ID         int
	UserID     int
	PropertyID int
	User       User
	Property   Property
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

// Review holds users reviews
type Review struct {
	ID          int
	Description string
	Rating      float64
	UserID      int
	PropertyID  int
	User        User
	Property    Property
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

// Informations for sending mail
type MailData struct {
	To       string
	From     string
	Subject  string
	Content  string
	Template string
}
