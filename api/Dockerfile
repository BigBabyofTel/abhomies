FROM oven/bun:latest

WORKDIR /api

COPY . .

RUN bun install

ENV DATABASE_URL=process.env.DATABASE_URL

EXPOSE 3001

ENTRYPOINT ["bun", "dev"]