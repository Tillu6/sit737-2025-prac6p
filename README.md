# 🚀 SIT737-2025-prac5p: Containerisation of a Simple Web Application Using Docker

<div style="background-color:#0b3d91; color:#ffffff; padding:15px; text-align:center; font-family: sans-serif; font-weight: bold; border-radius: 5px;">
  <span style="font-size: 1.2em;">🚀 SIT737-2025-prac5p</span> | <span style="font-size: 1.1em;">Containerisation</span> | <span style="font-size: 1.1em;">🐳 Docker</span>
</div>

## 💡 Overview

This project **containerises** a simple web application (originally developed for the 4.2C task) using **Docker** and **Docker Compose**. It demonstrates how to build a Docker image, run containers with Compose, implement a health check, and push images to Docker Hub. The containerisation approach aligns with modern **cloud-native** practices and ensures a consistent environment across different systems.

**Key Features:**

- **Dockerfile** for building the application image  
- **docker-compose.yml** for service orchestration  
- **Health checks** to monitor container status  
- **Restart policy** for resilience  
- **Push to Docker Hub** for easy distribution

🔗 **GitHub Repository:** [https://github.com/Tillu6/sit737-2025-prac5p](https://github.com/Tillu6/sit737-2025-prac5p)

---

## ⚙️ Tech Stack

- **Node.js** (Web Application)
- **Express.js** (Optional if you use Express for routing)
- **Docker & Docker Compose** (Containerisation and orchestration)
- **Git & GitHub** (Version control and collaboration)

---

## 🏁 Getting Started

### ✅ Prerequisites

1. **Docker Desktop**:  
   - [Download & Install](https://www.docker.com/products/docker-desktop)  
   - Ensure Docker is running before you proceed.

2. **Node.js** (if you want to run locally before containerising):  
   - [Download & Install](https://nodejs.org/en/)

3. **Git**:  
   - [Download & Install](https://git-scm.com/)

---

## 📂 Project Structure

```bash
├── Dockerfile            # Instructions to build the Docker image
├── docker-compose.yml    # Docker Compose configuration for multi-container (or single service) setup
├── src/                  # Application source code (from 4.2C task)
├── package.json          # Node.js dependencies and scripts
├── README.md             # This README file
```

---

## 🚀 Usage & Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Tillu6/sit737-2025-prac5p.git
   cd sit737-2025-prac5p
   ```

2. **Build and Run the Container**  
   ```bash
   docker-compose up --build
   ```
   - This command builds the Docker image from the `Dockerfile`.
   - Then it starts the container based on the configuration in `docker-compose.yml`.

3. **Access the Application**  
   - Open your browser and visit:  
     [http://localhost:3000](http://localhost:3000)  
   - You should see your web application running successfully.

---

## 🌐 Health Check & Restart Policy

Your `docker-compose.yml` includes a **healthcheck** that verifies the container is responding on port **3000**. It does so by periodically running a `curl` command. If the container fails to respond, Docker attempts to restart it according to the `restart: on-failure` policy. This ensures **high availability** and **resilience**.

**Health Check Highlights**:
- **Interval**: 30 seconds  
- **Timeout**: 10 seconds  
- **Retries**: 3  
- **Start Period**: 5 seconds  

---

## 📤 Pushing to Docker Hub

1. **Log in to Docker Hub**  
   ```bash
   docker login
   ```
   Enter your **Docker Hub** credentials when prompted.

2. **Tag Your Image** (if not already tagged)  
   ```bash
   docker tag tillu018/sit737-2025-prac4c tillu018/sit737-2025-prac4c:latest
   ```

3. **Push the Image**  
   ```bash
   docker push tillu018/sit737-2025-prac4c:latest
   ```
   Make sure the **repository** exists on Docker Hub. If not, create it under your Docker Hub account.

---

## 🧩 Troubleshooting

| Issue                                    | Possible Fix                                                                                              |
|------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **Port 3000 already in use**             | Change the port in `docker-compose.yml` (e.g., `3001:3000`) or free up port 3000 by stopping the other process. |
| **Docker not running / Connection error**| Start or restart **Docker Desktop**, ensure you see “Docker is running.”                                   |
| **Health check fails**                   | Check container logs with `docker logs <container_id>`, ensure the app is listening on the correct port.  |
| **Push access denied**                   | Make sure you are logged in to Docker Hub and have permission to push to that repository.                 |

---

## 📝 Project History

- **Task 4.2C**: Developed the initial web application with Node.js.
- **Task 5.1P**: Containerised the application using Docker & Docker Compose, added health checks, and automated restarts.

---

## 🙋 Author

**Name:** Saketh Reddy Poreddy (GitHub: [@Tillu6](https://github.com/Tillu6))  
**Course:** SIT737 – Cloud Native Application Development  
**Institution:** Deakin University  

> **Thank you** for exploring this containerised application! If you have any feedback or suggestions, feel free to open an issue or submit a pull request.  

---  

**Happy Containerising!**  
<p align="center">
  <div style="background-color:#2496ED; color:#ffffff; padding:15px; text-align:center; font-family: sans-serif; font-weight: bold; border-radius: 5px;">
    🐳 Docker Makes It Easy! 🚀
  </div>
</p>
