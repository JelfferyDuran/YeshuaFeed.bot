import { Bot, webhookCallback } from "grammy";
import express from "express";

// require('dotenv').config();
import "dotenv/config.js"; 
import { bot } from "./bot.js";

const app = express(); // или то, что вы используете
app.use(express.json());
// https://api.telegram.org/bot<token>/setWebhook?url=<url>
// https://api.telegram.org/bot7397048375:AAFUc0nI6IQpsIgIWWW6ccU-gkgKSrLkMKQ/setWebhook?url=https://a357-91-206-178-2.ngrok-free.app/


// const url = 'https://6acf-91-206-178-2.ngrok-free.app';
const port = process.env.PORT;

app.use(webhookCallback(bot, "express"));

app.listen(port, () => {
    console.log(`[ Server ] Launched`)
});