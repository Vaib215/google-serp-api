FROM oven/bun:1
WORKDIR /
COPY . .
RUN bun install

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["bun", "http.ts"]