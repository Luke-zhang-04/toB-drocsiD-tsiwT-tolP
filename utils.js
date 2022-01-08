/** @param {import("discord.js").Message | undefined | null} message */
export const getMessageReply = (message) => {
    return message?.channel.messages.cache.find(
        (_message) => _message.id === message.reference?.messageId,
    )
}
