# 🍽️ Plately - Restaurant Menu App

Welcome to Plately! This Front-End application allows customers to browse a restaurant menu, filter by preferences, and place orders. Administrators can manage the menu items.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/State%20Management-Redux-764ABC?logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/CSS%20Framework-Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![Custom CSS](https://img.shields.io/badge/Styling-Custom%20CSS-1572B6?logo=css3&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&logoColor=white)
![PostgREST](https://img.shields.io/badge/API%20Layer-PostgREST-1793D1?logo=postgrest&logoColor=white)
![Docker](https://img.shields.io/badge/Containerization-Docker-2496ED?logo=docker&logoColor=white)

---

## ✨ Features

*   **For Customers:** View menu, filter dishes (by course, allergies), add to cart, submit orders.
*   **For Admins:** Manage menu (add, edit, remove dishes).
*   **Technical:** Responsive design, RESTful API, user authentication.

## 📦 Prerequisites

Before you start, ensure you have these installed:

1.  [Node.js](https://nodejs.org/) 
2.  [Docker Desktop](https://www.docker.com/products/docker-desktop/) 
3.  [Git](https://git-scm.com/)

## 🚀 Quick Start Guide

Follow these steps to get Plately up and running:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Dandastino/Plately.git
    cd Plately
    ```

2.  **Environment File (`.env`):**
    This project includes a `.env` file with pre-configured settings for local development (database credentials, ports). It is used by Docker Compose.

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Start Docker Services (Database & PostgREST API):**
    This command starts PostgreSQL and PostgREST. On the first run, it also automatically creates the database tables and adds sample data using scripts in the `./database` folder.
    ```bash
    docker compose down -v && docker compose up -d
    ```
    *   **Verify services:** `docker compose ps` (Look for `plately-db-1` and `plately-api-1` running).
    *   **(Optional) View DB logs (first run):** `docker compose logs db`.

5.  **Start the Frontend Development Server (React):**
    ```bash
    npm run dev
    ```
    This usually opens Plately in your browser (e.g., `http://localhost:5173`).

**You're all set!** Plately should be running with two main processes active:
- PostgreSQL database (port 5433)
- PostgREST API (port 3000)
- React frontend (port 5173)

## 🌐 Accessing the Application & APIs

*   **Plately Frontend App:** Usually `http://localhost:5173`.
*   **PostgREST API (Direct DB access):** `http://localhost:3000`.

## 👤 Default User Accounts

*   **Admin:** Username: `admin`, Password: `admin`
*   **Customer:** Username: `user`, Password: `user`
