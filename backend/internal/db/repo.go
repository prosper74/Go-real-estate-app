package db

import (
	"context"
	"time"

	"github.com/prosper74/real-estate-app/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (d *Database) CreateUser(user *models.User) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	res, err := d.UserCollection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = res.InsertedID.(primitive.ObjectID)
	return user, nil
}

func (d *Database) GetUserByID(id primitive.ObjectID) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user models.User
	err := d.UserCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (d *Database) GetAllUsers() ([]*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var users []*models.User
	cur, err := d.UserCollection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cur.Close(ctx)

	for cur.Next(ctx) {
		var agent models.User
		if err := cur.Decode(&agent); err != nil {
			return nil, err
		}
		users = append(users, &agent)
	}

	if err := cur.Err(); err != nil {
		return nil, err
	}

	return users, nil
}

func (d *Database) UpdateUser(id primitive.ObjectID, user *models.User) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	user.UpdatedAt = time.Now()
	update := bson.M{
		"$set": bson.M{
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"email":      user.Email,
			"password":   user.Password,
			"verified":   user.Verified,
			"updated_at": user.UpdatedAt,
		},
	}
	_, err := d.UserCollection.UpdateOne(ctx, bson.M{"_id": id}, update)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (d *Database) GetUserByEmail(email string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	filter := bson.M{"email": email}
	var user models.User
	err := d.UserCollection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (d *Database) DeleteUser(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	filter := bson.M{"_id": oid}
	_, err = d.UserCollection.DeleteOne(ctx, filter)
	if err != nil {
		return err
	}
	return nil
}
