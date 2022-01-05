import "./dotenv"
import * as fs from "fs"
import Discord from "discord.js"
import {REST} from "@discordjs/rest"
import {Routes} from "discord-api-types/v9"
import {SlashCommandBuilder} from "@discordjs/builders"
import modes from "./modules"
import {myId} from "./globals"
import {__dirname} from "./globals"

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
                    ["mock", "mock"],
                    ["delete", "delete"],
                    ["off", "off"],
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

/** @returns {import("discord.js").ActivitiesOptions | undefined} */
const getStatusFromMode = () => {
    switch (mode) {
        case "mock":
            return {
                type: "COMPETING",
                name: 'the "most annoying" competition with Best Bot',
            }
        case "off":
            return undefined
        case "delete":
            return {
                type: "WATCHING",
                name: "Best Bot's messages disappear",
            }
        default:
            return undefined
    }
}

client.on("messageUpdate", async (...args) => {
    await modes[mode]?.onMessageUpdate?.(...args)
})

client.on("messageCreate", async (...args) => {
    await modes[mode]?.onMessageCreate?.(...args)
})

client.on("ready", async () => {
    try {
        mode = JSON.parse(fs.readFileSync(`${__dirname}/config.json`, "utf-8")).mode ?? "mock"
    } catch (err) {
        console.log(err)
    }

    client.user?.setPresence({
        status: "online",
        activities: [
            getStatusFromMode() ?? {
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

            if (Object.keys(modes).includes(selectedMode)) {
                mode = selectedMode

                client.user?.setPresence({
                    status: mode === "off" ? "idle" : "online",
                    activities: [
                        getStatusFromMode() ?? {
                            type: "PLAYING",
                            name: "with your mom",
                        },
                    ],
                })

                console.log(__dirname)

                try {
                    await fs.promises.writeFile(`${__dirname}/config.json`, JSON.stringify({mode}))
                } catch (err) {
                    console.log(err)
                }

                await interaction.reply(`Mode changed to ${mode}`)
            } else {
                await interaction.reply("Not a valid mode")
            }
        } else {
            await interaction.reply("Nice try, you can't do that")
        }
    }
})
