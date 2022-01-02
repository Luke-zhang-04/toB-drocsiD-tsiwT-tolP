import Discord from "discord.js"
import dotenv from "dotenv"

const botId = "922575933515395092"

dotenv.config()

const client = new Discord.Client({
    intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"],
})

client.login(process.env.AUTHTOKEN)

client.on("messageUpdate", async (message) => {
    if (message.deletable) {
        try {
            await message.delete()
        } catch {}
    }
})

client.on("messageCreate", async (message) => {
    if (message.author.id === botId) {
        if (message.content.startsWith("Did you think I would @ everyone?")) {
            message.reply("Ok, I'll do it for you. @everyone")
        } else {
            if (message.deletable) {
                try {
                    await message.delete()
                } catch {}
            }
        }
    }
})

client.on("ready", () => {
    client.user?.setPresence({
        status: "online",
        activities: [
            {
                name: "with your mom",
                type: "PLAYING",
            },
        ],
    })

    console.log("Bot is online")
})
