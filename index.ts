import DiscordJs, {
    Intents,
    MessageAttachment,
    MessageEmbed,
} from "discord.js";
import dotenv from "dotenv";
import { getRandomEmoticon, getRandomImageUrl } from "./utils";

dotenv.config();

const client = new DiscordJs.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    switch (message.content) {
        case "screm":
            message.channel.send({
                content: getRandomEmoticon(),
                files: [
                    new MessageAttachment(getRandomImageUrl(), "screm.png"),
                ],
            });
            break;
        case "ping":
            message.reply({
                content: "pong",
                files: [],
            });
            break;
    }
});

client.login(process.env.TOKEN);
