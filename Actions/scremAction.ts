import { Message } from "discord.js";
import firebaseCollection from "../firebaseCollection";
import { IImageAttachment } from "../types";

import {
    ContainsRule,
    getRandomEmoticon,
    getRandomImageUrl,
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

    async execute(messageEvent: Message): Promise<void> {
        messageEvent.channel.send(
            messageBuilder(
                getRandomEmoticon(),
                {
                    imageName: "screm.png",
                    imageUrl: await getRandomImageUrl(firebaseCollection.screm),
                } as IImageAttachment,
            )
        );
    }
}

export default ScremAction;