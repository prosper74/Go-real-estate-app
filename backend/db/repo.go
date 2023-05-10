package db

import (
	"context"
	"time"

	"github.com/prosper74/real-estate-app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserModel struct {
	Collection *mongo.Collection
}

func (am *UserModel) CreateUser(ctx context.Context, user *models.User) (*models.User, error) {
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	res, err := am.Collection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = res.InsertedID.(primitive.ObjectID)
	return user, nil
}

func (am *UserModel) GetUserByID(ctx context.Context, id primitive.ObjectID) (*models.User, error) {
	var user models.User
	err := am.Collection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (am *UserModel) GetAllUsers(ctx context.Context) ([]*models.User, error) {
	var users []*models.User
	cur, err := am.Collection.Find(ctx, bson.M{})
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

func (am *UserModel) UpdateUser(ctx context.Context, id primitive.ObjectID, user *models.User) (*models.User, error) {
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
	_, err := am.Collection.UpdateOne(ctx, bson.M{"_id": id}, update)
	if err != nil {
		return nil, err
	}

	return user, nil
}
