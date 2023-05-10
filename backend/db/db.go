package db

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/prosper74/real-estate-app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type Database struct {
	client       *mongo.Client
	userColl     *mongo.Collection
	propertyColl *mongo.Collection
}

func NewDatabase() *Database {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
	}

	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("realEstate")
	userColl := db.Collection("users")
	propertyColl := db.Collection("properties")

	return &Database{
		client:       client,
		userColl:     userColl,
		propertyColl: propertyColl,
	}
}

func (d *Database) Close() {
	err := d.client.Disconnect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
}

func (d *Database) CreateUser(user *models.User) error {
	_, err := d.userColl.InsertOne(context.Background(), user)
	if err != nil {
		return err
	}
	return nil
}

func (d *Database) GetUserByEmail(email string) (*models.User, error) {
	filter := bson.M{"email": email}
	var user models.User
	err := d.userColl.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (d *Database) UpdateUser(user *models.User) error {
	filter := bson.M{"_id": user.ID}
	update := bson.M{"$set": bson.M{
		"firstName":         user.FirstName,
		"lastName":          user.LastName,
		"phoneNumber":       user.PhoneNumber,
		"isVerified":        user.Verified,
		"updatedAt":         user.UpdatedAt,
	}}
	_, err := d.userColl.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	return nil
}

func (d *Database) DeleteUser(id string) error {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	filter := bson.M{"_id": oid}
	_, err = d.userColl.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	return nil
}
