# 📚 Library Management API

A RESTful API for managing a library system built with Node.js, Express, and MongoDB. It supports managing books, authors, students, and attendants, as well as borrowing and returning books.

---

## 🛠 Tech Stack

"author": "",
"license": "ISC",
"dependencies":
"bcryptjs": "^2.4.3",
"cookie-parser": "^1.4.5",
"dotenv": "^10.0.0",
"express": "^5.2.1",
"express-rate-limit": "^5.4.1",
"http-status-codes": "^2.1.4",
"jsonwebtoken": "^8.5.1",
"mongoose": "^6.0.8",
"swagger-jsdoc": "^6.2.8",
"swagger-ui-express": "^5.0.1"
"nodemon": "^2.0.9"

---

## 📁 Project Structure (MVC Pattern)

```
├── controllers/
│   ├── authorController.js
│   ├── bookController.js
│   ├── studentController.js
│   └── attendantController.js
├── models/
│   ├── Author.js
│   ├── Book.js
│   ├── Student.js
│   └── Attendant.js
├── routes/
│   ├── authorRoute.js
│   ├── bookRoute.js
│   ├── studentRoute.js
│   └── attendantRoute.js
├── middleware/
│   ├── error-handler.js
│   └── not-found.js
├── db/
│   └── connect.js
├── errors/
├── swagger.js
├── app.js
└── .env
```

---

Visit API documentation at:

```
http://localhost:5000/api-docs
```

---

## 📦 Data Models

### Author

| Field     | Type       |
| --------- | ---------- |
| name      | String     |
| bio       | String     |
| books     | [ObjectId] |
| createdAt | Date       |
| updatedAt | Date       |

### Book

| Field      | Type       |
| ---------- | ---------- |
| title      | String     |
| isbn       | String     |
| authors    | [ObjectId] |
| status     | String     |
| borrowedBy | ObjectId   |
| issuedBy   | ObjectId   |
| returnDate | Date       |
| createdAt  | Date       |
| updatedAt  | Date       |

### Student

| Field     | Type     |
| --------- | -------- |
| name      | String   |
| email     | String   |
| studentId | ObjectId |
| createdAt | Date     |
| updatedAt | Date     |

### Attendant

| Field     | Type     |
| --------- | -------- |
| name      | String   |
| staffId   | ObjectId |
| createdAt | Date     |
| updatedAt | Date     |

---

## 🔗 API Endpoints

Base URL: `/api/v1`

### Students

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | `/students`     | Create a new student |
| GET    | `/students`     | Get all students     |
| GET    | `/students/:id` | Get a single student |

#### POST `/students`

---

### Attendants

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| POST   | `/attendants` | Create a new attendant |
| GET    | `/attendants` | Get all attendants     |

#### POST `/attendants`

---

### Authors

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | `/authors`     | Create a new author |
| GET    | `/authors`     | Get all authors     |
| GET    | `/authors/:id` | Get a single author |
| PATCH  | `/authors/:id` | Update an author    |
| DELETE | `/authors/:id` | Delete an author    |

#### POST `/authors`

---

### Books

| Method | Endpoint            | Description                              |
| ------ | ------------------- | ---------------------------------------- |
| POST   | `/books`            | Create a new book                        |
| GET    | `/books`            | Get all books (with pagination & search) |
| GET    | `/books/:id`        | Get a single book                        |
| PATCH  | `/books/:id`        | Update a book                            |
| DELETE | `/books/:id`        | Delete a book                            |
| PATCH  | `/books/:id/borrow` | Borrow a book                            |
| PATCH  | `/books/:id/return` | Return a book                            |

#### POST `/books`

#### GET `/books` — Query Parameters

| Parameter | Type   | Description                              | Example          |
| --------- | ------ | ---------------------------------------- | ---------------- |
| page      | Number | Page number (default: 1)                 | `?page=2`        |
| limit     | Number | Results per page (default: 10)           | `?limit=5`       |
| title     | String | Search by title (case-insensitive)       | `?title=1984`    |
| author    | String | Search by author name (case-insensitive) | `?author=George` |

```

#### PATCH `/books/:id/return`

No request body needed.

---

## 📖 API Documentation

Interactive Swagger documentation is available at:

```

http://localhost:5000/api-docs

```

```
