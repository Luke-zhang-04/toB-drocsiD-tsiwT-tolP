import {botId} from "../globals"

export const onMessageCreate = undefined

/** @param {{[key: string]: import('discord.js').Message}} message */
export const onMessageUpdate = async (message) => {
    if (message.author.id === botId) {
        const messageContent = (await message.fetch(true)).content

        if (messageContent.includes("Note: plz give")) {
            const response = messageContent.split("\n")[2].trim()

            if (response.includes("not ")) {
                message.reply(
                    `No, ${response
                        .replace(/not /giu, "")
                        .replace(
                            / (are|is|am) /iu,
                            " **$1** ",
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
}
