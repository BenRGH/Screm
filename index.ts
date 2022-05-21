import DiscordJs, {
    Intents,
    MessageAttachment,
    MessageEmbed,
} from "discord.js";
import dotenv from "dotenv";
import { getRandomEmoticon, getRandomImageUrl } from "./utils";
import { tomUrls } from "./Library/imgUrls";

dotenv.config();

const client = new DiscordJs.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    switch (message.content.toLowerCase()) {
        case "screm":
            message.channel.send({
                content: getRandomEmoticon(),
                files: [
                    new MessageAttachment(getRandomImageUrl(), "screm.png"),
                ],
            });
            break;
        case "tom":
        case "tommy":
        case "thomas":
            message.channel.send({
                content: "meow?",
                files: [
                    new MessageAttachment(
                        getRandomImageUrl(tomUrls),
                        "tom.png"
                    ),
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
