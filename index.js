import "./dotenv"
import Discord from "discord.js"
import {REST} from "@discordjs/rest"
import {Routes} from "discord-api-types/v9"
import {SlashCommandBuilder} from "@discordjs/builders"
import modes from "./modules"
import {myId} from "./globals"

const commands = [
    new SlashCommandBuilder()
        .setName("mode")
        .setDescription("Change bot mode")
        .addStringOption((option) =>
            option
                .setName("mode")
                .setDescription("Change bot mode")
                .setRequired(true)
                .addChoices([
                    ["mock", "Mock Best Bot"],
                    ["delete", "Delete all messages from Best Bot"],
                ]),
        )
        .toJSON(),
]

const client = new Discord.Client({
    intents: ["DIRECT_MESSAGES", "GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"],
})
const rest = new REST({version: "9"}).setToken(process.env.AUTHTOKEN)

client.login(process.env.AUTHTOKEN)

let mode = "mock"

client.on("messageUpdate", modes[mode]?.onMessageUpdate ?? (() => {}))

client.on("messageCreate", modes[mode]?.onMessageCreate ?? (() => {}))

client.on("ready", async () => {
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

    try {
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        })
    } catch (error) {
        console.error(error)
    }
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return

    if (interaction.commandName === "mode") {
        if (interaction.member.permissions.has("ADMINISTRATOR") || interaction.user.id === myId) {
            const selectedMode = interaction.options.getString("mode")

            if (selectedMode in modes) {
                mode = selectedMode

                await interaction.reply(`Mode changed to ${mode}`)
            } else {
                await interaction.reply("Not a valid mode")
            }
        } else {
            await interaction.reply("Nice try, you can't do that")
        }
    }
})
