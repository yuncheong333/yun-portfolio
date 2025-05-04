FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew
RUN ./gradlew bootJar

CMD ["java", "-jar", "build/libs/backend-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080