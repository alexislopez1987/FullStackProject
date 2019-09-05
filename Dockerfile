FROM node:10

# Create app directory
WORKDIR /usr/src/app

# copy package.json to the container
COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# copy everything to container /usr/src/app
COPY . . 

# expose ports
EXPOSE 8080 27017 

CMD [ "node", "index.js" ]