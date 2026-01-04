# 🐾 Tails & Treats

A full-stack food redistribution system designed to prevent food wastage by connecting restaurants with surplus food to animal shelters.  Built with Spring Boot and React, featuring JWT-based authentication and role-based access control.

![dfd](https://github.com/user-attachments/assets/51c3c3e5-75db-486c-8727-848854fd1417)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Backend Architecture](#backend-architecture)
- [Technology Stack](#technology-stack)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Screenshots](#screenshots)

## 🎯 Overview

Tails & Treats addresses two critical issues:
- **Food Waste Reduction**: Helps restaurants redistribute surplus food instead of discarding it
- **Animal Welfare**: Provides animal shelters with access to quality food donations

The platform enables restaurants to list available food donations and allows shelters to claim and track these donations through their lifecycle.

## ✨ Features

### For Restaurants
- 🍽️ Post food donations with detailed information (type, quantity, expiry)
- 📊 Track donation history and status
- 📍 Manage restaurant profile and contact information
- 🔔 Monitor which shelters have claimed donations

### For Shelters
- 🔍 Browse available food donations
- ✅ Claim donations for pickup
- 📦 Update pickup and delivery status
- 📈 View donation history

### Security & Authentication
- 🔐 JWT-based authentication
- 👥 Role-based access control (RESTAURANT/SHELTER)
- 🔒 Secure password encryption with BCrypt
- 🛡️ Protected API endpoints

## 🏗️ Backend Architecture

### Core Components

#### 1. **Models**
- **User**: Stores user information for both restaurants and shelters
  - Fields: name, email, password, userType, address, phone
  - User types: `RESTAURANT`, `SHELTER`

- **Food**: Tracks food donations through their lifecycle
  - Fields: foodName, description, quantity, foodType, animalType
  - Status tracking: `AVAILABLE` → `CLAIMED` → `PICKED_UP` → `DELIVERED` → `EXPIRED`
  - Timestamps: donationTime, claimTime, pickupTime, deliveryTime, expiryTime

#### 2. **Controllers**
- **AuthController** (`/api/auth`)
  - User registration and login
  - JWT token generation and validation
  - Session management

- **FoodController** (`/api/food`)
  - General food donation operations
  - Browse available donations
  - Status updates

- **RestaurantController** (`/api/restaurant`)
  - Create food donations
  - View restaurant-specific donations
  - Restaurant details management

- **ShelterController** (`/api/shelter`)
  - Claim available donations
  - View claimed donations
  - Update pickup/delivery status

#### 3. **Services**
- **AuthService**:  User authentication and JWT management
- **FoodService**:  Business logic for donation lifecycle management
- **RestaurantService**:  Restaurant-specific operations

#### 4. **Security Configuration**
- **JwtTokenProvider**: Token generation and validation
- **JwtAuthenticationFilter**: Request authentication filter
- **CustomUserDetailsService**: User details loading for Spring Security
- **SecurityConfig**: HTTP security configuration with CORS support

#### 5. **Repositories**
- **UserRepository**: MongoDB operations for users
- **FoodRepository**: MongoDB operations for food donations
  - Custom queries:  findByStatus, findByRestaurantId, findByShelterId

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.4.3
- **Language**: Java 17
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Spring Security
- **Password Encoding**: BCrypt
- **Validation**: Jakarta Validation API
- **Build Tool**: Maven

### Key Dependencies
```xml
- spring-boot-starter-web
- spring-boot-starter-data-mongodb
- spring-boot-starter-security
- spring-boot-starter-validation
- jjwt (JWT library) 0.11.5
- lombok 1.18.36
- spring-dotenv 4.0.0
```

### Frontend
- **Framework**: React
- **UI Library**: Bootstrap
- **Form Handling**: Formik & Yup
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Development**:  Vibe coded with Trae AI code editor using Claude 3.7 Sonnet

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Restaurant Name",
  "email": "restaurant@example.com",
  "password": "securepassword",
  "role": "RESTAURANT" // or "SHELTER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "restaurant@example.com",
  "password": "securepassword"
}

Response:
{
  "token":  "jwt_token_here",
  "id": "user_id",
  "name": "Restaurant Name",
  "email": "restaurant@example.com",
  "userType": "RESTAURANT"
}
```

#### Validate Token
```http
POST /api/auth/validate
Authorization: Bearer {token}

Response:
{
  "valid": true
}
```

### Restaurant Endpoints

#### Create Food Donation
```http
POST /api/restaurant/{restaurantId}/donate
Authorization: Bearer {token}
Content-Type: application/json

{
  "foodName": "Surplus Chicken",
  "description":  "Fresh cooked chicken",
  "quantity":  "5 kg",
  "foodType":  "Cooked Meat",
  "animalType": "Dog",
  "expiryTime": "2025-01-05T18:00:00"
}
```

#### Get Restaurant Donations
```http
GET /api/restaurant/{restaurantId}/donations
Authorization: Bearer {token}
```

#### Get Restaurant Details
```http
GET /api/restaurant/{restaurantId}/details
Authorization: Bearer {token}
```

### Shelter Endpoints

#### Get Available Donations
```http
GET /api/food/available
Authorization: Bearer {token}
```

#### Claim Donation
```http
POST /api/shelter/{shelterId}/claim/{foodId}
Authorization: Bearer {token}
```

#### Get Claimed Donations
```http
GET /api/shelter/{shelterId}/claimed
Authorization: Bearer {token}
```

#### Mark as Picked Up
```http
PUT /api/shelter/{shelterId}/pickup/{foodId}
Authorization: Bearer {token}
```

### Food Management Endpoints

#### Update Food Status
```http
PUT /api/food/{id}/status? status=DELIVERED
Authorization: Bearer {token}
```

#### Get Food by ID
```http
GET /api/food/{id}
Authorization:  Bearer {token}
```

#### Delete Food
```http
DELETE /api/food/delete/{id}
Authorization: Bearer {token}
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Maven
- MongoDB
- Node.js and npm (for frontend)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/TusharManudi/Tails_Treats.git
   cd Tails_Treats
   ```

2. **Configure MongoDB**
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string: 
     ```
     MONGODB_URI=mongodb://localhost:27017/tails_treats
     JWT_SECRET=your_jwt_secret_key
     ```

3. **Build and run the backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The frontend will start on `http://localhost:3000`

### Default Configuration
- **Backend Port**: 8080
- **Frontend Port**: 3000
- **Database**: MongoDB (default:  localhost:27017)
- **CORS**: Configured for http://localhost:3000

## 📸 Screenshots

### Home Page
![homeSS](https://github.com/user-attachments/assets/4ecf7127-8876-4b72-b21a-f1cb2f2caf4f)

### Restaurant Dashboard
![RestDash](https://github.com/user-attachments/assets/28ff7e7a-2d12-4c04-abe6-a90535e2b29c)

### Shelter Dashboard
![ShelterDash](https://github.com/user-attachments/assets/1b865652-32f3-470b-a06a-0c4d4ae8216d)


## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ to reduce food waste and support animal welfare**
