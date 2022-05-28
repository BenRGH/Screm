import { Message } from "discord.js";

import {
    ContainsRule,
    getRandomEmoticon,
    getRandomImageUrl,
    IImageAttachment,
    messageBuilder
} from "../utils";
import Action from "./action";

class ScremAction extends Action {
    constructor() {
        super(["screm", "scream", "scram"]);
    }

    match(message: string): boolean {
        return ContainsRule(message, this.rules);
    }

    execute(messageEvent: Message): void {
        messageEvent.channel.send(
            messageBuilder(
                getRandomEmoticon(),
                {
                    imageName: "screm.png",
                    imageUrl: getRandomImageUrl(),
                } as IImageAttachment,
            )
        );
    }
}

export default ScremAction;