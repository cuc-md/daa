FROM maven:3-openjdk-14-slim AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM openjdk:14-alpine
COPY --from=build /usr/src/app/target/results_stats-0.0.1-SNAPSHOT.jar /usr/app/results_stats-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/results_stats-0.0.1-SNAPSHOT.jar"]
