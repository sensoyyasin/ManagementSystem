# JWT Implementation for Student Management System

# Overview

This project is a Student Management System built with Spring Boot, leveraging JSON Web Tokens (JWT) for secure authentication and authorization. The system allows users to manage students, courses, and users efficiently while ensuring robust security through JWT-based access control.


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
  
Client Sends JWT in Requests:
- For subsequent requests, the client sends the JWT in the Authorization header, prefixed with Bearer.
  
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

![backend-walpaper](https://github.com/user-attachments/assets/81b1659a-524e-42b7-91b5-dd522e51db1e)


# Frontend - Reactjs

<img width="1300" alt="Ekran Resmi 2024-08-29 22 25 36" src="https://github.com/user-attachments/assets/98a33d77-b3af-427b-99b3-cbf22e01f332">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 25 45" src="https://github.com/user-attachments/assets/8b04957c-7abc-4814-9dd6-eac20fdd266f">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 25 52" src="https://github.com/user-attachments/assets/c24e3e6b-09d2-47ab-b164-b36e2554e075">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 04" src="https://github.com/user-attachments/assets/2dc1da42-e1ff-4d3a-8df7-7d1d737e23ce">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 33" src="https://github.com/user-attachments/assets/60a22e65-4327-4d78-9f78-d57b7d02e155">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 51" src="https://github.com/user-attachments/assets/f4dce3d3-c1e6-4c9b-9547-888258039d2f">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 22" src="https://github.com/user-attachments/assets/ca4414b6-dd36-4426-828e-8cb080f5e97c">







