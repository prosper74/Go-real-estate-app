package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Database struct {
	client             *mongo.Client
	UserCollection     *mongo.Collection
	PropertyCollection *mongo.Collection
}

func NewDatabase(dbConnectionString string) *Database {
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
		client:             client,
		UserCollection:     UserCollection,
		PropertyCollection: PropertyCollection,
	}
}

func (d *Database) Close() {
	err := d.client.Disconnect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
}
