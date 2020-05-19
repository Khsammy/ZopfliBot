const TelegramBot = require("node-telegram-bot-api");
const getWeather = require("./api/weather/weather_api");
// convert currency
const usdToNaira = require("./api/currency/convert_currency").usd_to_naira;
const nairaToUsd = require("./api/currency/convert_currency").naira_to_usd;
// config host and port
const { host, port } = require("./config/config");
const url = host + ":" + port + "/api/get/";

// token from @BotFather
const token = "1184087963:AAFFvqhvSHmelCqYPl5_EyTvYw3lI3eUUMw";

// create a new bot
const bot = new TelegramBot(token, { polling: true });

// help
function help() {
  header_msg = "<b>Welcome to ZopfliBot</b>";
  description =
    "This is a bot that tells the weather conditions of countries and Also, converts USD to Naira and vice versa.";
  commands =
    "Commands - \n /help - help \n /get_weather [city] - get weather \n /usd2naira [Amount in USD] -> usd to naira \n /naira2usd [Amount in Naira] -> naira to usd ";

  return header_msg + "\n\n" + description + "\n\n" + commands;
}

// Commands

// help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, help(), { parse_mode: "HTML" });
  console.log("Data Sent");
});

// get_weather
bot.onText(/\/get_weather ([A-Za-z\s]+$)/, (msg, match) => {
  getWeather(match[1].toString().toLowerCase())
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
      console.log("Data Sent");
    })
    .catch(function (error) {
      bot.sendMessage(msg.chat.id, "Sorry, An error occured.");
      console.error(error);
    });
});

// usd to naira
bot.onText(/\/usd2naira (\$?[\d]+(\.\d*)?$)/, (msg, match) => {
  usdToNaira(url, match[1].toString())
    .then((response) => {
      bot.sendMessage(msg.chat.id, `<b>$<i>${response}</i></b>`, {
        parse_mode: "HTML",
      });
      console.log("Data Sent");
    })
    .catch((error) => {
      bot.sendMessage(msg.chat.id, "Sorry, An error occured.");
      console.error(error);
    });
});

// naira to usd
bot.onText(/\/naira2usd (\$?[\d]+(\.\d*)?$)/, (msg, match) => {
  nairaToUsd(url, match[1].toString())
    .then((response) => {
      bot.sendMessage(msg.chat.id, `<b>N<i>${response}</i></b>`, {
        parse_mode: "HTML",
      });
      console.log("Data Sent");
    })
    .catch((error) => {
      bot.sendMessage(msg.chat.id, "Sorry, An error occured.");
      console.error(error);
    });
});

// get any message user sends
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
