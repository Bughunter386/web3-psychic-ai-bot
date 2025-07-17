const { Telegraf } = require("telegraf");
const OPENAI = require("openai");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ New SDK format
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

bot.start((ctx) =>
  ctx.reply(
    "🔮 Welcome to Web3 Psychic AI! Ask me anything about crypto, tokenomics, trends or listings."
  )
);

bot.on("text", async (ctx) => {
  try {
    const prompt = ctx.message.text;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are Web3 Psychic AI, a crypto expert assistant who gives accurate insights on tokenomics, trends, meme coins, and exchange listings.",
        },
        { role: "user", content: prompt },
      ],
    });

    ctx.reply(response.choices[0].message.content);
  } catch (err) {
    console.error(err);
    ctx.reply("⚠️ Psychic servers are overwhelmed. Try again soon!");
  }
});

bot.launch();
console.log("🤖 Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
