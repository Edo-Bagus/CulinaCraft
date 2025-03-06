# Use a Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
