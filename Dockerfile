# base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

# add app
COPY . .

# start app
CMD ["npm", "start"]
