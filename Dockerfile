FROM node:20

# install pnpm
RUN npm install -g pnpm

WORKDIR /app

# copy package files
COPY package.json pnpm-lock.yaml ./

# install dependencies
RUN pnpm install

# copy project
COPY . .

# COPY public ./public

# build typescript
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]