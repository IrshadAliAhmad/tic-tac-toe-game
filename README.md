# Tic-Tac-Toe Pro

Tic-Tac-Toe Pro is a modern, feature-rich web-based Tic-Tac-Toe game.  

---

## Features

- **AI Mode:** Unbeatable computer opponent (Minimax algorithm)  
- **PvP Mode:** Play locally with a friend  
- **Undo & Hint:** Undo last move and get suggested moves  
- **Scoreboard & History:** Track wins, draws, and past matches  
- **Themes & Music:** Toggle dark/light mode and background music  
- **Responsive UI:** Works on desktop and mobile  

---

## Exposed Ports

- Inside the Docker container, the app runs on **port 80** (as set in the Dockerfile).  
- On your host machine, we map it to **port 8080** using Docker commands.  
- Access the app in your browser: `http://localhost:8080`  

> Mapping explanation: `-p 8080:80` → `host_port:container_port`

---

## Docker Instructions

### 1. Build Docker Image
From your project folder (where `Dockerfile` is located):
```bash
docker build -t tic-tac_img .

### 2. Create Docker container

docker run -d --name=tic-tac_container -p 8080:80  tic-tac_img:latest

