const axios = require("axios");
// const { host, port } = require("../../config/config");
// const url = host + port + "/api/get";
// const url = "http://127.0.0.1:5000/api/get/";

async function usd_to_naira(url, currency_value) {
  let res = await axios.get(url + "usd_to_naira");
  return currency_value * res.data;
}

async function naira_to_usd(url, currency_value) {
  let res = await axios.get(url + "naira_to_usd");
  return currency_value * res.data;
}

module.exports.usd_to_naira = usd_to_naira;
module.exports.naira_to_usd = naira_to_usd;
