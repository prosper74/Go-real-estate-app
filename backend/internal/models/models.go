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
	Verified    bool
	Address     string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

type Category struct {
	ID        int
	Name      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// Reservation is the reservation model
type Property struct {
	ID          int
	Name        string
	Description string
	Price       string
	Duration    string
	Location    string
	Room        string
	Toilet      string
	Status      string
	Image       string
	Galery      []string
	Category    Category
	User        User
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
