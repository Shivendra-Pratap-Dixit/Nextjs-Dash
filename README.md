

# Next.js Authentication with Node.js Backend

This repository contains a simple authentication system built using Next.js for the frontend and a Node.js backend. It utilizes cookies for authentication and MongoDB for storing user data.

## Frontend (Next.js)

### Technologies Used:
- Next.js

### Setup Instructions:
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Install dependencies using `npm install`.
4. Run the development server using `npm run dev`.

### Features:
- User authentication with cookies.
- Protected routes.
- Sign up, login, and logout functionality.

## Backend (Node.js)

### Technologies Used:
- Node.js
- Express.js
- MongoDB

### Setup Instructions:
1. Navigate to the `backend` directory.
2. Install dependencies using `npm install`.
3. Configure environment variables (see `.env.example`).
4. Run the server using `npm start`.

### API Endpoints:
- `POST /register`: Create a new user.
- `POST /login`: Login and authenticate user.
- `GET /logout`: Logout user.

## MongoDB Setup:
1. Install MongoDB locally or use a cloud-based MongoDB service.
2. Configure the MongoDB connection string in your environment variables.

## Environment Variables:
- `MongoDBURI`: MongoDB connection string.
- `SECRET`: Secret key for JWT token generation.

## Contributing:
Contributions are welcome! Please open an issue or submit a pull request.

## License:
This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize the README according to your project's specific details and requirements.
