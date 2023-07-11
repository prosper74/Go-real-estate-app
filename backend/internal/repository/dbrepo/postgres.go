package dbrepo

import (
	"context"
	"errors"
	"time"

	"github.com/prosper74/real-estate-app/internal/helpers"
	"github.com/prosper74/real-estate-app/internal/models"
	"golang.org/x/crypto/bcrypt"
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

// Get all users from the database
func (m *postgresDBRepo) CheckIfUserEmailExist(email string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var numRows int

	query := `
		select
			count(id)
		from
			users
		where
			email = $1`

	row := m.DB.QueryRowContext(ctx, query, email)
	err := row.Scan(&numRows)
	if err != nil {
		return false, err
	}

	if numRows == 0 {
		return false, nil
	}
	return true, nil
}

// Get properties
func (m *postgresDBRepo) AllProperties() ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
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
		var imagesArrayString string

		err := rows.Scan(
			&property.ID,
			&property.Title,
			&property.Description,
			&property.Price,
			&property.Type,
			&property.Duration,
			&property.Size,
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

// Get all featured properties
func (m *postgresDBRepo) AllFeaturedProperties() ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
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
			&property.Size,
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

// Get all buy properties
func (m *postgresDBRepo) AllBuyProperties() ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where p.category_id = 1
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
			&property.Size,
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

// Get all Rent properties
func (m *postgresDBRepo) AllRentProperties() ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where p.category_id = 2
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
			&property.Size,
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

// Get all Shortlet properties
func (m *postgresDBRepo) AllShortletProperties() ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where p.category_id = 3
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
			&property.Size,
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

// Get a property by id
func (m *postgresDBRepo) GetPropertyByID(id int) (models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var property models.Property
	var imagesArrayString string

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, u.last_name, u.email, u.phone, u.verified, u.image, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where p.id = $1
	order by p.created_at asc`

	row := m.DB.QueryRowContext(ctx, query, id)

	err := row.Scan(
		&property.ID,
		&property.Title,
		&property.Description,
		&property.Price,
		&property.Type,
		&property.Duration,
		&property.Size,
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
		&property.User.LastName,
		&property.User.Email,
		&property.User.Phone,
		&property.User.Verified,
		&property.User.Image,
		&property.Category.ID,
		&property.Category.Title,
	)

	// Convert the array string to a string slice using the function
	property.Images = helpers.ConvertPostgresArrayToStringSlice(imagesArrayString)

	if err != nil {
		return property, err
	}

	return property, nil
}

// Get a properties by property by type
func (m *postgresDBRepo) GetPropertiesByType(propertyType string) ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where p.type = $1
	order by p.created_at asc`

	rows, err := m.DB.QueryContext(ctx, query, propertyType)
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
			&property.Size,
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

// Get a property by type
func (m *postgresDBRepo) GetUserPropertiesByID(userID string) ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, u.last_name, u.email, u.phone, u.verified, u.image, u.created_at, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where u.id = $1
	order by p.created_at asc`

	rows, err := m.DB.QueryContext(ctx, query, userID)
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
			&property.Size,
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
			&property.User.LastName,
			&property.User.Email,
			&property.User.Phone,
			&property.User.Verified,
			&property.User.Image,
			&property.User.CreatedAt,
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

// Inserts a user into the database
func (repo *postgresDBRepo) InsertUser(user models.User) (int, error) {
	// Close this transaction if unable to run this statement within 3 seconds
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var newUserID int

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return 0, err
	}

	query := `insert into users (first_name, last_name, email, password, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) returning id`

	err = repo.DB.QueryRowContext(context, query, user.FirstName, user.LastName, user.Email, hashedPassword, time.Now(), time.Now()).Scan(&newUserID)

	if err != nil {
		return 0, err
	}

	return newUserID, nil
}

// GetUserByID returns a user by id
func (repo *postgresDBRepo) GetUserByID(id int) (models.User, error) {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, first_name, last_name, email, phone, access_level, address, image, token, created_at, updated_at
			from users where id = $1`

	row := repo.DB.QueryRowContext(context, query, id)

	var user models.User
	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Phone,
		&user.AccessLevel,
		&user.Address,
		&user.Image,
		&user.Token,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return user, err
	}

	return user, nil
}

// UpdateUser updates a user in the database
func (repo *postgresDBRepo) UpdateUserAccessLevel(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		update users set access_level = $1, updated_at = $2 where id = $3
	`

	_, err := repo.DB.ExecContext(context, query, user.AccessLevel, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// Authenticate authenticates a user
func (repo *postgresDBRepo) Authenticate(email, testPassword string) (int, string, string, error) {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var id int
	var firstName string
	var hashedPassword string

	row := repo.DB.QueryRowContext(context, "select id, first_name, password from users where email = $1", email)
	err := row.Scan(&id, &firstName, &hashedPassword)
	if err != nil {
		return id, "", "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(testPassword))
	if err == bcrypt.ErrMismatchedHashAndPassword {
		return 0, "", "", errors.New("incorrect password")
	} else if err != nil {
		return 0, "", "", err
	}

	return id, firstName, hashedPassword, nil
}
