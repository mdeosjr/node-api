FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json /app
RUN pnpm i

COPY . /app

EXPOSE 8000

CMD [ "pnpm", "dev" ]