FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY ../pom.xml .
COPY backend ./backend
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /app/target/jwt-backend-0.0.1-SNAPSHOT.jar app.jar

# Status scriptini ana dizinden kopyala ve çalıştırılabilir yap
COPY ../status.sh /status.sh
RUN chmod +x /status.sh

# Uygulamayı başlat
CMD ["/status.sh"]
