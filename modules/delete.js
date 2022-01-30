import {blacklist, botId} from "../globals"

/** @type {{[key: string]: import('discord.js').Message}} */
const messageMap = {}

/** @param {{[key: string]: import('discord.js').Message}} message */
export const onMessageUpdate = async (message) => {
    if (blacklist.includes(message.author.id) && message.deletable) {
        try {
            await Promise.allSettled([message.delete(), messageMap[message.id]?.delete()])

            delete messageMap[message.id]
        } catch {}
    }
}

/** @param {{[key: string]: import('discord.js').Message}} message */
export const onMessageCreate = async (message) => {
    if (message.author.id === botId) {
        if (message.content.startsWith("Did you think I would @ everyone?")) {
            setTimeout(async () => {
                await message.fetch(true)

                if (message.editedTimestamp !== message.createdTimestamp) {
                    messageMap[message.id] = await message.reply(
                        "Ok, I'll do it for you. @everyone",
                    )
                }
            }, 10_000)
        } else {
            if (message.deletable) {
                try {
                    await message.delete()
                } catch {}
            }
        }
    }
}

export const onPresenceUpdate = undefined
export const onStart = undefined
export const onFinish = undefined
