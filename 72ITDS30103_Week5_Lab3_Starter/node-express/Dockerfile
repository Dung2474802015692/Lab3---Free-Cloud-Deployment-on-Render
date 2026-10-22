FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .

EXPOSE 8000

# Exec form: node is PID 1 and receives the stop signal directly.
# The port is chosen in server.js (Lab 3, Task A).
CMD ["node", "server.js"]
