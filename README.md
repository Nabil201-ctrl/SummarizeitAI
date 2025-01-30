# SaaS Project

## Overview
This project is a **Software-as-a-Service (SaaS) application** with **subscription-based payments** using **PayPal**. Users can **register, subscribe**, and access **AI-based document summarization** features.

## Features
- **User Authentication**: Register, login, and manage accounts.
- **Subscription System**: PayPal-based payments with multiple plans.
- **AI Document Summarization**: Upload a document and get a summarized version.
- **Secure & Scalable**: Built with **Node.js, Express, MongoDB, and EJS**.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: EJS (Embedded JavaScript Templates), CSS
- **Authentication**: Passport.js
- **Payments**: PayPal REST API
- **AI Integration**: AI summarization service

## Folder Structure
```
/project-root
│── /public               # Static files (CSS, images, client-side JS)
│   ├── /css              # Stylesheets
│   ├── /js               # Client-side JavaScript
│── /views                # EJS templates for frontend pages
│   ├── /partials         # Reusable components (header, footer)
│   ├── index.ejs         # Homepage
│   ├── dashboard.ejs     # User dashboard
│   ├── login.ejs         # Login page
│   ├── register.ejs      # Registration page
│   ├── subscription.ejs  # Subscription plans
│   ├── success.ejs       # Payment success page
│   ├── cancel.ejs        # Payment cancellation page
│── /routes               # Express route handlers
│   ├── index.js          # Main routes
│   ├── auth.js           # Authentication routes
│   ├── payments.js       # PayPal subscription routes
│   ├── ai.js             # AI Summarization routes
│── /models               # Database models (Mongoose)
│   ├── User.js           # User schema
│   ├── Subscription.js   # Subscription schema
│── /controllers          # Business logic for routes
│   ├── authController.js # Handles login, register
│   ├── paymentController.js # Handles PayPal integration
│   ├── aiController.js   # AI Summarization logic
│── /middlewares          # Middleware functions
│   ├── authMiddleware.js # Protects routes
│── /services             # External integrations (AI, email, payments)
│   ├── paypalService.js  # PayPal subscription handling
│   ├── emailService.js   # Sending emails
│   ├── aiService.js      # AI Summarization
│── /config               # Configuration files
│   ├── db.js             # Database connection
│── .env                  # Environment variables
│── server.js             # Entry point
│── package.json          # Dependencies
│── README.md             # Documentation
```

## Installation
1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up the environment**:
   Create a `.env` file in the project root and add:
   ```sh
   DB_URI=mongodb://your_db_uri_here
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_client_id_here
   PAYPAL_CLIENT_SECRET=your_client_secret_here
   SECRET_KEY=your_secret_key_here
   ```
4. **Start the server**:
   ```sh
   npm start
   ```

## Usage
- Visit `http://localhost:5000` to access the homepage.
- Register or log in to access the dashboard.
- Subscribe to a plan via PayPal.
- Upload a document for AI-based summarization.

## API Endpoints
| Method | Route             | Description |
|--------|------------------|-------------|
| GET    | `/`              | Homepage |
| GET    | `/auth/login`    | Login Page |
| POST   | `/auth/login`    | Authenticate user |
| GET    | `/auth/register` | Registration Page |
| POST   | `/auth/register` | Create a new user |
| POST   | `/payments/create` | Initiate PayPal subscription |
| GET    | `/payments/success` | Payment successful |
| GET    | `/payments/cancel` | Payment canceled |
| POST   | `/ai/summarize` | Summarize document |

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Commit changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Open a pull request.

## License
This project is licensed under the MIT License.

