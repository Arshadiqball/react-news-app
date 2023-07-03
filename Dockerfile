# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Build the React app
RUN npm cache clean --force
RUN npm run build

# Set the command to start the app
CMD ["npm", "start"]
