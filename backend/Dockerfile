FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x ./gradlew
RUN ./gradlew bootJar

CMD ["java", "-jar", "build/libs/backend.jar"]
