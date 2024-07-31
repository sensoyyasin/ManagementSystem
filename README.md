# JWT Implementation for Student Management System

# Overview

This project is a Student Management System built with Spring Boot, leveraging JSON Web Tokens (JWT) for secure authentication and authorization. The system allows users to manage students, courses, and users efficiently while ensuring robust security through JWT-based access control.

![Designer-3](https://github.com/user-attachments/assets/81f7a61b-d97a-4fe4-8a57-b3556c362b07)


# Features

- User Authentication: Secure login and registration with JWT. After logging in, users can make authenticated requests using JWT tokens.
- Role-Based Access Control: Differentiated access permissions for ADMIN and USER roles.
- Course Management: Manage courses associated with students.
- User Management: Create and manage users with different roles and permissions.
- Database Integration: Uses PostgreSQL for data persistence.


# Technologies

- Spring Boot: For building the backend application.
- Spring Security: For securing the application using JWT.
- PostgreSQL: For the relational database management.
- JWT (JSON Web Tokens): For handling authentication and authorization.



# Security Configuration
The security configuration is set to use JWT for authentication and authorization:

Endpoints:
- /auth/** - Public endpoints (no authentication required).
- GET requests - Accessible by both ADMIN and USER roles.
- POST, PUT, DELETE requests - Accessible only by ADMIN role.
- CORS Configuration: Allows requests from http://localhost:8080 and http://localhost:3000.


# Dependencies

- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Web
- PostgreSQL Driver
- JJWT Library for JWT handling

# JWT-Based Authentication and Authorization

![JWT-Implementation-Scheme](https://github.com/user-attachments/assets/383fab8f-1c6f-42ac-86bc-617120def68b)


JSON Web Token (JWT) is a compact, URL-safe token used for securely transmitting information between parties. It contains encoded JSON objects, including claims (user information and metadata). JWTs are commonly used in authentication and authorization processes in web applications.

1. JWT Authentication

Authentication involves verifying the user's identity. In a JWT-based system, the process generally works as follows:

- User Login:
- The user provides their credentials (e.g., username and password).
- The server verifies these credentials.
- If valid, the server generates a JWT containing user information and sends it back to the client.

Client Stores JWT:
- The client stores the JWT, typically in local storage or cookies.
- 
Client Sends JWT in Requests:
- For subsequent requests, the client sends the JWT in the Authorization header, prefixed with Bearer.
- 
Server Validates JWT:
- The server intercepts the request with a filter (e.g., JwtAuthenticationFilter).
- The filter extracts the JWT from the header and validates it.
- If the token is valid, the server authenticates the user by setting the SecurityContext.

2. JWT-Based Authorization

Authorization determines what resources a user can access based on their role or permissions. In a JWT-based system:

Roles in JWT:
- The JWT may contain roles or claims specifying user permissions.
- For example, a token might include a claim that says role: ADMIN.
- Access Control:
- Based on roles, the server enforces access control rules.
- For example, ADMIN may have access to all resources, while USER might only have access to read data.


# Architecture Diagram

![architecture-diagram](https://github.com/user-attachments/assets/20a542fd-cddb-4301-8864-19aab199bdd5)
