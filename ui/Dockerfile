FROM node:14

WORKDIR /ui

COPY ["package*.json", "./"]

RUN npm i

EXPOSE 3000

CMD ["npm", "start"]
