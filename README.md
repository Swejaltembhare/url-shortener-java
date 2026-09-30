# Shortener – URL Shortener

A full-stack URL Shortener application built using Java Spring Boot and React.

## Features

- User Registration and Login
- Short URL generation
- Custom short URLs
- URL redirection
- User dashboard
- URL management
- Click tracking
- Responsive UI
- Secure authentication

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Lucide React

### Backend
- Java
- Spring Boot
- Spring Security
- REST API
- JWT Authentication
- Base62 URL Encoding

### Database
- MySQL / PostgreSQL
- Redis caching

## Project Structure

```text
url-shortener-java
│
├── src/                 ← Backend
├── frontend/            ← Frontend
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── pom.xml
├── mvnw
└── .gitignore
