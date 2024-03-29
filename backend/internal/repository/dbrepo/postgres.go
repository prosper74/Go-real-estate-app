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

	query := `select id, first_name, last_name, email, phone, access_level, verified, address, image, created_at, updated_at from users order by created_at desc`

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
			&user.Verification,
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
	where p.status = 'enabled'
	order by p.created_at desc`

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
	where p.featured = 1 and p.status = 'enabled'
	order by p.created_at desc`

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
	where p.category_id = 1 and p.status = 'enabled'
	order by p.created_at desc`

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
	where p.category_id = 2 and p.status = 'enabled'
	order by p.created_at desc`

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
	where p.category_id = 3 and p.status = 'enabled'
	order by p.created_at desc`

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
	u.id, u.first_name, u.last_name, u.email, u.phone, u.verification, u.image, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where p.id = $1 and p.status = 'enabled'
	order by p.created_at desc`

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
		&property.User.Verification,
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
	where p.type = $1 and p.status = 'enabled'
	order by p.created_at desc`

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
func (m *postgresDBRepo) GetUserPropertiesByID(userID int) ([]models.Property, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var properties []models.Property

	query := `select p.id, p.title, p.description, p.price, p.type, p.duration, p.size, p.city, p.state, p.bedroom, p.bathroom, p.featured, p.status, p.images, p.category_id, p.user_id, p.created_at, p.updated_at,
	u.id, u.first_name, u.last_name, u.email, u.phone, u.verification, u.image, u.created_at, c.id, c.title
	from properties p
	left join users u on (p.user_id = u.id)
	left join categories c on (p.category_id = c.id)
	where u.id = $1
	order by p.created_at desc`

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
			&property.User.Verification,
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
func (m *postgresDBRepo) InsertUser(user models.User) (int, error) {
	// Close this transaction if unable to run this statement within 3 seconds
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var newUserID int

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return 0, err
	}

	query := `insert into users (first_name, last_name, email, password, created_at, updated_at) values ($1, $2, $3, $4, $5, $6) returning id`

	err = m.DB.QueryRowContext(context, query, user.FirstName, user.LastName, user.Email, hashedPassword, time.Now(), time.Now()).Scan(&newUserID)

	if err != nil {
		return 0, err
	}

	return newUserID, nil
}

// GetUserByID returns a user by id
func (m *postgresDBRepo) GetUserByID(id int) (models.User, error) {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, first_name, last_name, email, phone, access_level, verification, address, image, created_at, updated_at
			from users where id = $1`

	row := m.DB.QueryRowContext(context, query, id)

	var user models.User
	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Phone,
		&user.AccessLevel,
		&user.Verification,
		&user.Address,
		&user.Image,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return user, err
	}

	return user, nil
}

