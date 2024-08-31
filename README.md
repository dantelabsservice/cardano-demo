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

    - Update the `NEXT_PUBLIC_GRAPHQL_URL` variable in the `.env` file with the appropriate API connection string.

## Running the Application

To start the application, run the following command:

```bash
yarn start
```

The application will be accessible at `http://localhost:3000`.

## Deployment

The Ski Trip Manager application is deployed using Vercel. To deploy the application, follow these steps:

1. Open a pull request from the `develop` branch to the `main` branch.

3. Wait for the Vercel checks to complete. Vercel will automatically build and deploy the application for each pull request.

4. If the checks pass and the application is working as expected, merge the pull request into the `main` branch.

5. Vercel will then deploy the application to the production environment. Wait for the deployment to be finished.

Once the deployment is complete, the Ski Trip Manager application will be accessible at [https://ski-trip-manager.vercel.app/](https://ski-trip-manager.vercel.app/).

