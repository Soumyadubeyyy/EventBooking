# 🎟️ Event Booking System

A premium full-stack Event Booking System that allows users to browse events, reserve seats, manage bookings, and enjoy a modern responsive experience with secure authentication, real-time seat validation, dark/light themes, and smooth animations.

---

## 📸 Application Screenshots

### Home Page (Light Mode)

<img width="1877" height="915" alt="Home Light Mode" src="https://github.com/user-attachments/assets/f8aa40a3-5a2e-4306-83a9-f41966fb9092" />

### Home Page (Dark Mode)

<img width="1865" height="913" alt="Home Dark Mode" src="https://github.com/user-attachments/assets/38cd07a9-03c4-4dee-833c-7e06e1a63329" />

### Events Listing

<img width="1878" height="925" alt="Events Listing" src="https://github.com/user-attachments/assets/e0fa91ba-99a2-425e-b3bd-4253249059f9" />

### Authentication

<img width="1802" height="919" alt="Authentication" src="https://github.com/user-attachments/assets/placeholder" />

---

# 🚀 Features

## Authentication

* User Registration
* User Login
* User Logout
* JWT-based Authentication
* Password Hashing with Bcrypt
* Protected Routes
* Persistent User Sessions

## Event Management

* Browse Available Events
* View Event Details
* Real-time Seat Availability
* Responsive Event Cards

## Booking Management

* Book Multiple Seats
* Interactive Seat Selection Stepper
* View User Bookings
* Cancel Existing Bookings
* Automatic Seat Release on Cancellation

## User Experience

* Light & Dark Theme Support
* Fully Responsive Design
* Framer Motion Animations
* Optimistic UI Updates
* Loading Skeletons
* Toast Notifications
* Modern Premium Interface

## Engineering Enhancements

* RESTful API Architecture
* Docker Support
* Jest Testing Setup
* Environment-Based Configuration
* Modular Backend Architecture
* Error Handling & Validation

---

# 🏛️ Architecture

```text
Frontend (React + React Query)
            │
            ▼
     REST APIs (Express)
            │
            ▼
    MongoDB (Mongoose)
```

---

# 🛠️ Tech Stack

## Frontend

* React 18
* Vite
* Tailwind CSS v4
* React Router DOM
* React Query (TanStack Query)
* React Hook Form
* Zod
* Framer Motion
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt

## DevOps & Testing

* Docker
* Docker Compose
* Jest

---

# 📁 Project Structure

```text
event-booking-system/
│
├── .github/
│
├── client/
│   ├── src/
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── server/
│   ├── seed/
│   ├── src/
│   ├── tests/
│   ├── .env.example
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Prerequisites

Make sure the following are installed:

* Node.js (v18 or higher)
* MongoDB
* Docker (Optional)

---

# 🔧 Environment Variables

## Backend (`server/.env`)

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/event-booking

JWT_SECRET=super_secret_jwt_key_for_event_booking_123!
JWT_EXPIRE=30d

CLIENT_URL=http://localhost:5173
```

## Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/Soumyadubeyyy/EventBooking.git
cd EventBooking
```

## Install Backend Dependencies

```bash
cd server
npm install
```

## Install Frontend Dependencies

```bash
cd client
npm install
```

---

# 🌱 Seed Database (Optional)

Populate the database with sample events.

```bash
cd server
npm run seed
```

---

# ▶️ Running Locally

## Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## Start Frontend

```bash
cd client
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🐳 Running with Docker

## Build and Start Containers

```bash
docker-compose up --build
```

## Stop Containers

```bash
docker-compose down
```

---

# 🧪 Testing

Run backend tests:

```bash
cd server
npm test
```

---

# 📚 API Documentation

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout User

```http
POST /api/auth/logout
```

### Get Current User

```http
GET /api/auth/me
```

---

## Event APIs

### Get All Events

```http
GET /api/events
```

Returns all available events.

### Get Event Details

```http
GET /api/events/:id
```

Returns details of a specific event.

---

## Booking APIs

### Create Booking

```http
POST /api/bookings
```

Request Body:

```json
{
  "eventId": "event_id",
  "seats": 2
}
```

Creates a new booking if seats are available.

### Get User Bookings

```http
GET /api/bookings/my
```

Returns all bookings belonging to the authenticated user.

### Cancel Booking

```http
PATCH /api/bookings/:id/cancel
```

Cancels an existing booking and releases reserved seats.

---

# 🗄️ Database Schema

## User

```javascript
{
  name: String,
  email: String,
  password: String
}
```

## Event

```javascript
{
  name: String,
  description: String,
  dateTime: Date,
  venue: String,
  totalSeats: Number,
  availableSeats: Number,
  category: String,
  imageUrl: String
}
```

## Booking

```javascript
{
  user: ObjectId,
  event: ObjectId,
  seatsBooked: Number,
  status: String,
  createdAt: Date
}
```

---

# ✅ Validation & Error Handling

The application includes:

* Frontend Validation using Zod
* Backend Validation using Mongoose
* Meaningful Error Responses
* Protected Routes
* Invalid Request Handling
* Seat Availability Validation
* Prevention of Overbooking
* Centralized Error Handling

---

# 🏗️ Design Decisions

## JWT Authentication

Authentication is implemented using JWT tokens stored in HTTP-only cookies. This prevents client-side JavaScript from accessing authentication tokens and improves security.

## React Query

React Query manages server state, caching, background synchronization, and optimistic updates, creating a fast and responsive user experience.

## Seat Availability Protection

The backend validates seat availability before finalizing bookings. This prevents race conditions and ensures users cannot reserve more seats than are available.

## Modular Backend Architecture

Controllers, routes, models, and middleware are separated into dedicated modules, improving maintainability and scalability.

## Responsive UI

The application follows a mobile-first approach and works seamlessly across desktop, tablet, and mobile devices.

---

# 📌 Assumptions

* Each booking belongs to one user and one event.
* Users can make multiple bookings for the same event.
* Users can reserve multiple seats in a single booking.
* Authentication is required for all booking operations.
* Event inventory updates immediately after booking creation or cancellation.
* Events are pre-populated through database seeding.

---

# 🔒 Security Measures

* Password Hashing using Bcrypt
* JWT Authentication
* HTTP-only Cookies
* Protected Routes
* Frontend Validation
* Backend Validation
* Server-side Seat Verification
* Secure Error Handling

---

# 🌟 Additional Enhancements

* Dark / Light Theme Support
* Optimistic UI Updates
* Framer Motion Animations
* Responsive Design
* Loading Skeletons
* Toast Notifications
* Dockerized Setup
* Automated Testing



# ✨ Highlights

* Full Stack Architecture
* Secure Authentication
* Real-time Seat Validation
* Responsive Design
* Dark & Light Themes
* Optimistic UI Updates
* Dockerized Deployment
* Automated Testing
* RESTful APIs
* Production-Oriented Code Structure

---

