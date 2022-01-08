import {botsChannelId as channelId, botId} from "../globals"
import Discord from "discord.js"
import {choice} from "@luke-zhang-04/utils/random.js"

const messageLimit = 1000
let messageCount = 0

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

    await channel.send({content: `${choice(names)} ${message}`})

    messageCount++
}

let assassinationInterval
let startInterval

export const onStart = () => {
    startInterval = setInterval(async () => {
        await checkIfOnline()

        if (messageCount > messageLimit) {
            if (isAssassinating) {
                isAssassinating = false
                messageCount = 0

                botChannel?.members
                    .find((member) => member.id === "497586129973805056")
                    .send(
                        "Message limit reached; best bot may have disabled bots or is taking it's sweet time to die",
                    )

                client.channels.cache
                    .find((channel) => channel.id === "890682964101435392")
                    ?.send(
                        "Message limit reached; <@922575933515395092> may have disabled bots or is taking it's sweet time to die",
                    )
            }

            if (assassinationInterval !== undefined) {
                clearInterval(Number(`${assassinationInterval}`))

                assassinationInterval = undefined
            }
        } else if (isOnline) {
            if (!isAssassinating) {
                isAssassinating = true
                messageCount = 0

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
                messageCount = 0

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
}

export const onFinish = () => {
    clearInterval(Number(`${startInterval}`))
}

export const onPresenceUpdate = () => {
    client.on("presenceUpdate", (_, newPresence) => {
        if (newPresence.member.id === botId) {
            isOnline = newPresence.status !== "offline"
        }
    })
}

export const onMessageCreate = undefined
export const onMessageUpdate = undefined
