# CI/CD Deployment Assignment - Flask and Express on EC2 using Jenkins

## Project Overview

This project demonstrates the deployment of a Flask backend and an Express frontend on a single Amazon EC2 instance. A CI/CD pipeline is implemented using Jenkins to automatically deploy the latest code whenever changes are pushed to GitHub.

## GitHub Repository Links

Flask Backend:
https://github.com/mohithambore/Assignment8_Terraform_AWS/tree/main/flask-backend

Express Frontend:
https://github.com/mohithambore/Assignment8_Terraform_AWS/tree/main/express-frontend

## Architecture

```text
GitHub Repository
      |
      | Push Event
      v
GitHub Webhook
      |
      v
Jenkins on EC2 :8080
      |
      | Pull latest code
      | Install dependencies
      | Restart application using PM2
      v
Single EC2 Instance
      |
      |-- Flask Backend :5000
      |-- Express Frontend :3000
      |-- Jenkins :8080
```

## Technologies Used

* AWS EC2
* Ubuntu 26.04 LTS
* Flask
* Express.js
* Node.js
* Python
* Jenkins
* GitHub Webhook
* PM2
* Git

## EC2 Instance Setup

An Ubuntu EC2 instance was launched with the following inbound security group rules:

| Port | Purpose          |
| ---- | ---------------- |
| 22   | SSH              |
| 3000 | Express Frontend |
| 5000 | Flask Backend    |
| 8080 | Jenkins          |

## Installed Dependencies

```bash
sudo apt update
sudo apt install git python3 python3-pip python3-venv nodejs npm -y
sudo npm install -g pm2
sudo apt install fontconfig openjdk-21-jre -y
```

Jenkins was installed using the official Jenkins `.deb` package.

## Flask Backend Deployment

```bash
cd ~/Assignment8_Terraform_AWS/flask-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pm2 start venv/bin/python --name flask-backend -- app.py
```

Flask backend is accessible at:

```text
http://13.232.218.144:5000/api
```

## Express Frontend Deployment

```bash
cd ~/Assignment8_Terraform_AWS/express-frontend
npm install
pm2 start app.js --name express-frontend
```

Express frontend is accessible at:

```text
http://13.232.218.144:3000
```

## PM2 Process Management

PM2 was used to keep both applications running.

```bash
pm2 list
```

Current PM2 processes:

```text
express-frontend   online
flask-backend      online
```

## Jenkins Setup

Jenkins was installed and accessed using:

```text
http://13.232.218.144:8080
```

Installed Jenkins plugins:

* Git
* Pipeline
* NodeJS

## Jenkins Pipelines

Two Jenkins pipeline jobs were created:

```text
flask-backend-pipeline
express-frontend-pipeline
```

Both jobs use Jenkinsfiles from the GitHub repository:

```text
flask-backend/Jenkinsfile
express-frontend/Jenkinsfile
```

## Flask Jenkins Pipeline Stages

```text
1. Pull latest code from GitHub
2. Install Flask dependencies
3. Restart Flask backend using PM2
```

## Express Jenkins Pipeline Stages

```text
1. Pull latest code from GitHub
2. Install Express dependencies
3. Restart Express frontend using PM2
```

## GitHub Webhook

A GitHub webhook was configured to trigger Jenkins automatically on every push.

Webhook URL:

```text
http://13.232.218.144:8080/github-webhook/
```

Event selected:

```text
Just the push event
```

## Issue Faced and Fix

During Jenkins pipeline execution, the EC2 instance had low memory because it was a t3.micro instance.

Issue:

```text
Jenkins restarted during npm install
```

Fix:

A 2 GB swap file was created.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

After adding swap memory, both Jenkins pipelines executed successfully.

## Final Verification

Flask backend:

```text
http://13.232.218.144:5000/api
```

Express frontend:

```text
http://13.232.218.144:3000
```

Jenkins:

```text
http://13.232.218.144:8080
```

## Screenshots

The following screenshots are included in the submission:

1. EC2 instance running
2. Security group inbound rules
3. Flask backend accessible on port 5000
4. Express frontend accessible on port 3000
5. PM2 list showing both apps online
6. Jenkins dashboard
7. Flask Jenkins pipeline successful build
8. Express Jenkins pipeline successful build
9. GitHub webhook configuration
10. Webhook-triggered Jenkins build success

## Result

The Flask backend and Express frontend were successfully deployed on a single EC2 instance. Jenkins CI/CD pipelines were configured for both applications. GitHub webhook integration was completed, and every push to GitHub automatically triggers deployment through Jenkins.
