## Real Estate App With Go and NextJS

This is a fullstack real estate app, built with Go version 1.19 and NextJs

This project is a simple real estate app project with key features like;

- Authentication
- Agents create, update and delete their properties
- Agents verification
- admin dashboard (Coming Soon)
- Create and manage properties
- Showcase the properties
- Notifification system

### Packages used

#### Go
- [Alex Edwards SCS](https://github.com/alexedwards/scs/v2) package for managing sessions
- [Chi router](https://github.com/go-chi/chi/v5)
- [Justinas nosurf](https://github.com/justinas/nosurf)
- [JackC PGX](https://github.com/jackc/pgx/v5) pgx is a pure Go driver and toolkit for PostgreSQL.
- [Go Simple Mail](https://github.com/xhit/go-simple-mail) Used for sending mails.

### Note:

- Create your own go mod file and delete the one used here, run the following command `go mod init your-project-name`
- your-project-name is usually your github link and the name of your project, example "github.com/prosper74/go-project". This is not a must, but a recommendation.
- Change the name of every import to your current go mod name. Example, open the main.go file, in the `required imports` section, replace these "github.com/atuprosper/go-project/pkg/config" to "github.com/atuprosper/your-project-name/pkg/config". Go through all files and make this replacement
- After all the necessary changes, run the app `go run cmd/web/*.go` this will install all the third party packages and run the server on the selected port.
- Create your postgres db
- Setup the flags in main.go file - `cmd/web/main.go`
- Setup the flags in run.sh file
- Do not use the rub.bat file as it encounters errors sometimes from windows. run.sh will work for both windows and linux
- Setup the .env file, rename the `.env.example` to `.env`. Create your sendinBlue account and add the api
- In the .env file, the `POSTGRES_URI` is the hosted database, while the other database strings are for localhost. After setting either one up, make sure to check the `main.go` file
- Setup the `database.yml`, rename the `database.yml.example` to `database.yml`. This will enable you to run `soda migrate`

### Run the server

- Manual: `go run cmd/web/main.go cmd/web/middleware.go cmd/web/routes.go cmd/web/sendMail.go`
- Batch:  
**On Windows** - create a `run.bat` file in the root directory of the project and paste the below code

  ```
  go build -o bookings cmd/web/*.go
  ./bookings.exe
  ```

  Then run `run.bat` in the terminal

  **On linux** - create a `run.sh` file in the root directory of the project and paste the below code

  ```
  #!/bin/bash

  go build -o booking cmd/web/*.go
  ./bookings
  ```

  Run `chmod +x run.sh` then run `./run.sh` in the terminal

### The test file

- To output test in hmtl format run `go test -coverprofile=coverage.out && go tool cover -html=coverage.out`
- To know the percentage coverage run `go test -cover`
- Run test for the entire project `go test -v ./...`

### Soda migration

- install `soda`, run `go install github.com/gobuffalo/pop/v6/soda@latest`
- `soda g config` to generate a database.yml file in the current directory for a PostgreSQL database. Then setup your database
- run `soda generate fizz migration-name` in the terminal, to create the migration folder and files. Run this code to create migration files for each table
- We can also run sql version `soda generate sql migration-name`
- The up file is used to create or update while the down file is used to delete or downgrade
- run `soda migrate` to run the migration files
- run `soda migrate down` to run the down migration files
- run `soda reset` to drop everything in the database and create the migration again
- Read the documentation to know more about [Buffalo](https://gobuffalo.io/documentation/database/migrations/) or the [Fizz Github page](https://github.com/gobuffalo/fizz)

