FROM oven/bun:latest

WORKDIR /api

COPY package.json bun.lockb ./

COPY . .

RUN bun install

ENV DATABASE_URL=process.env.DATABASE_URL

EXPOSE 8070

ENTRYPOINT ["bun", "dev"]