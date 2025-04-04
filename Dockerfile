# Use an official Node runtime as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the application runs (adjust if needed)
EXPOSE 3000

# Define the command to run your app
CMD [ "npm", "start" ]
