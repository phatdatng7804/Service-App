# Stage 1: Build
FROM node:18-slim AS builder
WORKDIR /app

# Copy package and install all deps
COPY package*.json ./
RUN npm install

# Copy full project
COPY . .

# Build Babel
RUN npm run build


# Stage 2: Runtime
FROM node:18-slim
WORKDIR /app

# Copy only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy build output
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/src/config/firebase-service-account.json ./dist/src/config/firebase-service-account.json
# Copy only what is needed for Sequelize migrations (not entire src)
COPY --from=builder /app/src/migrations ./src/migrations
COPY --from=builder /app/.sequelizerc ./.sequelizerc

# Copy .env if you want it inside container
COPY --from=builder /app/.env ./.env

EXPOSE 5000

CMD ["npm", "start"]