// GetUserByEmail returns a user by email
func (m *postgresDBRepo) GetUserByEmail(email string) (models.User, error) {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, first_name, last_name, email, phone, access_level, verification, address, image, created_at, updated_at
			from users where email = $1`

	row := m.DB.QueryRowContext(context, query, email)

	var user models.User
	err := row.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Phone,
		&user.AccessLevel,
		&user.Verification,
		&user.Address,
		&user.Image,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return user, err
	}

	return user, nil
}

// UpdateUserImageAndPhone updates a user image and phone in the database
func (m *postgresDBRepo) UpdateUserProfile(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		update users set first_name = $1, last_name = $2, phone = $3, address = $4, updated_at = $5 where id = $6
	`

	_, err := m.DB.ExecContext(context, query, user.FirstName, user.LastName, user.Phone, user.Address, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// UpdateUser updates a user in the database
func (m *postgresDBRepo) UpdateUserAccessLevel(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		update users set access_level = $1, updated_at = $2 where id = $3
	`

	_, err := m.DB.ExecContext(context, query, user.AccessLevel, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// UpdateUserImageAndPhone updates a user image and phone in the database
func (m *postgresDBRepo) UpdateUserImageAndPhone(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		update users set image = $1, phone = $2, updated_at = $3 where id = $4
	`

	_, err := m.DB.ExecContext(context, query, user.Image, user.Phone, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// UserUpdateImage updates a user image in the database
func (m *postgresDBRepo) UserUpdateImage(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		update users set image = $1, updated_at = $2 where id = $3
	`

	_, err := m.DB.ExecContext(context, query, user.Image, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// DeleteUserAccount deletes user from DB
func (m *postgresDBRepo) DeleteUserAccount(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `delete from users where id = $1`

	_, err := m.DB.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	return nil
}

// Authenticate authenticates a user
func (m *postgresDBRepo) Authenticate(email, testPassword string) (models.User, error) {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var user models.User
	var hashedPassword string

	row := m.DB.QueryRowContext(context, "select id, first_name, last_name, email, phone, image, password from users where email = $1", email)
	err := row.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Phone, &user.Image, &hashedPassword)
	if err != nil {
		return user, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(testPassword))
	if err == bcrypt.ErrMismatchedHashAndPassword {
		return user, errors.New("incorrect password")
	} else if err != nil {
		return user, err
	}

	return user, nil
}

// InsertAccountVerification inserts a new account verification for a user
func (m *postgresDBRepo) InsertAccountVerification(d models.AccountVerification) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `insert into account_verification (identity, identity_number, identity_image, address, address_image, user_id, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, $7, $8)`

	_, err := m.DB.ExecContext(context, query, d.Identity, d.IdentityNumber, d.IdentityImage, d.Address, d.AddressImage, d.UserID, time.Now(), time.Now())

	if err != nil {
		return err
	}

	return nil
}

// UpdateUserVerification updates a user verification status in the database
func (m *postgresDBRepo) UpdateUserVerification(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		update users set verification = $1, updated_at = $2 where id = $3
	`

	_, err := m.DB.ExecContext(context, query, user.Verification, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// UpdateUser updates a user in the database
func (m *postgresDBRepo) UpdateUserVerificationStatus(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
		update users set verification = $1, access_level = $2, updated_at = $3 where id = $4
	`

	_, err := m.DB.ExecContext(context, query, user.Verification, user.AccessLevel, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// UpdateUserPassword updates a user password in the database
func (m *postgresDBRepo) UpdateUserPassword(user models.User) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)
	if err != nil {
		return err
	}

	query := `
		update users set password = $1, updated_at = $2 where id = $3
	`

	_, err = m.DB.ExecContext(context, query, hashedPassword, time.Now(), user.ID)

	if err != nil {
		return err
	}

	return nil
}

// InsertNewProperty inserts a new property for a user
func (m *postgresDBRepo) InsertNewProperty(property models.Property) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `insert into properties (title, description, price, type, duration, size, city, state, bedroom, bathroom, status, images, category_id, user_id, created_at, updated_at) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`

	_, err := m.DB.ExecContext(context, query, property.Title, property.Description, property.Price, property.Type, property.Duration, property.Size, property.City, property.State, property.Bedroom, property.Bathroom, property.Status, property.Images, property.CategoryID, property.UserID, time.Now(), time.Now())

	if err != nil {
		return err
	}

	return nil
}

// DeleteProperty deletes properties from DB
func (m *postgresDBRepo) DeleteProperty(id int) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `delete from properties where id = $1`

	_, err := m.DB.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	return nil
}

// Update a property in the
func (m *postgresDBRepo) UserUpdateProperty(property models.Property) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `update properties set title = $1, description = $2, price = $3, type = $4, duration = $5, size = $6, city = $7, state = $8, bedroom = $9, bathroom = $10, images = $11, category_id = $12, updated_at = $13 
	where id = $14 and user_id = $15`

	_, err := m.DB.ExecContext(ctx, query, property.Title, property.Description, property.Price, property.Type, property.Duration, property.Size, property.City, property.State, property.Bedroom, property.Bathroom, property.Images, property.CategoryID, time.Now(), property.ID, property.UserID)

	if err != nil {
		return err
	}

	return nil
}

// Update property status in the db
func (m *postgresDBRepo) UserUpdatePropertyStatus(id int, status string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `update properties set status = $1, updated_at = $2 where id = $3`

	_, err := m.DB.ExecContext(ctx, query, status, time.Now(), id)
	if err != nil {
		return err
	}

	return nil
}

// InsertNewFavourite inserts a new favourite for a user
func (m *postgresDBRepo) InsertNewFavourite(favourite models.Favourite) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `insert into favourites (property_id, user_id, created_at, updated_at) values ($1, $2, $3, $4)`

	_, err := m.DB.ExecContext(context, query, favourite.PropertyID, favourite.UserID, time.Now(), time.Now())

	if err != nil {
		return err
	}

	return nil
}

// Get favourites for a property
func (m *postgresDBRepo) PropertyFavourites(propertyID int) ([]models.Favourite, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var favourites []models.Favourite

	query := `select f.id, f.property_id, f.user_id, f.created_at, f.updated_at,
	u.id, p.id, p.title, p.price, p.images, p.category_id
	from favourites f
	left join users u on (f.user_id = u.id)
	left join properties p on (f.property_id = p.id)
	where f.property_id = $1
	order by f.created_at desc`

	rows, err := m.DB.QueryContext(ctx, query, propertyID)
	if err != nil {
		return favourites, err
	}
	defer rows.Close()

	for rows.Next() {
		var favourite models.Favourite
		var imagesArrayString string

		err := rows.Scan(
			&favourite.ID,
			&favourite.PropertyID,
			&favourite.UserID,
			&favourite.CreatedAt,
			&favourite.UpdatedAt,
			&favourite.User.ID,
			&favourite.Property.ID,
			&favourite.Property.Title,
			&favourite.Property.Price,
			&imagesArrayString,
			&favourite.Property.CategoryID,
		)

		// Convert the array string to a string slice using the function
		favourite.Property.Images = helpers.ConvertPostgresArrayToStringSlice(imagesArrayString)

		if err != nil {
			return favourites, err
		}
		favourites = append(favourites, favourite)
	}

	if err = rows.Err(); err != nil {
		return favourites, err
	}

	return favourites, nil
}

// Get favourites for a user
func (m *postgresDBRepo) GetUserFavourites(userID int) ([]models.Favourite, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var favourites []models.Favourite

	query := `select f.id, f.property_id, f.user_id, f.created_at, f.updated_at,
	u.id, p.id, p.title, p.price, p.bedroom, p.bathroom, p.type, p.city, p.state, p.images, p.category_id
	from favourites f
	left join users u on (f.user_id = u.id)
	left join properties p on (f.property_id = p.id)
	where f.user_id = $1
	order by f.created_at desc`

	rows, err := m.DB.QueryContext(ctx, query, userID)
	if err != nil {
		return favourites, err
	}
	defer rows.Close()

	for rows.Next() {
		var favourite models.Favourite
		var imagesArrayString string

		err := rows.Scan(
			&favourite.ID,
			&favourite.PropertyID,
			&favourite.UserID,
			&favourite.CreatedAt,
			&favourite.UpdatedAt,
			&favourite.User.ID,
			&favourite.Property.ID,
			&favourite.Property.Title,
			&favourite.Property.Price,
			&favourite.Property.Bedroom,
			&favourite.Property.Bathroom,
			&favourite.Property.Type,
			&favourite.Property.City,
			&favourite.Property.State,
			&imagesArrayString,
			&favourite.Property.CategoryID,
		)

		// Convert the array string to a string slice using the function
		favourite.Property.Images = helpers.ConvertPostgresArrayToStringSlice(imagesArrayString)

		if err != nil {
			return favourites, err
		}
		favourites = append(favourites, favourite)
	}

	if err = rows.Err(); err != nil {
		return favourites, err
	}

	return favourites, nil
}

// Delete favourite from the database
func (m *postgresDBRepo) DeleteFavourite(favourite models.Favourite) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `delete from favourites where property_id = $1 and user_id = $2`

	_, err := m.DB.ExecContext(context, query, favourite.PropertyID, favourite.UserID)

	if err != nil {
		return err
	}

	return nil
}

// InsertNewReview inserts a new review for a user
func (m *postgresDBRepo) InsertNewReview(review models.Review) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `insert into reviews (description, rating, property_id, user_id, created_at, updated_at) values ($1, $2, $3, $4, $5, $6)`

	_, err := m.DB.ExecContext(context, query, review.Description, review.Rating, review.PropertyID, review.UserID, time.Now(), time.Now())

	if err != nil {
		return err
	}

	return nil
}

// Get reviews for a user
func (m *postgresDBRepo) GetPropertyReviews(propertyID int) ([]models.Review, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var reviews []models.Review

	query := `select r.id, r.description, r.rating, r.property_id, r.user_id, r.created_at, r.updated_at,
	u.id, u.first_name, u.last_name, u.image, p.id, p.title
	from reviews r
	left join users u on (r.user_id = u.id)
	left join properties p on (r.property_id = p.id)
	where r.property_id = $1
	order by r.created_at desc`

	rows, err := m.DB.QueryContext(ctx, query, propertyID)
	if err != nil {
		return reviews, err
	}
	defer rows.Close()

	for rows.Next() {
		var review models.Review

		err := rows.Scan(
			&review.ID,
			&review.Description,
			&review.Rating,
			&review.PropertyID,
			&review.UserID,
			&review.CreatedAt,
			&review.UpdatedAt,
			&review.User.ID,
			&review.User.FirstName,
			&review.User.LastName,
			&review.User.Image,
			&review.Property.ID,
			&review.Property.Title,
		)

		if err != nil {
			return reviews, err
		}
		reviews = append(reviews, review)
	}

	if err = rows.Err(); err != nil {
		return reviews, err
	}

	return reviews, nil
}

// Get user reviews
func (m *postgresDBRepo) GetUserReviews(userID int) ([]models.Review, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var reviews []models.Review
	var imagesArrayString string

	query := `select r.id, r.description, r.rating, r.property_id, r.user_id, r.created_at, r.updated_at,
	u.id, u.first_name, u.last_name, u.image, p.id, p.title, p.category_id, p.images
	from reviews r
	left join users u on (r.user_id = u.id)
	left join properties p on (r.property_id = p.id)
	where r.user_id = $1
	order by r.created_at desc`

	rows, err := m.DB.QueryContext(ctx, query, userID)
	if err != nil {
		return reviews, err
	}
	defer rows.Close()

	for rows.Next() {
		var review models.Review

		err := rows.Scan(
			&review.ID,
			&review.Description,
			&review.Rating,
			&review.PropertyID,
			&review.UserID,
			&review.CreatedAt,
			&review.UpdatedAt,
			&review.User.ID,
			&review.User.FirstName,
			&review.User.LastName,
			&review.User.Image,
			&review.Property.ID,
			&review.Property.Title,
			&review.Property.CategoryID,
			&imagesArrayString,
		)

		// Convert the array string to a string slice using the function
		review.Property.Images = helpers.ConvertPostgresArrayToStringSlice(imagesArrayString)

		if err != nil {
			return reviews, err
		}
		reviews = append(reviews, review)
	}

	if err = rows.Err(); err != nil {
		return reviews, err
	}

	return reviews, nil
}

// Update review
func (m *postgresDBRepo) UpdateReview(review models.Review) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `update reviews set description = $1, rating = $2, updated_at = $3 where id = $4 and user_id = $5`

	_, err := m.DB.ExecContext(ctx, query, review.Description, review.Rating, time.Now(), review.ID, review.UserID)

	if err != nil {
		return err
	}

	return nil
}

// Delete review from the database
func (m *postgresDBRepo) DeleteReview(reviewID int) error {
	context, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `delete from reviews where id = $1`

	_, err := m.DB.ExecContext(context, query, reviewID)

	if err != nil {
		return err
	}

	return nil
}
