import { Message } from "discord.js";
import firebaseCollection from "../firebaseCollection";
import { IImageAttachment } from "../types";

import {
    ContainsRule,
    getRandomEmoticon,
    getRandomImageUrl,
    messageBuilder,
} from "../utils";
import Action from "./action";

class LunaAction extends Action {
    constructor() {
        super(["luna", "toby"]);
    }

    match(message: string): boolean {
        return ContainsRule(message, this.rules);
    }

    async execute(messageEvent: Message): Promise<void> {
        messageEvent.channel.send(
            messageBuilder(getRandomEmoticon(), {
                imageName: "luna.png",
                imageUrl: await getRandomImageUrl(firebaseCollection.luna),
            } as IImageAttachment)
        );
    }
}

export default LunaAction;
