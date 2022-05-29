import { Message } from "discord.js";

import { tomUrls } from "../Library/imgUrls";
import {
    ContainsRule,
    getRandomImageUrl,
    IImageAttachment,
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

    execute(messageEvent: Message): void {
        messageEvent.channel.send(
            messageBuilder(
                "meow?",
                {
                    imageName: "tom.png",
                    imageUrl: getRandomImageUrl(tomUrls),
                } as IImageAttachment,
            )
        );
    }
}

export default TomAction;