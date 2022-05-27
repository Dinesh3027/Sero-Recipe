FROM node:lts-alpine
ENV NODE_ENV=production

# set working directory
WORKDIR /ui

# install app dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
RUN mv node_modules ../

COPY . .
EXPOSE 3000
RUN chown -R node /src/ui
USER node
CMD ["npm", "start"]
