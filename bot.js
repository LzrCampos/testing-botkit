// Import Botkit's core features
const { Botkit, BotkitConversation } = require("botkit");
const { favoriteColor, likesCheese } = require('./dialog');

// Import a platform-specific adapter for botframework.

// const { MongoDbStorage } = require("botbuilder-storage-mongodb");

// Load process.env values from .env file
require("dotenv").config();

// let storage = null;
// if (process.env.MONGO_URI) {
//   storage = mongoStorage = new MongoDbStorage({
//     url: process.env.MONGO_URI,
//   });
// }

const controller = new Botkit({
  webhook_uri: "/api/messages",
  adapterConfig: {
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD,
  },
});

controller.addDialog(favoriteColor(controller));
controller.addDialog(likesCheese(controller));

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + "/features");
});

controller.webserver.get("/", (req, res) => {
  res.send(`This app is running Botkit ${controller.version}.`);
});
