# JWT Implementation for Student Management System

# Overview

This project is a Student Management System built with Spring Boot, leveraging JSON Web Tokens (JWT) for secure authentication and authorization. The system allows users to manage students, courses, and users efficiently while ensuring robust security through JWT-based access control.


# Features

User Authentication: Secure login and registration with JWT. After logging in, users can make authenticated requests using JWT tokens.
Role-Based Access Control: Differentiated access permissions for ADMIN and USER roles.
Course Management: Manage courses associated with students.
User Management: Create and manage users with different roles and permissions.
Database Integration: Uses PostgreSQL for data persistence.


# Technologies

Spring Boot: For building the backend application.
Spring Security: For securing the application using JWT.
PostgreSQL: For the relational database management.
JWT (JSON Web Tokens): For handling authentication and authorization.



# Security Configuration
The security configuration is set to use JWT for authentication and authorization:

Endpoints:
/auth/** - Public endpoints (no authentication required).
GET requests - Accessible by both ADMIN and USER roles.
POST, PUT, DELETE requests - Accessible only by ADMIN role.
CORS Configuration: Allows requests from http://localhost:8080 and http://localhost:3000.

# Dependencies

Spring Boot Starter Data JPA
Spring Boot Starter Security
Spring Boot Starter Web
PostgreSQL Driver
JJWT Library for JWT handling



# Architecture Diagram

![architecture-diagram](https://github.com/user-attachments/assets/20a542fd-cddb-4301-8864-19aab199bdd5)
