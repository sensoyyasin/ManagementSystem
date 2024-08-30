# JWT Implementation for Student Management System


# JWT Backend Application

## Description

The JWT Backend Application is a Spring Boot-based RESTful API that utilizes JWT (JSON Web Token) for authentication and authorization. The project follows the CRUD (Create, Read, Update, Delete) architecture and integrates with a PostgreSQL database. It is configured with Spring Cloud for centralized configuration management and Docker for containerization.

## Features

- Spring Boot: Framework used to build the backend application.
- JPA (Java Persistence API): Used for managing relational data in Java applications.
- JDBC (Java Database Connectivity): Provides a standard API for connecting to relational databases.
- Hibernate: ORM framework used to map Java objects to database tables.
- JWT-based Authentication and Authorization: Secure handling of user sessions and access control.
- CRUD Operations: For managing entities like students, courses, and users.
- PostgreSQL: Relational database for data persistence.
- Spring Cloud Config: Centralized configuration
- Docker: Containerization platform used to ensure consistent development and deployment environments.
- Docker Compose: Tool for defining and running multi-container Docker applications.

## Table of Contents

- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Docker Usage](#docker-usage)
- [Build and Run](#build-and-run)
- [Postman](#postman)
- [Security Configuration](#security-configuration)
- [Dependencies](#dependencies)
- [JWT-Based Authentication and Authorization](#jwt-based-authentication)
- [Spring Architecture](#spring-architecture)
- [Architecture Diagram](#architecture-diagram)
- [Frontend - Reactjs](#frontend)


## Project Structure

The project is organized as follows:

- **`JwtBackendApplication.java`**: The main entry point of the Spring Boot application.
- **`configs/`**: Contains configuration classes for application settings and security.
- **`controllers/`**: Contains REST controllers that handle HTTP requests and responses.
- **`dtos/`**: Data Transfer Objects for transferring data between layers.
- **`entities/`**: JPA entities that map to database tables.
- **`exceptions/`**: Custom exception classes for error handling.
- **`repositories/`**: Spring Data JPA repositories for data access.
- **`responses/`**: Classes for handling responses and data encapsulation.
- **`services/`**: Business logic and service layer components.

## Getting Started

To get started with the JWT Backend Application, follow these steps:

### Prerequisites

- Java 17
- Maven
- Docker and Docker Compose

### Configuration

1. **Environment Variables:** Create a `.env` file in the root directory with the following environment variables:
   ```properties
   SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5434/mydatabase
   SPRING_DATASOURCE_USERNAME=username
   SPRING_DATASOURCE_PASSWORD=password
   POSTGRES_DB=mydatabase
   POSTGRES_USER=username
   POSTGRES_PASSWORD=password

### Docker Usage

To build and run the application using Docker, follow these steps:

Start Services with Docker Compose:

docker-compose up

or if you need to build images first:

docker-compose up --build

This command will start all required services, including the backend, frontend, PostgreSQL database, and config server.

Service Endpoints:

- Backend: http://localhost:8080

- Frontend: http://localhost:3000

- Config Server: http://localhost:8181

### Build and Run

To build and run the application locally without Docker:

Build with Maven:

- mvn clean package

Run the Application:

- java -jar target/jwt-backend-0.0.1-SNAPSHOT.jar


## Postman

Our backend controller includes GET, POST, PUT, and DELETE methods, adhering to the CRUD architecture. Since the client-side was not ready at the beginning, we used Postman to send requests to the backend. Below are screenshots of the requests we made, along with explanations of why each request was sent.

- GET: Used to retrieve data. For example, to list user information or view a specific record, we used GET requests.
- POST: Used to add new data. For example, to create a new user record or add a new product, we used POST requests.
- PUT: Used to update existing data. For example, to update user information or modify product details, we used PUT requests.
- DELETE: Used to remove existing data. For example, to delete a user or remove a product record, we used DELETE requests.
  
We have included screenshots demonstrating how each request was made and the responses we received. These images will help you understand how each method works and how the backend handled these requests.

<img width="1000" alt="Ekran Resmi 2024-08-29 23 07 52" src="https://github.com/user-attachments/assets/a388f5f9-9dc1-4339-be46-56d2faac91ac">

<img width="1000" alt="Ekran Resmi 2024-08-29 23 08 28" src="https://github.com/user-attachments/assets/b418b6d8-9850-47cd-9cf5-9d228aded0e6">

<img width="1000" alt="Ekran Resmi 2024-08-29 23 09 19" src="https://github.com/user-attachments/assets/9b7812fd-4a8c-452e-b0f0-7c8a89a82235">

# Technologies

- Spring Boot: A comprehensive framework that simplifies the development of Java-based applications by providing out-of-the-box support for creating production-ready applications with minimal configuration. Spring Boot enables rapid development and deployment with built-in features for dependency management, embedded servers, and configuration.
- Spring Security: A powerful and flexible framework for securing Java applications. Spring Security provides robust mechanisms for authentication and authorization, protecting against various security threats. It integrates seamlessly with JWT to handle secure login processes and control access to different parts of the application.
- PostgreSQL: An advanced, open-source relational database management system known for its reliability and performance. PostgreSQL supports complex queries, transactional integrity, and extensibility, making it ideal for handling structured data and ensuring data consistency in a multi-user environment.
- JWT (JSON Web Tokens): A compact, URL-safe method for representing claims to be transferred between two parties. JWTs are used for securely transmitting information, such as user authentication tokens, ensuring that data can be verified and trusted. This project uses JWT for managing user sessions and authorizing access to various resources.
- Docker: A containerization platform that allows developers to package applications and their dependencies into portable containers. Docker ensures that applications run consistently across different environments by isolating them from the underlying infrastructure, which simplifies deployment and scaling.
- Docker Compose: A tool for defining and running multi-container Docker applications. With Docker Compose, you can configure and manage multiple services (e.g., application, database) using a single YAML file. It automates the process of setting up and managing these services, streamlining the development and deployment workflow.
- JPA (Java Persistence API): A specification for managing relational data in Java applications. JPA provides a standard approach to object-relational mapping (ORM), allowing developers to interact with the database using Java objects. It simplifies data access and management, reducing boilerplate code and improving maintainability.
- Hibernate: An ORM framework that implements JPA and extends its capabilities with additional features. Hibernate handles the mapping between Java objects and database tables, providing support for advanced querying, caching, and transaction management. It enhances the efficiency and flexibility of database interactions.
- Spring Cloud: A suite of tools designed for building and managing cloud-native applications. Spring Cloud offers capabilities for configuration management, service discovery, and distributed systems. In this project, Spring Cloud is used to dynamically fetch configuration properties from a GitHub repository, facilitating centralized management and seamless updates.

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

# Spring Architect

<img width="793" alt="Spring-Architect" src="https://github.com/user-attachments/assets/a463fe44-d528-4332-bb80-35c37043ccad">


# Architecture Diagram

![backend-walpaper](https://github.com/user-attachments/assets/81b1659a-524e-42b7-91b5-dd522e51db1e)


# Frontend - Reactjs

<img width="1300" alt="Ekran Resmi 2024-08-29 22 25 36" src="https://github.com/user-attachments/assets/98a33d77-b3af-427b-99b3-cbf22e01f332">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 25 45" src="https://github.com/user-attachments/assets/8b04957c-7abc-4814-9dd6-eac20fdd266f">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 04" src="https://github.com/user-attachments/assets/2dc1da42-e1ff-4d3a-8df7-7d1d737e23ce">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 33" src="https://github.com/user-attachments/assets/60a22e65-4327-4d78-9f78-d57b7d02e155">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 51" src="https://github.com/user-attachments/assets/f4dce3d3-c1e6-4c9b-9547-888258039d2f">

<img width="1300" alt="Ekran Resmi 2024-08-29 22 26 22" src="https://github.com/user-attachments/assets/ca4414b6-dd36-4426-828e-8cb080f5e97c">







