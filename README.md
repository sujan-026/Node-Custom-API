# User Registration API

Welcome to the User Registration API! This project is a simple Node.js API for managing user registrations. It provides endpoints for creating, retrieving, and deleting users. The API is built from scratch, with plans for future enhancements including database integration.

## Features

- **Get All Users**: Retrieve a list of all registered users.
- **Get User by ID**: Fetch user details based on a unique identifier.
- **Get User by Name**: Search for a user using their name.
- **Create New User**: Register a new user with a specified name.
- **Delete Existing User**: Remove a user from the records.

## Current Implementation

- User data is currently stored locally (in-memory).
- The API is built using Node.js and utilizes Express for handling HTTP requests.

## Upcoming Features

- **Database Integration**: Implement a database (such as MongoDB or PostgreSQL) to store user data persistently.
- **User Input Validation**: Enhance the API to validate user inputs before processing.
- **Authentication**: Add user authentication and authorization features for enhanced security.

## How to Run

1. Clone the repository to your local machine:

    ```
    git clone https://github.com/sujan-026/Node-Custom-API
    ```

2. Navigate to the project directory:

    ```
    cd server.js
    ```

3. Install the required dependencies:

    ```
    npm install 
    ```

4. Start the server:

    ```
    node server.js
    or
    npm start
    ```

5. Open your web browser or use a tool like Postman to test the API at `http://localhost:3000`.

## API Endpoints

- **GET /api/users: Retrieve all users.
- **GET /api/users/:id : Retrieve a user by ID.
- **GET /api/users/name: Retrieve a user by name.
- **POST /api/users: Create a new user.
- **DELETE /api/users/:id : Delete a user by ID.

## Contributing

Contributions to the User Registration API project are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.
