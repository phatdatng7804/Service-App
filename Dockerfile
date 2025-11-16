# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package & install all deps (including dev for babel)
COPY package*.json ./
RUN npm install

# Copy full project
COPY . .

# Build Babel
RUN npm run build


# Stage 2: Runtime
FROM node:18-alpine
WORKDIR /app

# Copy only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy build output
COPY --from=builder /app/dist ./dist

# Copy .env
COPY --from=builder /app/.env ./.env

# Copy full source folders for Sequelize CLI migrations
COPY --from=builder /app/src ./src
COPY --from=builder /app/.sequelizerc ./.sequelizerc

EXPOSE 5000

CMD ["npm", "start"]
