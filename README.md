# 🍽️ Plately

## 👨‍💻 Project Overview

Plately is a modern and user-friendly restaurant menu application built with React. It allows customers to browse and order food and drinks independently without waiter assistance. The application features menu filtering for allergies and dietary preferences. Customers can add desired dishes to their cart and submit orders when ready.

Administrators have additional capabilities to manage the menu, including adding new dishes, modifying existing ones, and removing items.

## 🚀 Features

### Customer Features
- Complete restaurant menu display
- Course-based filtering (appetizers, first courses, main courses, pizza, sides, drinks)
- Allergy and dietary preference filtering (meat, fish, vegetarian, vegan, gluten-free)
- Shopping cart functionality
- Order submission system
- Real-time menu updates

### Admin Features
- Menu management dashboard
- Add new dishes with detailed information
- Modify existing menu items
- Remove items from the menu

### Technical Features
- Smooth animations and loading indicators
- Responsive design for all devices
- RESTful API integration
- Real-time updates
- Secure authentication system

## 🛠️ Technologies

### Frontend
- React 
- Custom CSS
- Bootstrap
- Redux

### Basic Backend
- PostgreSQL
- PostgREST
- Docker
- RESTful API

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Dandastino/Plately.git
   cd Plately
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🐳 Backend Setup with Docker

Start the backend containers using Docker:

**Make sure you have docker on your device:**
```bash
docker --version
```

**From the project's root directory, run:**
```bash
docker compose up -d
```

This will start two containers:
- `db`: PostgreSQL database
- `api`: PostgREST server exposing the RESTful API


### ✅ Verify the backend is running:

**Check the container status:**
```bash
docker compose ps
```

**View backend logs:**
```bash
docker compose logs -f api
```

### 🌐 Backend Access

Once running, the backend will be available at:
```
http://localhost:3000
```

## 👥 User Access

The application provides two types of user access:

### Admin Access
- Username: "admin"
- Password: "admin"
- Full access to menu management and order tracking

### Customer Access
- Username: "user"
- Password: "user"
- Access to menu browsing and ordering


## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
