package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
)

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
