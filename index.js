const TelegramBot = require("node-telegram-bot-api");
const getWeather = require("./api/weather/weather_api");
const nairaToUsd = require("./api/currency/convert_currency").naira_to_usd;
const usdToNaira = require("./api/currency/convert_currency").usd_to_naira;
const { host, port } = require("./config/config");
const url = host + ":" + port + "/api/get/";
// const url = "http://127.0.0.1:5000/api/get/";

// token gotten from @BotFather
const token = "1184087963:AAFFvqhvSHmelCqYPl5_EyTvYw3lI3eUUMw";

// create a new bot
const bot = new TelegramBot(token, { polling: true });

// help
function help() {
  welcome_msg = "Welcome to ZopfliBot";
  description =
    "This is a bot that tells the weather conditions of countries and Also, converts USD to Naira and vice versa.";
  commands =
    "/help - help \n /get_weather - get weather \n /usd2naira - usd to naira \n /naira2usd - naira to usd ";

  return welcome_msg + "\n\n" + description + "\n\n" + commands;
}

// commands

// help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, help());
});

// get_weather
bot.onText(/\/get_weather/, (msg) => {
  bot.sendMessage(msg.chat.id, "Please Enter city name");
  bot.on("message", (msg) => {
    getWeather(msg.text.toString().toLowerCase())
      .then(function (result) {
        message =
          `<b>Name: <i>${result.name}</i></b>` +
          "\n\n" +
          `<b>Country: <i>${result.country}</i></b>` +
          "\n\n" +
          `<b>Weather Condition: <i>${result.main_weather}</i></b>` +
          "\n\n" +
          `<b>Description: <i>${result.describe_weather}</i></b>`;
        bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
      })
      .catch(function (error) {
        message = "Sorry, An error occured.";
        bot.sendMessage(msg.chat.id, message);
      });
  });
});

// usd to naira
bot.onText(/\/usd2naira/, (msg) => {
  bot.sendMessage(msg.chat.id, "Please Enter Amount in USD");
  bot.on("message", (msg) => {
    usdToNaira(url, msg.text.toString())
      .then((response) => {
        console.log(response);
        bot.sendMessage(msg.chat.id, `${response}`);
      })
      .catch((error) => {
        console.log(error);
        bot.sendMessage(msg.chat.id, "Sorry, An error occured.");
      });
  });
});

// naira to usd
bot.onText(/\/naira2usd/, (msg) => {
  bot.sendMessage(msg.chat.id, "Please Enter Amount in Naira");
  bot.on("message", (msg) => {
    nairaToUsd(url, msg.text.toString())
      .then((response) => {
        console.log(response);
        bot.sendMessage(msg.chat.id, `${response}`);
      })
      .catch((error) => {
        console.log(error);
        bot.sendMessage(msg.chat.id, "Sorry, An error occured.");
      });
  });
});

// get message user sends
bot.on("message", (msg) => {
  if (!msg.text.toString().toLowerCase().includes("/")) {
    var bye = "bye";
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
      bot.sendMessage(msg.chat.id, "Hello dear user");
    }
    if (msg.text.toString().toLowerCase().includes(bye)) {
      bot.sendMessage(msg.chat.id, "Hope to see you around again, Bye");
    }
  }
});
