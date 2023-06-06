package models

import (
	"time"
)

// User is the user model
type User struct {
	ID          int
	FirstName   string
	LastName    string
	Email       string
	Password    string
	Phone       string
	AccessLevel int
	Verified    int
	Address     string
	Image       string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type Category struct {
	ID        int
	Title     string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Reservation is the reservation model
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
	Property   Property
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

// Review holds users reviews
type Review struct {
	ID          int
	Description string
	Rating      float32
	UserID      int
	PropertyID  int
	User        User
	Property    Property
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
