FROM node:20-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

ENV NODE_ENV=production

ARG NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY

ENV NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY=$NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]