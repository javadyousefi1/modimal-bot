// telegraf
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

// env
const dotenv = require("dotenv");
const { connectDb } = require("./config/connect.db");
dotenv.config();

async function test() {
  const result = await connectDb();
  const database = result.db("modimal");
  const collection = database.collection("users");
  const documents = await collection.find({}).toArray();
  console.log(documents);
}

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome to modimal telegram bot 😍"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));

bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.hears("users", async (ctx) => {
  const result = await connectDb();
  const database = result.db("modimal");
  const collection = database.collection("users");
  const documents = await collection.find({}).toArray();

  const peopleString = documents
    .map((person, index) => `${index + 1} - ${person.firstName} ${person.lastName}`)
    .join("\n");
  console.log(peopleString);

  ctx.reply("here you are , the list of modimal users list :");
  ctx.reply(peopleString);
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
