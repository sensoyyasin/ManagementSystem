#!/bin/sh

GREEN="\033[0;92m"
YELLOW="\033[0;93m"
RESET="\033[0m"  # Renk sıfırlama

echo "${YELLOW} Waiting for services to be available...${RESET}"
sleep 10

echo "${GREEN} Starting the backend application...${RESET}"
exec java -jar /app.jar
