import { Bot , InlineKeyboard, Keyboard } from "grammy";
import express from "express";
// require('dotenv').config();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); 
// Создайте экземпляр класса `Bot` и передайте ему токен вашего бота.
const TOKEN = process.env.TELEGRAM_TOKEN;

const STATES ={	'citizenship': 'У Вас есть Российское гражданство? (Да/Нет)'
	,'licenseRF': 'У Вас есть водительское удостоверение РФ? (Да/Нет)'
	 ,'gender': 'Ваш пол мужской? (Да/Нет)'
	,'age': 'Ваш возраст'
	 ,'experience': 'Ваш Стаж в ТАКСИ'
	,'address': 'Ваш адрес'
	,'carModel': 'Модель и марка Вашей машины'
	,'yearAuto': 'Год выпуска Вашей машины'
	 ,'numberAuto': 'Номер Вашей машины'
	 ,'nameFull': 'Ваше ФИО'
	 ,'bornDate': 'Дата рождения: День.Месяц.Год'
	  ,'autoImage': 'Фото Вашей чистой машины спереди!'
	,'phone': 'Ваш номер телефона',
	'end': 'Опрос закончен, Спасибо!'
};

export const bot = new Bot(TOKEN); // <-- поместите токен вашего бота между "".


// Теперь вы можете зарегистрировать слушателей на объекте вашего бота `bot`.
// grammY будет вызывать слушателей, когда пользователи будут отправлять сообщения вашему боту.

// Обработайте команду /start.




  bot.command("start", async (ctx) => {
	const inlineKeyboard = new InlineKeyboard().text("ПОЕХАЛИ", "button-1");
  
	await ctx.reply("Привет! Я чат-бот такси межгород. Присоединяйтесь к нашей команде водителей в сфере международных перевозок! \nНажимая кнопку 'Поехали', Вы даете согласие на обработку персональных данных! После заполнения анкеты и одобрения администратором Вам придет ссылка на нашу рабочую группу. ", {
	  reply_markup: inlineKeyboard,
	});
  });





  bot.callbackQuery(["button-1"], async (ctx) => {
	// Это всплывающее сообщение
	// await ctx.answerCallbackQuery(" сработал");

	console.log(1, ctx.update.callback_query.from.id);
		const upsertUser = await prisma.driver.upsert({
			where: {
				tId: String(ctx.update.callback_query.from.id)
			},
			update: {
				state: "citizenship",
			},
			create: {
				tId: String(ctx.update.callback_query.from.id),
				state: "citizenship",
			},
		})


	ctx.reply(STATES["citizenship"]);
  });

  

// Обработайте другие сообщения.
bot.on(":text", async (ctx) => {

		const upsertUser = await prisma.driver.findUnique({
			where: {
				tId: String(ctx.message.from.id)
			}})
		if(!upsertUser){
			ctx.reply('Начните с нажатия на кнопку /start');
			 return; }

			 
			 
		if(upsertUser.state === 'bornDate' && ctx.message.text.split('.').length !== 3){
			ctx.reply('Ошибка: Введите в формате День.Месяц.Год');
			return; }
			if(upsertUser.state === 'end'){
				ctx.reply('Опрос закончен, Спасибо!');
				return
		} 
					
					



		const index = Object.keys(STATES).findIndex(key => key === upsertUser.state);
		const newState = Object.keys(STATES)[index + 1];


		if(newState === 'phone'){ 
			const shareKeyboard = new Keyboard() .requestContact("Контакт") .resized();
			await ctx.reply("Поделитесь телефоном?", {
				reply_markup: shareKeyboard,
			});
			return
		}


		await prisma.driver.update({
			where: {
				tId: String(ctx.message.from.id)
			},
			data: {
				state: newState,
				[upsertUser.state]: ctx.message.text
			}
		});



		console.log('finish')
	ctx.reply(STATES[newState]);
});




bot.on(":contact", async (ctx) => {
	await ctx.reply("Спасибо за контакт!")
   })


bot.on("message:photo", async (ctx) => {
	// 1935,6128389355

	console.log(ctx.update.message.message_id, ctx.update.message.chat.id,);
	
	await ctx.reply("Спасибо за фото!")
   })