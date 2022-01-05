import {botId} from "../globals"

const mockMessage = "tHe TrUtH wAs RiGhT iN fRoNt Of YoU tHe WhOlE tImE..."

export const onMessageCreate = undefined

/** @param {import('discord.js').Message} message */
export const onMessageUpdate = async (message) => {
    if (
        message.author.id === botId &&
        message.channel.messages.cache.find(
            (_message) => _message.id === message.reference?.messageId,
        )?.author.id !== "926600995042103397"
    ) {
        const messageContent = (await message.fetch(true)).content

        if (messageContent.includes("Note: plz give")) {
            const randomNumber = Math.random()

            if (randomNumber < 0.5) {
                const response = messageContent.split("\n")[2].trim()

                if (response.includes("not ")) {
                    await message.reply(
                        `No, ${response
                            .replace(/not /giu, "")
                            .replace(/ (are|is|am) /iu, " **$1** ")}, ${mockMessage}`,
                    )
                } else {
                    const content = response.split(" ")

                    await message.reply(
                        `No, ${content.slice(0, content.length - 1).join(" ")} **not** ${
                            content[content.length - 1]
                        }, ${mockMessage}`,
                    )
                }
            } else if (randomNumber < 0.65) {
                await message.reply(`stfu ${mockMessage}`)
            } else if (randomNumber < 0.8) {
                await message.reply("who?").then(
                    (reply) =>
                        new Promise((resolve) => {
                            setTimeout(async () => {
                                await reply.edit("who asked?")

                                resolve()
                            }, 1000)
                        }),
                )
            } else {
                await message.reply(`:middle_finger: ${mockMessage}`)
            }
        }
    }
}
