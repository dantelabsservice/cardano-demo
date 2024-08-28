# Ski Trip Manager

This documentation provides instructions on how to set up, run, and deploy the Ski Trip Manager application.

## Prerequisites

Before proceeding with the setup, ensure that you have the following prerequisites installed:

- Node.js (version 18 or higher)
- Yarn (package manager)

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/ski-trip-manager.git
    ```

2. Navigate to the project directory:

    ```bash
    cd ski-trip-manager
    ```

3. Ensure you're using the correct version of Node:

    ```bash
    nvm use
    ```
    
4. Install the dependencies:

    ```bash
    yarn install
    ```

5. Configure the application:

    - Rename the `.env.example` file to `.env`.
    - Open the `.env` file and update the necessary configuration variables, such as database connection details and API keys.

5. Set up the database:

    - Create a new database for the application.
    - Update the `NEXT_PUBLIC_GRAPHQL_URL` variable in the `.env` file with the appropriate database connection string.

## Running the Application

To start the application, run the following command:

```bash
yarn start
```

The application will be accessible at `http://localhost:3000`.

## Deployment

Merge a PR for `develop` into `main` branch to automatically generate a new deploy on Vercel.
