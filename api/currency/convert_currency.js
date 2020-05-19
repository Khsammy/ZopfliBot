const axios = require("axios");

async function usd_to_naira(url, currency_value) {
  let res = await axios.get(url + "usd_to_naira");
  return currency_value * res.data;
}

async function naira_to_usd(url, currency_value) {
  let res = await axios.get(url + "naira_to_usd");
  return currency_value * res.data;
}

module.exports = {
  usd_to_naira: usd_to_naira,
  naira_to_usd: naira_to_usd,
};