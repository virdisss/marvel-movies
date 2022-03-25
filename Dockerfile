FROM node:14.16.0-alpine3.13
RUN addgroup vi && adduser -S -G vi vi
RUN mkdir /vi && chown vi:vi /vi
USER vi
WORKDIR /vi
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3090
CMD ["npm", "run", "dev"]