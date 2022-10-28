FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /usr/src/app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn -e -B package -DskipTests

FROM openjdk:17
WORKDIR /usr/app
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v1.19.0/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar
COPY --from=build /usr/src/app/target/*.jar app.jar
EXPOSE 8080

ENTRYPOINT ["java","-javaagent:/app/opentelemetry-javaagent.jar","-jar","app.jar"]
