#Use the official Node.js image as the base image
FROM public.ecr.aws/docker/library/node:20.19

# Set the working directory to /app in the container 
RUN mkdir -p /app
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all files
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]

