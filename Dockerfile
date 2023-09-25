FROM alpine:latest as builder

WORKDIR /usr/apps/api

ENV DATABASE_URL = ''

RUN apk --no-cache update && apk add bash \
  && apk add nodejs \
  && apk add npm

COPY . .

RUN npm ci

RUN npm run build

FROM alpine:latest as production

WORKDIR /usr/apps/api

ENV DATABASE_URL = ''

RUN apk --no-cache update && apk add bash \
  && apk add nodejs \
  && apk add npm

RUN npm install -g prisma

COPY --from=builder /usr/apps/api .

RUN rm -rf node_modules

RUN npm install --omit=dev

CMD ["npm", "run", "start"]