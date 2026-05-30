# ---- Build stage: compile and package the Spring Boot jar ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Cache dependencies first (only re-downloads when pom.xml changes)
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

# Build the application
COPY src ./src
RUN mvn -B -q clean package -DskipTests

# ---- Runtime stage: small JRE image running the jar ----
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy the fat jar produced by the build stage
COPY --from=build /app/target/*.jar app.jar

# Render (and most PaaS) inject PORT; Spring Boot reads it via server.port
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
