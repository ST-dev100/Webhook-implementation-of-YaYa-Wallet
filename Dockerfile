# Dockerfile
# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Set environment variables
ENV PORT 3000

# Run the application
CMD ["npm", "start"]
