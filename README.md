# Holiday Extras - UserAPI
Node.js Application to register, find, delete and update users 


# Tech Area

- Node v10.16.0
- Docker v18.09.2
- MongoDB v4.0
- Typescript v2.6.2

The application has been written in Node.js with Restify framework and Mongodb as database.

Docker is used to run the application in "production mode" to guarantee it works correctly even in different environments.

# How to use it

### 1) Install the dependencies

`npm install `

### 2) Build typescript and docker-compose

` npm run build `

### 3) Start the application

` npm start `

### 4) Use the following postman collection

[Postman collection](https://drive.google.com/open?id=1u0lVxX0jt-llWpftV_Tg6-XA3p_uNeA3)


# Running Integration Tests

` npm test `

*Warning*: You MongoDb must be running to make it work correctly
