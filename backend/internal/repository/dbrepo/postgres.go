package dbrepo

import (
	"context"
	"time"

	"github.com/prosper74/real-estate-app/internal/helpers"
	"github.com/prosper74/real-estate-app/internal/models"
)

// Get all users from the database
func (m *postgresDBRepo) AllUsers() ([]models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var users []models.User

	query := `select id, first_name, last_name, email, phone, access_level, verified, address, image, created_at, updated_at from users order by created_at`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return users, err
	}
	defer rows.Close()

	for rows.Next() {
		var user models.User
		err := rows.Scan(
			&user.ID,
			&user.FirstName,
			&user.LastName,
			&user.Email,
			&user.Phone,
			&user.AccessLevel,
			&user.Verified,
			&user.Address,
			&user.Image,
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			return users, err
		}
		users = append(users, user)
	}

	if err = rows.Err(); err != nil {
		return users, err
	}

	return users, nil
}

// Get properties
func (m *postgresDBRepo) AllProperties() ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	order by p.created_at asc`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return properties, err
	}
	defer rows.Close()

	for rows.Next() {
		var property models.Property
		err := rows.Scan(
			&property.ID,
			&property.Title,
			&property.Description,
			&property.Price,
			&property.Type,
			&property.Duration,
			&property.City,
			&property.State,
			&property.Bedroom,
			&property.Bathroom,
			&property.Featured,
			&property.Status,
			&property.Images,
			&property.CategoryID,
			&property.UserID,
			&property.User.ID,
			&property.User.FirstName,
			&property.Category.ID,
			&property.Category.Title,
			&property.CreatedAt,
			&property.UpdatedAt,
		)

		if err != nil {
			return properties, err
		}
		properties = append(properties, property)
	}

	if err = rows.Err(); err != nil {
		return properties, err
	}

	return properties, nil
}

// Get all featured properties
func (m *postgresDBRepo) AllFeaturedProperties() ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where p.featured = 1
	order by p.created_at asc`

	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return properties, err
	}
	defer rows.Close()

	for rows.Next() {
		var property models.Property
		var imagesArrayString string

		err := rows.Scan(
			&property.ID,
			&property.Title,
			&property.Description,
			&property.Price,
			&property.Type,
			&property.Duration,
			&property.City,
			&property.State,
			&property.Bedroom,
			&property.Bathroom,
			&property.Featured,
			&property.Status,
			&imagesArrayString,
			&property.CategoryID,
			&property.UserID,
			&property.CreatedAt,
			&property.UpdatedAt,
			&property.User.ID,
			&property.User.FirstName,
			&property.Category.ID,
			&property.Category.Title,
		)

		// Convert the array string to a string slice using the function
		property.Images = helpers.ConvertPostgresArrayToStringSlice(imagesArrayString)

		if err != nil {
			return properties, err
		}
		properties = append(properties, property)
	}

	if err = rows.Err(); err != nil {
		return properties, err
	}

	return properties, nil
}
