//Import some packages needed
require('dotenv').config();
const moment = require('moment');
const tz = require('moment-timezone');
const chalk = require('chalk');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const { TIMEZONE, FORMAT, CHANNEL_ID, UPDATE_INTERVAL, BOT_TOKEN} = process.env;

app.get("/", (req, res) => {
  console.log("landing accessed");
  res.send("안녕하세요!")
});
app.get("/update", async (req, res) => {
  client.login(BOT_TOKEN);
  client.once('ready', () => {
    //define clockChannel
    const clockChannel = client.channels.cache.get(CHANNEL_ID);
    //init time
    const timeNow = moment().tz(TIMEZONE).format(FORMAT);
    //initial update
    clockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
      .catch(console.error);
    //tells if it is ready
    console.log(chalk.greenBright("[READY]"), `Logged in as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
    res.send("success");
  });
});

app.listen(port, () => console.log(`app listening on port ${port}!`));