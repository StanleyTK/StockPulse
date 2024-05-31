# Use an official lightweight Java image.
FROM openjdk:21-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the jar file from your target folder to the container
COPY ./target/stockpulse-server-0.0.1-SNAPSHOT.jar /app/server.jar

# Expose the port your app runs on
EXPOSE 8080

# Command to run your app using the jar file
CMD ["java", "-jar", "server.jar"]
