# ForReal
=============

ForReal is a mobile application that allows users to share their thoughts on a new daily prompt to the rest of the world. It’s Twitter meets Reddit meets YikYak with the daily habit stimulation of Wordle and BeReal.  ForReal is different because users can only see other responses until they post theirs, enabling honest, original perspectives to be shared. There are no echo chambers because ForReal’s feed does not filter content based on user interests. There are lots of interesting possible features which we will outline below.

## Motivation
---------------

Current social media has been criticized for the emergence of echo chambers and filtered realities where people post what everyone else is saying rather than their own thoughts. Inspired by this desire to motivate original, un-influenced perspectives to be circulated, we wanted to create an application that pushes users to think and develop their own opinions first before looking at what everyone else believes. 

## Install
---------------

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com).Check to see if you already have them installed by running the following command otherwise you can install them [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

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

React Native combines the best parts of native development with React.js to allow us to deploy a dynamic client-side application for both Android and iOS. The Express.js server-side framework runs inside our Node.js server to provide a minimalist web framework that allows for powerful models for URL routing and handling HTTP requests and reponses. We can connect our Express.js functions to power the functionality of our client-side UI. These functions use MongoDB's Node.js drivers via callbacks for using Promises to access and update data in our MongoDB database hosted in the cloud using Atlas.

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

Start your project via the `npm start` command. Download the Expo Go app on iOS to run natively on your own personal device by scanning the QR code.

## Contributors

[@AngieLue123](https://github.com/AngieLue123).
[@Georgema20](https://github.com/Georgema20).
[@onlypham](https://github.com/onlypham).
[@samuelli27](https://github.com/samuelli27).
[@tmag1](https://github.com/tmag1).