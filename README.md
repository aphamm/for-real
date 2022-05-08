# ForReal

ForReal is a mobile application that allows users to share their thoughts on a daily prompt to the rest of the world. It’s Twitter meets Reddit meets YikYak with the daily habit stimulation of Wordle and BeReal. ForReal is different since users can only see other responses after posting their own.

    Current social media has been criticized for the emergence of echo chambers and filtered realities. We hope our application can help push users to develop their own original opinions before interacting with other posts.

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Check to see if you already have them installed by running the following command otherwise you can install them [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```
node -v
npm -v
```

## Tech Stack

Our full-stack application is using the MERN stack comprised of the four key technologies.

1. [MongoDB](https://www.mongodb.com/docs/) - document database
2. [Express](https://expressjs.com/) - Node.js web framework
3. [React Native](https://reactnative.dev/docs/getting-started) - a client-side JavaScript framework
4. [Node](https://nodejs.org/en/docs/) - the premier JavaScript web server

React Native allows us to deploy a dynamic client-side application for both Android and iOS. The Express.js server-side framework runs inside our Node.js server to provide a minimalist web framework that allows for powerful models for URL routing and handling HTTP requests and reponses. These Express.js functions use MongoDB's Node.js drivers to access and update data in our MongoDB database hosted in Atlas.

## Usage

To run locally, first clone the repository to your local device using the following command. Enter the repository and install all necessary dependencies.

```
$ git clone git@github.com:onlypham/for-real.git
$ cd for-real
$ npm install
```

You will then need to create a [Mongo](https://www.mongodb.com/) account and create a [Mongo Atlas Cluster](https://docs.atlas.mongodb.com/getting-started/). Authenticate your connection via username and password and make sure to **white list** your IP Address under Network Access Security. Copy the corresponding connection string to use into your own application code. Create a .env file in the root directory with the following format.

```
NODE_ENV = development
PORT = 4000
MONGO_URI = mongodb+srv://
JWT_SECRET = ********
```

Start your project via the `npm start` command. Download the [Expo Go](https://expo.dev/client) app on iOS to run natively on your own personal device by scanning the QR code.

## Contributors

[@AngieLue123](https://github.com/AngieLue123).
[@Georgema20](https://github.com/Georgema20).
[@onlypham](https://github.com/onlypham).
[@samuelli27](https://github.com/samuelli27).
[@tmag1](https://github.com/tmag1).