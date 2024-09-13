Sure, here’s a README file for your Next.js project:

---

# Planet Webapp

Welcome to the Planet Webapp! This project is a Next.js application that includes user authentication, profile management, and state management using Zustand.

## Getting Started

To get started with the development of this project, follow the instructions below:

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/jugalsuthar4/planet-webapp-task.git
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the Development Server

Start the development server with one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application should now be running at `http://localhost:3000`.

## Project Structure

Here's an overview of the project structure:

- **`src/`**: Contains all the source code.
  - **`src/components/`**: Contains reusable components.
  - **`src/assets/`**: Stores static assets like images and fonts.
  - **`src/constants/`**: Contains constant values used throughout the application.
  - **`src/pages/`**: Contains all the pages of the application.
    - **`src/pages/edit-profile/`**: Edit Profile screen.
    - **`src/pages/signin/`**: Sign In screen.
    - **`src/pages/signup/`**: Sign Up screen.
  - **`src/store/`**: Contains Zustand state management store.
    - **`useUser`**: Hook for user management (create, login, update, fetch, logout).
  - **`src/actions/`**: Contains API call functions.
    - **`create-user.ts`**: Responsible for creating a new user.
    - **`fetch-user.ts`**: Responsible for fetching user data.
    - **`login-user.ts`**: Handles user login.
    - **`update-user.ts`**: Handles user profile updates.
    - **`make-protected-api-request.ts`**: Manages requests requiring access tokens and handles token refresh.
    - **`logout.ts`**: Ends user session.
    - **`refresh-access-token.ts`**: Fetches a new access token using a refresh token.
    - **`make-api-request.ts`**: Generic function for making API requests.

## Zustand State Management

The application uses Zustand for state management. You can use the `useUser` hook from `src/store` for:

- `createUser`: To create a new user.
- `loginUser`: To log in a user.
- `updateUser`: To update user information.
- `fetchUser`: To fetch user details.
- `logoutUser`: To log out a user.

## API Integration

API calls are managed in the `src/actions/` folder. Each file in this folder handles specific actions related to user management and API requests.
