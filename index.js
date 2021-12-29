//Import some packages needed
require('dotenv').config();
const moment = require('moment');
const tz = require('moment-timezone');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const { TIMEZONE, FORMAT, CHANNEL_ID, UPDATE_INTERVAL, BOT_TOKEN} = process.env;

app.get("/", (req, res) => {
  console.log("Landing page successful");
  res.send("I'm a clock!")
});
app.get("/update", (req, res) => {
  client.login(BOT_TOKEN).then(function(x){
    console.log("Login succesful");
    client.channels.fetch(CHANNEL_ID).then(function(y){
      console.log("Channels fetch succesful");
      //init time
      const timeNow = moment().tz(TIMEZONE).format(FORMAT);
      //initial update
      y.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
        .catch(console.error);
      //tells if it is ready
      console.log(`Updated as ${client.user.tag} (${client.user.id}) at ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
      res.send("success");
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));