package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
    ID                primitive.ObjectID `bson:"_id,omitempty"`
    Email             string             `bson:"email"`
    Password          string             `bson:"password"`
    FirstName         string             `bson:"firstName"`
    LastName          string             `bson:"lastName"`
    PhoneNumber       string             `bson:"phoneNumber"`
    IsVerified        bool               `bson:"isVerified"`
    VerificationToken string             `bson:"verificationToken"`
    CreatedAt         primitive.DateTime `bson:"createdAt,omitempty"`
    UpdatedAt         primitive.DateTime `bson:"updatedAt,omitempty"`
}
