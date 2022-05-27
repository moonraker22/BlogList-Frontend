# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . .

# start app
CMD ["npm", "start"]

#docker build --pull --rm -f "Dockerfile" -t bloglistfrontend:latest "."
# "proxy": "http://localhost:3001"