# 🍽️ Plately - Restaurant Menu App

Welcome to Plately! This application allows customers to browse a restaurant menu, filter by preferences, and place orders. Administrators can manage the menu items.

## ✨ Features

*   **For Customers:** View menu, filter dishes (by course, allergies), add to cart, submit orders.
*   **For Admins:** Manage menu (add, edit, remove dishes).
*   **Technical:** Responsive design, RESTful API, user authentication.

## 🛠️ Tech Stack

*   **Frontend:** React, Redux, Bootstrap, Custom CSS
*   **Backend:** Node.js, Express, PostgreSQL (Database via Docker)
*   **API Layers:** PostgREST, Custom Express API (`server.js`)
*   **Containerization:** Docker, Docker Compose

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
    This project includes a `.env` file with pre-configured settings for local development (database credentials, ports). It is used by both Docker Compose and the Node.js server.
    *   You can review this file. For `server.js` to connect to the Dockerized database, `DB_HOST` should be `localhost` and `DB_PORT` should be `5433`.

    *   **Note on `.env` files:** Typically, `.env` files are not committed to Git for security. For this project's local development setup with default credentials, it's included for convenience. For production or sensitive data, always use a `.env.example` and add `.env` to `.gitignore`.


3.  **Install Dependencies:**
    This single command installs all necessary packages for both the React frontend and the Node.js backend (`server.js`).
    ```bash
    npm install
    ```


4.  **Start Docker Services (Database & PostgREST API):**
    This command starts PostgreSQL and PostgREST. On the first run, it also automatically creates the database tables and adds sample data using scripts in the `./database` folder.
    ```bash
    docker compose up -d
    ```
    *   **Verify services:** `docker compose ps` (Look for `plately-db-1` and `plately-api-1` running).
    *   **(Optional) View DB logs (first run):** `docker compose logs db`.


5.  **Start the Backend Application Server (Node.js):**
    Open a **new terminal window/tab**  and run:
    ```bash
    npm run start:server 
    ```


6.  **Start the Frontend Development Server (React):**
    Open another **new terminal window/tab** and run:
    ```bash
    npm run dev
    ```


## 🌐 Accessing the Application & APIs

*   **Plately Frontend App:** Usually `http://localhost:5173`.
*   **Node.js Custom API (`server.js`):** `http://localhost:3001`.
*   **PostgREST API (Direct DB access):** `http://localhost:3000`.

## 👤 Default User Accounts

*   **Admin:** Username: `admin`, Password: `admin`
*   **Customer:** Username: `user`, Password: `user`

