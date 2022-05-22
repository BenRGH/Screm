import DiscordJs, {
    Intents,
    Message,
    MessageAttachment
} from "discord.js";
import dotenv from "dotenv";

import { getRandomEmoticon, getRandomImageUrl } from "./utils";
import { tomUrls } from "./Library/imgUrls";

// Set up
dotenv.config();

const client = new DiscordJs.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// The rules
const screamRules = ["scream", "screm", "scram"];
const tomRules = ["tom", "tommy", "thomas"];
const testRules = ["ping"];

// Checking if string contains any string held within the rules array.
const ContainsRule = (str: string, rules: string[]) => rules.some(rule => str.toLowerCase().includes(rule));

client.on("ready", () => console.log("Oh I am ready!"));

client.on("messageCreate", (messageEvent:Message) => {
    const message = messageEvent.content;
    if (ContainsRule(message, screamRules)) {
        messageEvent.channel.send({
            content: getRandomEmoticon(),
            files: [
                new MessageAttachment(getRandomImageUrl(), "screm.png"),
            ],
        });
    } else if (ContainsRule(message, tomRules)) {
        messageEvent.channel.send({
            content: "meow?",
            files: [
                new MessageAttachment(getRandomImageUrl(tomUrls), "tom.png"),
            ],
        });
    } else if (ContainsRule(message, testRules)) {
        messageEvent.reply({
            content: "pong",
            files: [],
        });
    }
});

client.login(process.env.TOKEN);
