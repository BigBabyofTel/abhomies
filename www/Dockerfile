FROM oven/bun:latest

WORKDIR /www

COPY . .

RUN pnpm install

ENV DATABASE_URL=process.env.DATABASE_URL

EXPOSE 3001

ENTRYPOINT ["pnpm", "dev"]