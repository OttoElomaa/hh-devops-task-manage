FROM node:20

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json .
RUN npm install

# Copy the rest of the backend code
COPY backend .

# Expose the port your app listens on
EXPOSE 5000

# RUN THE APP IN THE CONTAINER
CMD ["npm", "run", "dev"]
