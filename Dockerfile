FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY index.html ./
COPY styles.css ./
COPY app.js ./
COPY server.js ./
COPY data ./data

ENV NODE_ENV=production
ENV PORT=4173

EXPOSE 4173

CMD ["npm", "start"]
