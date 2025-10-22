# JobHunt 🚀

A full-stack application built to streamline and organize your job search process. Track applications, manage deadlines, and stay on top of your hunt with a clean, responsive UI powered by Mantine.

This project features a hybrid backend, utilizing **Node.js/Express** and **Java Spring Boot** to handle different services, all connected to a central MongoDB database.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Mantine UI](https://img.shields.io/badge/UI-Mantine-blueviolet)
![Tech](https://img.shields.io/badge/backend-Node_&_Spring-darkgreen)

> **Note:** This is a live project. Feel free to check out the [Live Demo](https://your-live-demo-link.com)! (if you have one)

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Screenshots](#screenshots)
- [Features](#features-✨)
- [Tech Stack](#tech-stack-🔧)
- [Getting Started](#getting-started-🏁)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints-⚡)
- [Contributing](#contributing-🤝)
- [License](#license-📝)
- [Contact](#contact-📬)

---

## About The Project

Job hunting is a stressful process. Juggling multiple applications, contacts, interview stages, and deadlines across different platforms is a recipe for chaos. **JobHunt** aims to be your central dashboard for this process.

It allows you to log every job you've applied for, update its status (Applied, Interviewing, Offer, Rejected), store key information, and visualize your progress.

This project leverages a powerful and flexible stack:

- A modern **React** frontend built with **Mantine UI** and **Tabler Icons**.
- A robust, distributed backend using **Node.js/Express** and **Spring Boot (Java)** to manage different parts of the application logic (e.g., user auth, job data).
- **MongoDB** as the single source of truth for the database.

---

## Screenshots

**Login Page:**
![Login Page Screenshot](https://via.placeholder.com/600x400.png?text=Your+App's+Login+Page)

**Main Dashboard:**
![Main Dashboard Screenshot](https://via.placeholder.com/600x400.png?text=Your+App's+Dashboard)

**Job Details Page:**
![Job Details Screenshot](https://via.placeholder.com/600x400.png?text=Your+App's+Job+Details+Page)

---

## Features ✨

- **Full User Authentication:** Secure registration and login (e.g., using JWT).
- **CRUD Functionality:** Create, Read, Update, and Delete job applications.
- **Status Tracking:** Easily update the status of each application (e.g., 'Applied', 'Interview', 'Offer', 'Rejected').
- **Responsive Dashboard:** A clean overview of all your applications, with stats and filters.
- **Search & Filter:** Quickly find jobs by company, position, or status.
- **Protected Routes:** User-specific data and routes that are only accessible when logged in.
- **Modern UI:** Built with **Mantine UI** component library and **Tabler Icons** for a sleek and responsive design.

---

## Tech Stack 🔧

This project is built with a combination of powerful technologies.

- **Frontend:**

  - [React.js](https://reactjs.org/)
  - [Mantine UI](https://mantine.dev/) - React component library
  - [Tabler Icons](https://tabler-icons.io/) - Icon library
  - [React Router](https://reactrouter.com/) - For client-side routing
  - [Axios](https://axios-http.com/) - For making API requests

- **Backend Service 1 (Node.js):**

  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
  - [JSON Web Tokens (JWT)](https://jwt.io/)
  - [bcrypt.js](https://github.com/kelektiv/bcrypt.js)

- **Backend Service 2 (Spring Boot):**

  - [Java](https://www.oracle.com/java/) (e.g., JDK 17)
  - [Spring Boot](https://spring.io/projects/spring-boot)
  - [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb)
  - [Spring Security](https://spring.io/projects/spring-security)
  - [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) - Build tool

- **Database:**
  - [MongoDB](https://www.mongodb.com/) (e.g., MongoDB Atlas)

---

## Getting Started 🏁

To get a local copy up and running, you will need to run **three** separate services: the React frontend, the Node.js backend, and the Spring Boot backend.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)
- **Java JDK** (e.g., JDK 11, 17, or 21)
- **Maven** or **Gradle** (depending on your Spring Boot project)
- A MongoDB database (You can use a local instance or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone [https://github.com/your_username/JobHunt.git](https://github.com/your_username/JobHunt.git)
    cd JobHunt
    ```

2.  **Set up the Node.js Backend (Server 1):**

    - Navigate to the Node.js server directory (e.g., `cd server-node`):
      ```sh
      cd server-node
      ```
    - Install NPM packages:
      ```sh
      npm install
      ```
    - Create a `.env` file and add your environment variables:
      ```env
      # .env (Node.js)
      PORT=5001
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_super_secret_jwt_key
      ```
    - Start the Node.js server:
      `sh
    npm start
    `
      Your Node.js server should now be running on `http://localhost:5001`.

3.  **Set up the Spring Boot Backend (Server 2):**

    - Navigate to the Spring Boot server directory (e.g., `cd server-spring`):
      ```sh
      cd server-spring
      ```
    - Create or update `src/main/resources/application.properties` (or `.yml`):
      ```properties
      # application.properties (Spring Boot)
      server.port=8080
      spring.data.mongodb.uri=your_mongodb_connection_string
      # Add any other required properties (e.g., JWT secrets)
      ```
    - Build and run the project (using Maven as an example):
      `sh
    ./mvnw spring-boot:run
    `
      Your Spring Boot server should now be running on `http://localhost:8080`.

4.  **Set up the Frontend (Client):**
    - Open a **new terminal** and navigate to the client directory (e.g., `cd client`):
      ```sh
      cd client
      ```
    - Install NPM packages:
      ```sh
      npm install
      ```
    - Start the React development server:
      `sh
    npm start
    `
      Your React app should now be running at `http://localhost:3000`.

> **Note:** You will need to configure your client-side API calls (e.g., in Axios) to point to the correct backend server for the correct resource (e.g., `http://localhost:5001/api/users` for auth, `http://localhost:8080/api/jobs` for job data).

---

## API Endpoints ⚡

This application uses two backend services. Please document which routes are handled by which service.

**Example: Node.js Service (Auth)**
| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/users/register` | Register a new user. |
| `POST` | `/api/users/login` | Log in a user and get a JWT. |

**Example: Spring Boot Service (Jobs)**
| HTTP Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/jobs` | Get all jobs for the logged-in user. |
| `POST` | `/api/jobs` | Create a new job application. |
| `PUT` | `/api/jobs/{id}` | Update a job application. |
| `DELETE` | `/api/jobs/{id}` | Delete a job application. |

---

## Contributing 🤝

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License 📝

Distributed under the MIT License. See `LICENSE` file for more information.

---

## Contact 📬

Ankur Kumar - [@YourTwitterHandle](https://twitter.com/YourTwitterHandle) - ankurkumar352019@gmail.com

Project Link: [https://github.com/your_username/JobHunt](https://github.com/your_username/JobHunt)
