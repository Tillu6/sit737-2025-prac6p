```markdown
# 📊 SIT737 - Calculator Microservice (4.2C)

## ✨ Overview

This project extends the functionality of the calculator microservice developed in 4.1P. It adds advanced arithmetic operations such as exponentiation, square root, and modulo, along with robust error handling and Winston-based logging.

✅ Built with Node.js and Express.js  
✅ Enhanced with Winston logging  
✅ Includes industry-standard error handling concepts

🔗 GitHub Repository: https://github.com/Tillu6/sit737-2025-prac4c

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- Winston (Logging)
- Git & GitHub

---

## 🚀 Getting Started

### ✅ Prerequisites
- Install [Node.js](https://nodejs.org/en/)
- Install [Git](https://git-scm.com/)
- Optional: Use [Postman](https://www.postman.com/) or your browser for testing

### 📦 Installation & Running the App
```bash
git clone https://github.com/Tillu6/sit737-2025-prac4c
cd sit737-2025-prac4c
npm install
mkdir logs
node index.js
```

You’ll see:
```
🚀 Calculator microservice running on http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | Returns `{ status: "OK" }` |
| GET | `/add?num1=10&num2=5` | Addition |
| GET | `/subtract?num1=10&num2=5` | Subtraction |
| GET | `/multiply?num1=10&num2=5` | Multiplication |
| GET | `/divide?num1=10&num2=5` | Division |
| GET | `/power?base=2&exp=3` | Exponentiation |
| GET | `/sqrt?num=16` | Square Root |
| GET | `/mod?num1=10&num2=3` | Modulo Operation |

---

## 🧪 Sample Usage

### ✅ Valid Requests
- `GET /add?num1=7&num2=3` → `{ "result": 10 }`
- `GET /power?base=2&exp=5` → `{ "result": 32 }`
- `GET /sqrt?num=25` → `{ "result": 5 }`

### ❌ Invalid Requests
- `/add?num1=a&num2=3` → `{ "error": "Invalid numbers provided." }`
- `/divide?num1=10&num2=0` → `{ "error": "Cannot divide by zero" }`
- `/sqrt?num=-9` → `{ "error": "Invalid input for square root..." }`

---

## 📂 Logging

Using Winston, logs are saved in the `logs/` folder:

| File | Description |
|------|-------------|
| `combined.log` | All logs (info + errors) |
| `error.log` | Errors only |

### 📝 Sample Logs
```
info: Request: GET /add?num1=5&num2=3
info: Success: add => 5 & 3 = 8
error: Error: Cannot divide by zero
```

---

## 🛡️ Error Handling Strategies (Part II Report)

Included in the repo is a 1-page PDF report: `ErrorHandlingReport.pdf`, which explains:

- ✅ Circuit Breaker Pattern
- ✅ Retry Pattern
- ✅ Fallback Mechanism

These are standard microservices patterns used to increase system resilience and reliability.

---

## 🙋‍♂️ Author

- **Name:** Saketh Reddy Poreddy (GitHub: [@Tillu6](https://github.com/Tillu6))
- **Course:** SIT737 – Cloud Native Application Development
- **Task:** 4.2C – Enhanced Calculator Microservice
- **Institution:** Deakin University

---

🎓 **Thank you for checking out this project!**  
