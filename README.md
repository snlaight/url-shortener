# URL-SHORTENER APP
This is a mono-repo app for a url-shortening service. Backend is built with MongoDB (chosen for its easiness in setting up a connection via the variables in the .env file), front-end is built with create-react-app. It uses tailwind for styling/css .

To run the code, you need to download the repo via git clone. Once downloaded, set your MongoDB environment variables in the .env (create a .env file in the root of the ```backend``` directory) file (you'll need to set the variable names to ```DB_USER, DB_PASSWORD, DB_CLUSTER and DB_NAME```). You can find the example of what you'll need in the db.js file located in backend/dbConfig directory of this repo.

To begin with, you also have to seed your DB. I've left a seeds.js file inside the ```backend``` directory so you can do this quickly -- you'll need to use one of the emails listed on there in order to generate a shortURL. You can quickly seed your MongoDB collection by running ```node seeds.js``` from within the ```backend``` directory.

Once you have set up your environment variables, you'll need to install all the dependencies. The repo has been set up so you can do this in 3 commands -- first, run ```npm install``` at the root directory. Second, run ```npm run install-all``` to install all the dependencies in the backend & front end folders. And finally, now you can run both the client and server app by running ```npm run start-all``` from the root directory of the application. If you're running into any issues, make sure your current directory is not ```/frontend``` , or ```/backend```.

Front-end was designed trying to replicate the structure of [TinyURL](https://tinyurl.com/app) .
## TECH STACK
![Node.JS](https://img.shields.io/badge/-Node.js-black?style=round-square&logo=node.js&logoColor=green) ![ExpressJS](https://img.shields.io/badge/-Express-black?style=round-square&logo=express&logoColor=white) ![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=round-square&logo=mongodb&logoColor=green) ![Tailwind](https://img.shields.io/badge/-Tailwind-black?style=round-square&logo=tailwindcss&logoColor=blue) ![ReactJS](https://img.shields.io/badge/-ReactJs-000000?logo=react) 

## RESOURCES
https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
https://www.tutorialspoint.com/writing-a-custom-url-shortener-function-in-javascript
https://tinyurl.com/app