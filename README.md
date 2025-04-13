# SIT737 2025 Practical 6P: Deploying a Containerized Node.js App with Kubernetes

[![Technologies](https://img.shields.io/badge/Tech-Node.js%20%7C%20Docker%20%7C%20Kubernetes-success)](https://kubernetes.io/)
[![Prerequisites](https://img.shields.io/badge/Requires-Git%2C%20Node%2C%20Docker%2C%20kubectl-orange)](https://github.com/Tillu6/sit737-2025-prac6p#prerequisites)
[![Based On](https://img.shields.io/badge/Based%20On-Prac5P-informational)](https://github.com/Tillu6/sit737-2025-prac5p)

---

## 🚀 Overview

Welcome to **SIT737 2025 Practical 6P**! This project demonstrates deploying a containerized Node.js application using Kubernetes, building directly on the Docker container created in [Practical 5P](https://github.com/Tillu6/sit737-2025-prac5p).

The primary goal is to understand and implement fundamental Kubernetes concepts like **Deployments** and **Services** to orchestrate and expose your application within a local Kubernetes cluster (Minikube or Docker Desktop Kubernetes). This provides a foundation for scalable, resilient application deployment in cloud-native environments.

**Architecture:**

```mermaid
graph LR
    A[Developer] --> B(Git Repository);
    B -- Clone --> C{Local Machine};
    C -- Build Image --> D(Docker);
    D -- Push Image --> E(Docker Hub / Registry);
    C -- Apply YAML --> F(kubectl CLI);
    F -- Interact --> G{Kubernetes Cluster};
    G -- Pull Image --> E;
    G -- Creates --> H(Deployment);
    H -- Manages --> I(Pods running Node.js App);
    G -- Creates --> J(Service);
    J -- Exposes --> I;
    K[End User] -- Access --> J;
````

*(Diagram showing the workflow from code to deployed application)*

-----

## ✨ Features

  - **Containerized Node.js App:** Utilizes the Docker image built in Prac5P.
  - **Kubernetes Deployment:** Manages application replicas and updates using a Kubernetes `Deployment`.
  - **Kubernetes Service Exposure:** Exposes the application externally using a Kubernetes `Service` (NodePort type).
  - **Scalability:** Demonstrates scaling the application horizontally by adjusting replica count.
  - **Declarative Configuration:** Uses YAML files for defining Kubernetes resources (`deployment.yaml`, `service.yaml`).
  - **Step-by-Step Guidance:** Clear instructions for setup, deployment, and verification.

-----

## 📋 Table of Contents

  - [🚀 Overview](https://www.google.com/search?q=%23-overview)
  - [✨ Features](https://www.google.com/search?q=%23-features)
  - [📋 Table of Contents](https://www.google.com/search?q=%23-table-of-contents)
  - [🔧 Prerequisites](https://www.google.com/search?q=%23-prerequisites)
  - [⚙️ Setup and Installation](https://www.google.com/search?q=%23%EF%B8%8F-setup-and-installation)
      - [1. Clone the Repository](https://www.google.com/search?q=%231-clone-the-repository)
      - [2. Prepare Docker Image](https://www.google.com/search?q=%232-prepare-docker-image)
      - [3. Set Up Local Kubernetes Cluster](https://www.google.com/search?q=%233-set-up-local-kubernetes-cluster)
      - [4. Deploy Application to Kubernetes](https://www.google.com/search?q=%234-deploy-application-to-kubernetes)
  - [💡 Usage](https://www.google.com/search?q=%23-usage)
  - [📸 Screenshots](https://www.google.com/search?q=%23-screenshots)
  - [🤔 Troubleshooting](https://www.google.com/search?q=%23-troubleshooting)
  - [🧹 Cleanup](https://www.google.com/search?q=%23-cleanup)
  - [📄 License](https://www.google.com/search?q=%23-license)
  - [🙏 Acknowledgements](https://www.google.com/search?q=%23-acknowledgements)

-----

## 🔧 Prerequisites

Ensure you have the following tools installed and configured on your system:

  - **Git:** For cloning the repository. ([Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
  - **Node.js & npm:** Required for the underlying application (if modifying Prac5P code). ([Installation Guide](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))
  - **Docker Desktop:** For building container images and optionally running a local Kubernetes cluster. ([Installation Guide](https://docs.docker.com/desktop/install/windows-install/))
  - **kubectl:** The Kubernetes command-line tool. ([Installation Guide](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/))
  - **A Local Kubernetes Cluster:** Choose one:
      - **Docker Desktop Kubernetes:** Enable via Docker Desktop settings (Settings → Kubernetes → Enable Kubernetes). Easiest if already using Docker Desktop.
      - **Minikube:** A popular tool for running a single-node Kubernetes cluster locally. ([Installation Guide](https://minikube.sigs.k8s.io/docs/start/))
  - **VS Code (Recommended):** A code editor with excellent Docker and Kubernetes extensions. ([Download](https://code.visualstudio.com/))

-----

## ⚙️ Setup and Installation

### 1\. Clone the Repository

```bash
git clone https://github.com/Tillu6/sit737-2025-prac6p.git
cd sit737-2025-prac6p
```

### 2\. Prepare Docker Image

This practical assumes you have a working Docker image for your Node.js application from Prac5P.

**Important:** Kubernetes needs to pull this image. Ensure:
a) You've built the image.
b) You've pushed it to a registry like Docker Hub (and it's public), OR your local Kubernetes cluster is configured to use local images (e.g., via `minikube image load` or Docker Desktop's integrated environment).

**Option A: Use a Pre-built Image from Docker Hub** (Recommended for Simplicity)

  - **Choose a consistent image name:**
  - **Build & Push (Do this in your Prac5P project folder if needed):**
    ```bash
    # Login to Docker Hub (only need to do this once per session)
    docker login

    # Build the image (use your Prac5P Dockerfile)
    # Example: docker build -t your-dockerhub-username/sit737-nodeapp:prac5p-v1.0 .
    docker build -t tillu018/sit737-nodeapp:prac5p-v1.0 . # Adapt this line!

    # Push the image to Docker Hub
    # Example: docker push your-dockerhub-username/sit737-nodeapp:prac5p-v1.0
    docker push tillu018/sit737-nodeapp:prac5p-v1.0 # Adapt this line!
    ```
  - **Update YAML:** Ensure the `image:` field in `deployment.yaml` matches the image name you pushed (e.g., `tillu018/sit737-nodeapp:prac5p-v1.0`).

**Option B: Build Image Locally and Load into Minikube (If using Minikube)**

  - Build the image with a simple name:
    ```bash
    # Make sure your terminal is configured to use Minikube's Docker daemon
    eval $(minikube -p minikube docker-env) # On Linux/macOS/WSL
    # minikube -p minikube docker-env | Invoke-Expression # On PowerShell

    # Build the image (use your Prac5P Dockerfile)
    docker build -t sit737-nodeapp:local .

    # Unset Minikube Docker environment (optional, good practice)
    eval $(minikube -p minikube docker-env -u) # On Linux/macOS/WSL
    # minikube -p minikube docker-env -u | Invoke-Expression # On PowerShell
    ```
  - **Update YAML:** Ensure `deployment.yaml` uses `image: sit737-nodeapp:local` and set `imagePullPolicy: Never` or `IfNotPresent`.

**(Optional) Test Locally with Docker:** Before deploying to Kubernetes, verify the image runs correctly:

```bash
# Replace with your actual image name/tag
docker run --rm -p 3000:3000 tillu018/sit737-nodeapp:prac5p-v1.0
```

Access it at `http://localhost:3000`. Stop the container with `Ctrl+C`.

### 3\. Set Up Local Kubernetes Cluster

**Verify kubectl Installation:**

```bash
kubectl version --client
```

**Start and Verify Your Chosen Cluster:**

**Option A: Docker Desktop Kubernetes**

1.  Ensure Kubernetes is enabled in Docker Desktop Settings.
2.  Wait for the status indicator (bottom left) to turn green.
3.  Verify connection:
    ```bash
    kubectl cluster-info
    kubectl get nodes
    ```

**Option B: Minikube**

1.  Start Minikube (adjust driver if needed, e.g., `--driver=docker` or `--driver=hyperv` if on Win Pro):
    ```bash
    minikube start
    ```
2.  Verify connection:
    ```bash
    kubectl cluster-info
    kubectl get nodes
    ```

### 4\. Deploy Application to Kubernetes

Review the provided Kubernetes manifest files: `deployment.yaml` and `service.yaml`.

**`deployment.yaml`:** Defines the desired state for your application pods.

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app-deployment # Name of the Deployment object
spec:
  replicas: 2 # Start with 2 instances (Pods) of the application
  selector:
    matchLabels:
      app: node-app # Selects Pods with this label
  template: # Blueprint for creating Pods
    metadata:
      labels:
        app: node-app # Label applied to Pods created by this Deployment
    spec:
      containers:
      - name: node-app-container # Name of the container within the Pod
        # IMPORTANT: Use the correct image name you built/pushed!
        image: tillu018/sit737-nodeapp:prac5p-v1.0
        # imagePullPolicy: IfNotPresent # Uncomment if using a local image without registry
        ports:
        - containerPort: 3000 # Port the application listens on INSIDE the container
```

**`service.yaml`:** Exposes your application pods via a stable network endpoint.

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: node-app-service # Name of the Service object
spec:
  type: NodePort # Exposes the service on each Node's IP at a static port
  selector:
    app: node-app # Selects Pods with this label to forward traffic to
  ports:
    - protocol: TCP
      port: 80 # Port the Service listens on *within* the cluster
      targetPort: 3000 # Port on the Pods (containerPort) to forward traffic to
      nodePort: 30007 # Static port exposed on the Node (must be 30000-32767)
      # IMPORTANT: Choose a NodePort that's likely free on your system
```

**Apply the Manifests:**

```bash
# Apply the deployment configuration
kubectl apply -f deployment.yaml

# Apply the service configuration
kubectl apply -f service.yaml
```

**Verify Deployment:**

```bash
# Check if Pods are running (wait a minute if they are Pending/ContainerCreating)
kubectl get pods -l app=node-app -o wide

# Check if the Deployment is successful
kubectl get deployment node-app-deployment

# Check if the Service is created and has an assigned NodePort
kubectl get service node-app-service
```

-----

## 💡 Usage

**Accessing the Application:**

The `NodePort` service type makes your application accessible via `NODE_IP:NODE_PORT`.

  - **If using Docker Desktop K8s:** Access via `http://localhost:30007` (using the `nodePort` specified in `service.yaml`).
  - **If using Minikube:**
    1.  Get the Minikube IP: `minikube ip`
    2.  Access via `http://<MINIKUBE_IP>:30007` (using the `nodePort` specified in `service.yaml`).
    3.  *Alternatively*, use the Minikube shortcut:
        ```bash
        minikube service node-app-service
        ```
        This will automatically open the application URL in your browser.

**Scaling the Application:**

  - **Method 1: Edit `deployment.yaml`**

    1.  Change the `replicas:` value in `deployment.yaml`.
    2.  Re-apply the configuration: `kubectl apply -f deployment.yaml`

  - **Method 2: Use `kubectl scale` command**

    ```bash
    # Scale up to 3 replicas
    kubectl scale deployment node-app-deployment --replicas=3

    # Check the result
    kubectl get pods -l app=node-app
    ```

**Viewing Logs and Details:**

```bash
# Get logs from all pods managed by the deployment
kubectl logs -l app=node-app

# Get logs from a specific pod (get pod name from 'kubectl get pods')
# kubectl logs <specific-pod-name>

# Describe the deployment status and events
kubectl describe deployment node-app-deployment

# Describe the service configuration
kubectl describe service node-app-service

# Describe a specific pod for detailed events/status
# kubectl describe pod <specific-pod-name>
```

-----

## 📸 Screenshots

*(**Important:** Replace these placeholders with your actual screenshots\!)*

<div align="center">

**1. Application Running via Docker (`localhost:3000`)**

<img width="676" alt="test" src="https://github.com/user-attachments/assets/01371594-616d-40b7-bd92-cbd64be5a73d" />

**2. Kubernetes Resources Status (`kubectl get pods,svc,deployment`)**

<img width="959" alt="1" src="https://github.com/user-attachments/assets/3a6a988f-c3aa-48fe-af46-bc16187f68fb" />

</div>

-----

## 🤔 Troubleshooting

  - **Pods stuck in `Pending`:**
      - Cluster might lack resources (CPU/Memory). Check `kubectl describe node <node-name>`.
      - (Minikube) Try stopping (`minikube stop`), increasing resources (`minikube config set memory 4096`), and starting again (`minikube start`).
  - **Pods in `ImagePullBackOff` or `ErrImagePull`:**
      - **Check Image Name:** Double-check the `image:` value in `deployment.yaml` matches your pushed image *exactly* (including tag).
      - **Public Repository:** Ensure the image exists on Docker Hub and is public. Try `docker pull <image-name>` manually.
      - **Private Repository:** If private, you need to configure image pull secrets in Kubernetes. ([Docs](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/))
      - **Local Image (Minikube):** Ensure you loaded the image correctly (`minikube image load ...`) or built using `eval $(minikube docker-env)`. Set `imagePullPolicy: Never` or `IfNotPresent` in `deployment.yaml`.
      - **Network Issues:** Ensure your Kubernetes cluster nodes can reach the image registry.
      - **Details:** `kubectl describe pod <pod-name>` often shows the specific pull error.
  - **Pods in `CrashLoopBackOff`:**
      - The application inside the container is starting and then crashing repeatedly.
      - Check logs: `kubectl logs <pod-name>`. Look for application errors (e.g., missing environment variables, incorrect port binding inside the app, database connection issues).
      - Test the Docker image locally again (`docker run ...`) to see if it crashes there too.
  - **Cannot Access Application via NodePort (`localhost:30007` or `MINIKUBE_IP:30007`):**
      - **Check Service:** Verify `kubectl get svc node-app-service` shows the correct `TYPE` (NodePort) and `PORT(S)` (e.g., `80:30007/TCP`).
      - **Check Service Selector:** Ensure the Service's `selector` (`app: node-app`) matches the Pods' labels (`kubectl get pods --show-labels`).
      - **Check Pod Status:** Are the pods running? `kubectl get pods -l app=node-app`. If not, troubleshoot the pods first.
      - **Check `targetPort`:** Does the Service's `targetPort` (3000) match the `containerPort` in the Deployment?
      - **Firewall:** A local firewall might be blocking the NodePort (30007).
      - **(Minikube) Use `minikube service`:** Try `minikube service node-app-service` as it handles IP/port mapping automatically.
      - **Check Endpoint:** `kubectl get endpoints node-app-service`. Does it list the internal IPs of your running pods? If not, the selector might be wrong.
  - **`error: deployment.apps "node-app-deployment" not found` (or similar for service):**
      - Ensure you are in the correct directory (`cd sit737-2025-prac6p`).
      - Check for typos in the resource name or filename.
      - Verify the resource was actually created (`kubectl get deployments`, `kubectl get services`).

-----

## 🧹 Cleanup

To remove the Kubernetes resources created by this practical:

```bash
# Delete the service
kubectl delete -f service.yaml

# Delete the deployment (this will also delete the pods)
kubectl delete -f deployment.yaml

# Verify deletion (should return 'No resources found')
kubectl get pods,services,deployments -l app=node-app
```

If using Minikube, you can stop or delete the cluster:

```bash
# Stop the cluster (preserves state for next start)
minikube stop

# Delete the cluster (removes all state)
minikube delete
```

-----

## 🙏 Acknowledgements

  - Guidance and resources provided by the **SIT737 teaching team** at Deakin University.
  - The comprehensive documentation from the **Kubernetes** and **Docker** communities.
  - Inspiration from standard cloud-native deployment practices.

-----

*Happy Cloud Deploying\!*
