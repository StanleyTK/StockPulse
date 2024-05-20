# StockPulse

StockPulse is a stock portfolio tracking application developed with a Java Spring Boot backend and a React/Next.js frontend. The backend uses MySQL for data storage.
### Note the project is still under construction

## Backend

### Requirements

- Java 8 or higher
- Maven
- MySQL

### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/StanleyTK/StockPulse.git
    cd StockPulse/server
    ```

2. **Configure the database:**
    - Ensure MySQL is installed and running.
    - Create a database named `stockpulse`.
    - Update the `application.properties` file in the `src/main/resources` directory with your MySQL username and password.

    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/stockpulse
    spring.datasource.username=yourusername
    spring.datasource.password=yourpassword
    spring.jpa.hibernate.ddl-auto=update
    ```

3. **Build and run the backend:**
    ```sh
    mvn clean install
    mvn spring-boot:run
    ```

### Available Endpoints

- **`POST /api/users/login`**: Endpoint to handle user login.

## Frontend

### Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Setup

1. **Navigate to the client directory:**
    ```sh
    cd StockPulse/client
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Create a `.env` file:**
    ```plaintext
    NEXT_PUBLIC_BASE_URL=http://localhost:8080
    ```

### Available Scripts

In the `client` directory, you can run:

- **`npm start`**: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- **`npm test`**: Launches the test runner in the interactive watch mode.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm run eject`**: Ejects the create-react-app configuration (use with caution).

### Running the Frontend

To start the development server, run:
```sh
npm run dev
