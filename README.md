# 🍽️ Plately

## 👨‍💻 Front End Project 

Plately is a modern and user-friendly restaurant menu application built with React. It allows users to browse, filter, and interact with a digital menu. The app supports filtering by course and allergies, and includes a feature, for admins, to add new dishes.

## 🚀 Features

- Display a complete list of restaurant dishes
- Filter by course (appetizer, first course, main course, pizza, side, drink)
- Filter by allergy category (meat, fish, vegetarian, vegan, gluten-free, etc.)
- Smooth animations and loading indicators
- Add new dishes via a dedicated form
- Responsive design for desktop and mobile
- Backend communication through RESTful API

## 🛠️ Tech Stack

- React + React Router
- PostgREST / Supabase / PostgreSQL
- Bootstrap + React Spinners
- Custom CSS

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

**From the project’s root directory, run:**
```bash
docker-compose up -d
```

This will start two containers:
- db: PostgreSQL database
- api: PostgREST server exposing the RESTful API

### ✅ Verify the backend is running:

**Check the container status:**
```bash
docker-compose ps
```

**View backend logs:**
```bash
docker-compose logs -f api
```

### 🌐 Use the backend in the frontend:

Once running, the backend will be available at:

```bash
http://localhost:3000
```