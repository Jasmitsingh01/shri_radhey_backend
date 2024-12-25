# Use the official Node.js image as the base image
FROM ubuntu



# Copy the rest of the application code to the working directory
  
RUN mkdir user_service

COPY controllers user_service/controllers

COPY Database user_service/Database


COPY middleware user_service/middleware

COPY models user_service/models

COPY routes user_service/routes

COPY utlis/* user_service/utlis


COPY package.json user_service/

COPY package-lock.json user_service/

COPY tsconfig.json user_service/

COPY .env user_service/

RUN npm install 

RUN npx tsc

EXPOSE 9000
RUN npm start




