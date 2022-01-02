import "./dotenv.mjs"
import Discord from "discord.js"

const botId = "922575933515395092"

const client = new Discord.Client({
    intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"],
})

client.login(process.env.AUTHTOKEN)

/** @type {{[key: string]: import('discord.js').Message}} */
const messageMap = {}

// client.on("messageUpdate", async (message) => {
//     if (message.author.id === botId && message.deletable) {
//         try {
//             await Promise.allSettled([message.delete(), messageMap[message.id]?.delete()])

//             delete messageMap[message.id]
//         } catch {}
//     }
// })

client.on("messageCreate", async (message) => {
    if (message.author.id === botId) {
        // if (message.content.startsWith("Did you think I would @ everyone?")) {
        //     setTimeout(async () => {
        //         if (message.editedTimestamp !== message.createdTimestamp) {
        //             messageMap[message.id] = await message.reply(
        //                 "Ok, I'll do it for you. @everyone",
        //             )
        //         }
        //     }, 5000)
        // } else {
        //     if (message.deletable) {
        //         try {
        //             await message.delete()
        //         } catch {}
        //     }
        // }
        if (message.deletable) {
            try {
                await message.delete()
            } catch {}
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
