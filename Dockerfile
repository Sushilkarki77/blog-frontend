# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Expose frontend port (Vite default is 3000)
EXPOSE 3000

# Command to run Vite in development mode
CMD ["npm", "run", "dev"]
