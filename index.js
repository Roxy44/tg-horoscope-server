const TelegramBot = require('node-telegram-bot-api');

const token = '7508323252:AAH71kwXQNZyczk8P05XWeV2NL5eH4GH8-Q';
const webAppUrl = 'https://celadon-frangollo-434423.netlify.app';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/horoscope' || text === '/start') {
    await bot.sendMessage(chatId, 'Получите ежедневный гороскоп', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Получить гороскоп', web_app: {url: webAppUrl}}]
            ]
        }
    })
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      console.log('Полученные данные:', data);
      await bot.sendMessage(chatId, 'Ваш гороскоп на сегодня: ' + data);
    } catch (error) {
      console.error('Ошибка при обработке данных:', error);
      await bot.sendMessage(chatId, 'Произошла ошибка при обработке вашего гороскопа.');
    }
  }
});