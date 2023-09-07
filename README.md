## Real Estate App With Go and NextJS

This is a fullstack real estate app, built with Go version 1.19 and NextJs

This project is a simple real estate app project which aims to connect people with properties directly. It has some key features like;

- Authentication
- Agents create, update and delete their properties
- Agents verification
- admin dashboard (Coming Soon)
- Create and manage properties
- Showcase the properties
- Notifification system

### Database used
Postgres

### Packages used

#### Go
- <a href="https://github.com/alexedwards/scs" target="_blank">Alex Edwards SCS</a> - For managing sessions
- <a href="https://github.com/go-chi/chi" target="_blank">Chi router</a> - For create routes
- <a href="https://github.com/justinas/nosurf" target="_blank">Justinas nosurf</a> - Cross-Site Request Forgery
- <a href="https://github.com/jackc/pgx" target="_blank">JackC PGX</a> - PGX is a pure Go driver and toolkit for PostgreSQL.
- <a href="https://github.com/sendinblue/APIv3-go-library" target="_blank">SendinBlue</a> Used for sending mails.
- <a href="https://github.com/golang-jwt/jwt" target="_blank">Go JWT</a> - For JWT authentications.

#### Next JS
- <a href="https://www.typescriptlang.org" target="_blank">TypeScript</a> - For type checking
- <a href="https://react-redux.js.org" target="_blank">React Redux</a> - For state management
- <a href="https://tailwindcss.com/docs/installation" target="_blank">Tailwind CSS</a> - For styling
- <a href="https://headlessui.com" target="_blank">HeadlessUI</a> - Tailwind CSS Plugin
- <a href="https://www.flowbite-react.com" target="_blank">Tailwind CSS</a> - Tailwind CSS Plugin
- <a href="https://lexical.dev/docs/getting-started/react#video-tutorials" target="_blank">React Lexical</a> - Rich text editor
- <a href="https://react-hook-form.com" target="_blank">React hook form and zod</a> - Forms and form validations
- <a href="https://www.npmjs.com/package/cloudinary-react" target="_blank">Cloudinary React</a> - To store images
- <a href="https://www.framer.com/motion/?utm_source=motion-readme-docs" target="_blank">Framer Motion</a> - For animations
- <a href="https://www.npmjs.com/package/react-showdown" target="_blank">React Showdown</a> - For reading markdown
- <a href="https://swiperjs.com/react" target="_blank">Swiper js</a> - For sliders

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

- Manually: `go run cmd/web/main.go cmd/web/middleware.go cmd/web/routes.go cmd/web/sendMail.go`
- Batch (Please use the linux method even on windows, as it works pretty well):  
**On Windows** - create a `run.bat` file in the root directory of the project and paste the below code

  ```
  go build -o out cmd/web/*.go
  ./out.exe
  ```

  Then run `run.bat` in the terminal

  **On linux** - create a `run.sh` file in the root directory of the project and paste the below code

  ```
  #!/bin/bash

  go build -o out cmd/web/*.go
  ./out <pass your flag dependencies here>
  ```

  Run `chmod +x run.sh` then run `./run.sh` in the terminal

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

