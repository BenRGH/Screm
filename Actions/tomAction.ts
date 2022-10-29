import { Message } from "discord.js";
import { firebaseCollection } from "../firebaseCollection";

import { IImageAttachment } from "../types";
import {
    ContainsRule,
    getRandomImageUrl,
    messageBuilder
} from "../utils";
import Action from "./action";

class TomAction extends Action {
    constructor() {
        super(["tom", "tommy", "thomas"]);
    }

    match(message: string): boolean {
        return ContainsRule(message, this.rules);
    }

    async execute(messageEvent: Message): Promise<void> {
        messageEvent.channel.send(
            messageBuilder(
                "meow?",
                {
                    imageName: "tom.png",
                    imageUrl: await getRandomImageUrl(firebaseCollection.tom),
                } as IImageAttachment,
            )
        );
    }
}

export default TomAction;