# Smart Auto Import your Mongoose Models
This simple Node.js API demonstrates how easy it can be to import Mongoose models into your Routes without worrying about their place of definition within the code. The `main` branch contains the usual way of importing them while the [with-smart-import](https://github.com/Harrisonkamau/smart-import-mongoose-models/tree/with-smart-import) branch demos how to import them smartly.

## Prerequisites
To better understand how this works, you're required to at least understand a basic flow of an API or any backend. Once you've cloned and installed on your local PC, fire up either [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to run the requests from there.

Additionally, have the following installed:
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Installation
Follow these steps to have the app running on your Computer.
- clone the repo: `git clone git@github.com:Harrisonkamau/smart-import-mongoose-models.git` or using HTTPS: `git clone https://github.com/Harrisonkamau/smart-import-mongoose-models.git`
- Change into the directory: `cd smart-import-mongoose-models`
- Install dependencies: `yarn install` or using NPM: `npm install`
- Copy all `.env.sample` variables into a `.env` file: `cp .env.sample .env`
- Start dev server: `yarn dev`

To confirm that everything is working as expected go to the browser and paste: `http://localhost:4000`. You should see a welcome message.


## Checkout with-smart-import
To see how the models are being _auto loaded_, checkout `with-smart-import` branch, then open the code in your favorite editor. `git fetch && git checkout with-smart-import`
