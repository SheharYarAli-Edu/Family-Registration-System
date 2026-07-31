# Family Registration System

A full-stack family registration system with user authentication, family and sub-family management, and a responsive frontend dashboard.

## Project Overview

This project is split into two main parts:

- `backend/` - Node.js + Express API with MongoDB via Mongoose
- `frontend/` - Static HTML, CSS, and JavaScript client for registration, login, and family tree display

## Features

- User registration and login with JWT authentication
- Protected API routes for families and users
- Family creation with optional sub-family details
- Access control by user role (`super_admin`, `family_head`, `sub_member`)
- Frontend dashboard for registration, family tree viewing, and contact form

## Backend

### Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator

### Key Files

- `backend/server.js` - Express server entrypoint
- `backend/config/db.js` - MongoDB connection helper
- `backend/middleware/auth.js` - JWT protection and role authorization
- `backend/models/User.js` - User schema and password hashing
- `backend/models/Family.js` - Family + sub-family schema
- `backend/routes/auth.js` - Authentication routes
- `backend/routes/families.js` - Family CRUD routes
- `backend/routes/users.js` - User read routes

### Environment Variables

Create a `.env` file inside `backend/` with the following values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/family_registration
JWT_SECRET=your_jwt_secret_here
```

### Install and Run Backend

From `backend/`:

```bash
npm install
npm run dev
```

or

```bash
npm start
```

This starts the API server on `http://localhost:5000` by default.

### API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/auth/me` - Get current authenticated user
- `GET /api/families` - Get all families (requires `super_admin`)
- `GET /api/families/:id` - Get a single family
- `POST /api/families` - Create a new family
- `PUT /api/families/:id` - Update a family
- `POST /api/families/:id/subfamilies` - Add a sub-family
- `GET /api/users` - Get all users (requires `super_admin`)
- `GET /api/users/:id` - Get a single user

## Frontend

### Technologies

- HTML
- CSS
- JavaScript

### Key Files

- `frontend/index.html` - Main application UI
- `frontend/css/style.css` - Styles for layout and responsive design
- `frontend/js/api.js` - API service wrapper for backend requests
- `frontend/js/auth.js` - Authentication handling and UI state
- `frontend/js/app.js` - Page navigation, registration forms, and family tree interactions

### Frontend Behavior

- Displays a multi-section page with home, registration, family tree, contact, and about sections
- Opens login/register modal dialogs for authentication
- Uses `localStorage` to store JWT tokens and authenticated user details
- Loads family tree data for authenticated users
- Submits family registration to the backend

## Usage

1. Start the backend server.
2. Open `frontend/index.html` in a browser.
3. Register a new account or login with an existing account.
4. Register a family and optionally add sub-families.
5. Use the `My Family` section to view registered family details.

## Notes

- The backend uses dynamic JWT secret fallback to `secretkey123` if `JWT_SECRET` is not provided. For production, always set `JWT_SECRET`.
- The app assumes the backend runs at `http://localhost:5000`. Update `frontend/js/api.js` if the backend URL changes.
- `familyId` is assigned to the user after creating a family.

## Future Improvements

- Add form validation on the frontend
- Create a complete user management and family membership flow
- Improve error handling and notifications
- Add role-based UI elements and admin dashboard pages
- Deploy backend and frontend to a hosting platform
