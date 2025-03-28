```markdown
# 📊 SIT737 - Building a Microservice  (Task 4.1P)

## 🧠 Overview

This project is a simple calculator microservice built using Node.js, Express, and Winston. It supports basic arithmetic operations— addition, subtraction, multiplication, and division —and exposes them through RESTful API endpoints.

It also includes robust logging using Winston to track all incoming requests and errors.

---

## 🚀 Getting Started

### 🔧 Prerequisites
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- Code Editor (e.g., [VS Code](https://code.visualstudio.com/))

### 📦 Installation
```bash
git clone https://github.com/Tillu6/sit737-2025-prac4p
cd sit737-2025-prac4p
npm install
```

### ▶️ Running the App
```bash
node index.js
```

You’ll see output like:
```
info: Calculator microservice running on http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| GET    | `/`                           | Welcome message          |
| GET    | `/health`                     | Health check status      |
| GET    | `/add?num1=10&num2=5`         | Returns 15               |
| GET    | `/subtract?num1=10&num2=5`    | Returns 5                |
| GET    | `/multiply?num1=10&num2=5`    | Returns 50               |
| GET    | `/divide?num1=10&num2=5`      | Returns 2                |

---

## 🧪 Example Test Cases

### ✅ Valid Input

```bash
http://localhost:3000/add?num1=5&num2=3
```
**Response:**
```json
{ "result": 8 }
```

### ❌ Invalid Input

```bash
http://localhost:3000/add?num1=a&num2=5
```
**Response:**
```json
{ "error": "Invalid numbers provided." }
```

```bash
http://localhost:3000/divide?num1=10&num2=0
```
**Response:**
```json
{ "error": "Cannot divide by zero" }
```

---

## 🛠 Logging (Using Winston)

Winston logs are saved in the `logs/` directory:

| File Name        | Description                         |
|------------------|-------------------------------------|
| `combined.log`   | All info + error logs               |
| `error.log`      | Only errors                         |

### 🔍 Sample Logs

**combined.log**
```
info: Calculator microservice running on http://localhost:3000
info: Request: GET /add?num1=5&num2=2
info: Success: add => 5 & 2 = 7
```

**error.log**
```
error: Error: Cannot divide by zero
```

---

## 📁 Project Structure

```
calculator-microservice/
│
├── index.js           # Main server file with API routes
├── logger.js          # Winston logger setup
├── logs/
│   ├── combined.log   # All logs
│   └── error.log      # Error logs only
└── README.md          # Documentation
```

---

## 🙋‍♂️ Author

- **Name:** Saketh Reddy Poreddy  
- **Course:** SIT737 / SIT323 - Cloud Native App Dev  
- **Task:** 4.1P - Building a Microservice  
- **Institution:** Deakin University  

