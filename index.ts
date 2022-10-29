import DiscordJs, {
    Intents,
    Message,
} from "discord.js";
import dotenv from "dotenv";

import actions from "./Actions/actions";
import Action from "./Actions/action";

// Set up
dotenv.config();

const client = new DiscordJs.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => console.log("Oh I am ready!"));

client.on("messageCreate", (messageEvent:Message) => {
    const message = messageEvent.content;
    console.log(`message read: ${message}`)

    actions.forEach((action: Action) => {
        if (action.match(message)) {
            action.execute(messageEvent);
        }
    });
});

client.login(process.env.TOKEN);
