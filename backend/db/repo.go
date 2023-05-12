package db

import (
	"context"
	"time"

	"github.com/prosper74/real-estate-app/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (am *Database) CreateUser(ctx context.Context, user *models.User) (*models.User, error) {
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	res, err := am.UserCollection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}

	user.ID = res.InsertedID.(primitive.ObjectID)
	return user, nil
}

func (am *Database) GetUserByID(ctx context.Context, id primitive.ObjectID) (*models.User, error) {
	var user models.User
	err := am.UserCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (am *Database) GetAllUsers(ctx context.Context) ([]*models.User, error) {
	var users []*models.User
	cur, err := am.UserCollection.Find(ctx, bson.M{})
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

func (am *Database) UpdateUser(ctx context.Context, id primitive.ObjectID, user *models.User) (*models.User, error) {
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
	_, err := am.UserCollection.UpdateOne(ctx, bson.M{"_id": id}, update)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (d *Database) GetUserByEmail(email string) (*models.User, error) {
	filter := bson.M{"email": email}
	var user models.User
	err := d.UserCollection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (d *Database) DeleteUser(id string) error {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	filter := bson.M{"_id": oid}
	_, err = d.UserCollection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	return nil
}
