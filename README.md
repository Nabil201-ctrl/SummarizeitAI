# SUMMARIZE IT AI

## Overview

Halal MultiService is a SaaS platform that provides AI-powered summarization, adaptive learning, interactive PDF markup, and gamification features. It offers a subscription-based model with PayPal integration, Google authentication, and advanced tracking of user performance.

## Features

- **AI-Powered Summarization & Question Generation**: Upload PDFs and generate summaries along with practice questions.
- **Adaptive Learning**: Adjust question difficulty based on user performance.
- **Gamification**: Leaderboards, streaks, daily challenges, and rewards for engagement.
- **Smart Study Planner**: AI-driven study schedules based on exam dates and revision timelines.
- **Interactive PDF Markup**: Highlight, annotate, and generate flashcards from PDFs.
- **Voice Input & Speech Analysis**: Answer questions using voice and receive pronunciation feedback.
- **Subscription-Based Access**: Paid plans with exclusive learning benefits and discounts for long-term subscribers.
- **Payment & Invoice Management**: PayPal integration for subscriptions, invoice downloads, and payment tracking.

## Tech Stack

- **Frontend**: EJS, CSS, JavaScript (Chart.js for analytics)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Google OAuth & JWT
- **Payment Integration**: PayPal API

## Installation

### Prerequisites

- Node.js & npm installed
- MongoDB running
- PayPal developer account (for payment integration)
- Google Developer Console setup (for OAuth)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/halal-multiservice.git
   cd SummarizeitAI
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=<your_mongodb_connection>
   SESSION_SECRET=<your_secure_session_secret>
   JWT_SECRET=<your_secure_jwt_secret>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
   PAYPAL_CLIENT_ID=<your_paypal_client_id>
   PAYPAL_CLIENT_SECRET=<your_paypal_client_secret>
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Routes

### Authentication

- `POST /auth/login` - Login with email/password
- `GET /auth/google` - Google OAuth login
- `GET /auth/logout` - Logout user

### AI Features

- `POST /ai/summarize` - Generate a summary from an uploaded PDF
- `POST /ai/generate-questions` - Generate practice questions

### Payments

- `POST /payment/subscribe` - Subscribe to a plan
- `GET /payment/history` - View past payments & invoices

### Gamification

- `GET /gamification/leaderboard` - View top users
- `POST /gamification/streak` - Track learning streaks

## Contributors

- **Abubakar Nabil** - Lead Developer

## License

This project is licensed under the MIT License.

## Contact

For inquiries, email: [support@halalmultiservice.com](mailto\:support@halalmultiservice.com)



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

