# Use the official Node.js image as the base image
FROM ubuntu

WORKDIR /usr/src/app

RUN apt-get update



RUN apt-get install nodejs -y


RUN apt-get  install npm -y

RUN apt-get upgrade -y

# Copy the rest of the application code to the working directory
  

COPY .  .


RUN npm install

RUN npm i --save-dev @types/nodemailer  @types/express  @types/express-http-proxy @types/jsonwebtoken @types/multer  @types/node @types/bcryptjs @types/cookie-parser

RUN npm run build

EXPOSE 9001


ENTRYPOINT [ "node","dist/index.js" ]





