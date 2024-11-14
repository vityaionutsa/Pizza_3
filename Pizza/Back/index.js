import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api"
import dotenv from 'dotenv'; 
dotenv.config();
 const  app = express();

 app.use(express.json());
 app.use(cors());
 app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

 "============================================================="
 const botToken =  process.env.TELEGRAM_BOT_TOKEN;
 const bot = new TelegramBot(botToken, { polling: true })
 app.use(express.urlencoded({ extended: true }));

 function sendTelegramMessage(chatId, message) {
    bot.sendMessage(chatId, message);
  }
  app.post('/form', (req, res) => {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const { name, email, phone, details, letter } = req.body;
    const telegramMessage = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMesssage: ${letter}\nDetails: ${details}`;
  
    sendTelegramMessage(chatId, telegramMessage)
    res.send('Form submitted successfully!');
  });
  app.post('/form2', (req, res) => {
    const chatId = process.env.TELEGRAM_CHAT_ID; // Ідентифікатор чату Telegram
    const { fullName, phone, email, items, totalCount, cartTotalPrice } = req.body;
    
    let itemsText = '';
    for (let i = 0; i < items.length; i++) {
      const { title, price, count } = items[i];
      itemsText += `${title} x ${count} - ${price} грн\n`;
    }
  
    const telegramMessage = `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\n${itemsText}\nTotalCount: ${totalCount}\nTotalPrice: ${cartTotalPrice}`;
  
    // Функція для відправки повідомлення в Telegram
    sendTelegramMessage(chatId, telegramMessage);
    res.send('Form submitted successfully!');
  });

 app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("server work!")
 });