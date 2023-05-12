package db

import (
	"context"
	"log"

	"github.com/prosper74/real-estate-app/internal/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Database struct {
	Client             *mongo.Client
	UserCollection     *mongo.Collection
	PropertyCollection *mongo.Collection
	App                *config.AppConfig
}

func NewDatabase(dbConnectionString string) (*Database, error) {
	clientOptions := options.Client().ApplyURI(dbConnectionString)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("realEstate")
	UserCollection := db.Collection("users")
	PropertyCollection := db.Collection("properties")

	return &Database{
		Client:             client,
		UserCollection:     UserCollection,
		PropertyCollection: PropertyCollection,
	}, nil
}
