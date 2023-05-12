package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID          primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	FirstName   string             `json:"first_name,omitempty" bson:"first_name,omitempty"`
	LastName    string             `json:"last_name,omitempty" bson:"last_name,omitempty"`
	Email       string             `json:"email,omitempty" bson:"email,omitempty"`
	Password    string             `json:"password,omitempty" bson:"password,omitempty"`
	PhoneNumber string             `json:"phone_number,omitempty" bson:"phone_number,omitempty"`
	Verified    bool               `json:"verified,omitempty" bson:"verified,omitempty"`
	CreatedAt   time.Time          `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt   time.Time          `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type Property struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	AgentID     primitive.ObjectID `bson:"agentId"`
	Title       string             `bson:"title"`
	Description string             `bson:"description"`
	Address     Address            `bson:"address"`
	Price       float64            `bson:"price"`
	Bedrooms    int                `bson:"bedrooms"`
	Bathrooms   int                `bson:"bathrooms"`
	Area        Area               `bson:"area"`
	CreatedAt   primitive.DateTime `bson:"createdAt,omitempty"`
	UpdatedAt   primitive.DateTime `bson:"updatedAt,omitempty"`
}

type Address struct {
	Street  string `bson:"street"`
	City    string `bson:"city"`
	State   string `bson:"state"`
	Zip     string `bson:"zip"`
	Country string `bson:"country"`
}

type Area struct {
	Value float64 `bson:"value"`
	Unit  string  `bson:"unit"`
}
