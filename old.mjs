import Discord from "discord.js"
import {choice} from "@luke-zhang-04/utils/random.js"
import dotenv from "dotenv"

const botId = "922575933515395092"
const channelId = "909649528385314837"

dotenv.config()

const client = new Discord.Client({
    intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"],
})

client.login(process.env.AUTHTOKEN)

const names = [
    "nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssiiiiiiiiiiiiiiiiiiffffffffffffffffffffff",
    "ssssssssssssssssssssssssssssssssssseeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaannnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    "sssssssssssssssssssssssssssssssssssttttttttttttttttttttttttttteeeeeeeeeeeeeeeeeeeevvvvvvvvvvvvvvvvvvveeeeeeeeeennnnnnnnn",
]

const message = `is a bbbbbbbbbbbbbboooooooooooooooooottttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt`

/** @type {Discord.TextChannel | undefined} */
let botChannel
let isAssassinating = false
let isOnline = false

const checkIfOnline = async () => {
    /** @type {Discord.TextChannel} */
    const channel = (botChannel ??= await client.channels.fetch(channelId))

    const bot = channel.members.find((member) => member.id === botId)

    isOnline = bot !== null && bot.presence !== null && bot.presence.status !== "offline"
}

const assassinate = async () => {
    /** @type {Discord.TextChannel} */
    const channel = (botChannel ??= await client.channels.fetch(channelId))

    channel.send({content: `${choice(names)} ${message}`})
}

let assassinationInterval

client.once("ready", () => {
    console.log("Bot is online!")

    client.user?.setPresence({
        status: "online",
        activities: [
            {
                name: "with your mom",
                type: "PLAYING",
            },
        ],
    })

    setInterval(async () => {
        await checkIfOnline()

        if (isOnline) {
            if (!isAssassinating) {
                isAssassinating = true

                botChannel?.members
                    .find((member) => member.id === "497586129973805056")
                    .send("FOUND BOT ONLINE")

                client.channels.cache
                    .find((channel) => channel.id === "890682964101435392")
                    ?.send("FOUND <@922575933515395092> ONLINE")

                assassinationInterval = setInterval(assassinate, 900)
            }
        } else {
            if (isAssassinating) {
                isAssassinating = false

                botChannel?.members
                    .find((member) => member.id === "497586129973805056")
                    .send("BOT IS DEAD LMAO")

                client.channels.cache
                    .find((channel) => channel.id === "890682964101435392")
                    ?.send("<@922575933515395092> IS DEAD LMAO :rofl: :joy: :ok_hand:")
            }

            if (assassinationInterval !== undefined) {
                clearInterval(Number(`${assassinationInterval}`))

                assassinationInterval = undefined
            }
        }
    }, 5000)
})

client.on("presenceUpdate", (_, newPresence) => {
    if (newPresence.member.id === botId) {
        isOnline = newPresence.status !== "offline"
    }
})
