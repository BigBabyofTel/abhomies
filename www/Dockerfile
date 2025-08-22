FROM node:20-alpine

WORKDIR /www

# Copy only manifests first for better layer caching
COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate && pnpm install --frozen-lockfile

COPY . .

ENV DATABASE_URL=process.env.DATABASE_URL

EXPOSE 3000

CMD ["pnpm", "dev"]
