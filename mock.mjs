import Discord from "discord.js"
import dotenv from "dotenv"

const botId = "922575933515395092"

dotenv.config()

const client = new Discord.Client({
    intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"],
})

client.login(process.env.AUTHTOKEN)

client.on("messageCreate", (message) => {
    if (message.author.id === botId) {
        if (message.content.includes("Did you think I would @ everyone?")) {
            message.reply("Ok, I'll do it for you. @everyone")
        }
    }
})

client.on("messageUpdate", async (message) => {
    if (message.author.id === botId) {
        const messageContent = (await message.fetch(true)).content

        if (messageContent.includes("Note: plz give")) {
            const response = messageContent.split("\n")[2].trim()

            if (response.includes("not ")) {
                message.reply(
                    `No, ${response
                        .replace(/not /giu, "")
                        .replace(
                            /(are|is|am)/iu,
                            "**$1**",
                        )}, ThE tRuTh wAs RiGhT iN fRoNt Of YoU tHe WhOlE tImE...`,
                )
            } else {
                const content = response.split(" ")

                message.reply(
                    `No, ${content.slice(0, content.length - 1).join(" ")} **not** ${
                        content[content.length - 1]
                    }, ThE tRuTh wAs RiGhT iN fRoNt Of YoU tHe WhOlE tImE...`,
                )
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
