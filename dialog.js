const { BotkitConversation } = require("botkit");

exports.favoriteColor = (controller) => {
  const dialog = new BotkitConversation("favorite_color", controller);
  dialog.say("Olá, tudo bem?");
  dialog.ask(
    "Qual o seu nome?",
    async (response, convo, bot) => {
      console.log(`user name is ${response}`);
    },
    "name"
  );
  dialog.addAction("favorite_color");
  // add a message and a prompt to a new thread called `favorite_color`
  dialog.addMessage("Que nome bonito {{vars.name}}!", "favorite_color");
  dialog.addQuestion(
    "Agora, qual a sua cor preferida?",
    async (response, convo, bot) => {
      console.log(`user favorite color is ${response}`);
    },
    "color",
    "favorite_color"
  );
  // go to a confirmation
  dialog.addAction("confirmation", "favorite_color");
  // do a simple conditional branch looking for user to say "no"
  dialog.addQuestion(
    "Seu nome é {{vars.name}} e sua cor favorita é {{vars.color}}. Está correto?",
    [
      {
        pattern: "não",
        handler: async (response, convo, bot) => {
          // if user says no, go back to favorite color.
          await convo.gotoThread("favorite_color");
        },
      },
      {
        default: true,
        handler: async (response, convo, bot) => {
          await bot.beginDialog('likes_cheese');
        },
      },
    ],
    "confirm",
    "confirmation"
  );
  return dialog;
};

exports.likesCheese = (controller) => {
  const dialog = new BotkitConversation("likes_cheese", controller);
  dialog.addMessage({ text: "Vc disse sim, que ótimo." }, "yes_thread");
  dialog.addMessage({ text: "Vc disse não, que pena." }, "no_thread");
  dialog.addMessage({ text: "Desculpa, eu não entendi." }, "bad_response");
  dialog.addQuestion(
    "Vc gosta de queijo?",
    [
      {
        pattern: "sim",
        handler: async (response, convo, bot) => {
          await convo.gotoThread("yes_thread");
        },
      },
      {
        pattern: "não",
        handler: async (response, convo, bot) => {
          await convo.gotoThread("no_thread");
        },
      },
      {
        default: true,
        handler: async (response, convo, bot) => {
          await convo.gotoThread("bad_response");
        },
      },
    ],
    "likes_cheese",
    "default"
  );
  
  return dialog;
};
