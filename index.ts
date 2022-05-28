import DiscordJs, {
    Intents,
    Message,
    MessageAttachment
} from "discord.js";
import dotenv from "dotenv";

import { ContainsRule, getRandomEmoticon, getRandomImageUrl, IImageAttachment, messageBuilder } from "./utils";
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

client.on("ready", () => console.log("Oh I am ready!"));

client.on("messageCreate", (messageEvent:Message) => {
    const message = messageEvent.content;
    switch (true) {
        case ContainsRule(message, screamRules):
            messageEvent.channel.send(
                messageBuilder(
                    getRandomEmoticon(),
                    {
                        imageName: "screm.png",
                        imageUrl: getRandomImageUrl(),
                    } as IImageAttachment,
                )
            );
            break;
        case ContainsRule(message, tomRules):
            messageEvent.channel.send({
                content: "meow?",
                files: [
                    new MessageAttachment(getRandomImageUrl(tomUrls), "tom.png"),
                ],
            });
            break;
        case ContainsRule(message, testRules):
            messageEvent.reply({
                content: "pong",
                files: [],
            });
            break;
    }
});

client.login(process.env.TOKEN);
