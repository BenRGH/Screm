import { Message } from "discord.js";

import {
    ContainsRule,
    messageBuilder
} from "../utils";
import Action from "./action";

class DebugAction extends Action {
    constructor() {
        super(["ping", "poo"]);
    }

    match(message: string): boolean {
        return ContainsRule(message, this.rules);
    }

    async execute(messageEvent: Message): Promise<void> {
        // TODO: bad, each action should be for one thing.
        if (ContainsRule(messageEvent.content, ["ping"])) {
            messageEvent.reply(
                messageBuilder(
                    "pong 💩",
                )
            );
        }
    }
}

export default DebugAction;