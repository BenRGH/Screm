import { Message } from "discord.js";

import {
    ContainsRule,
    messageBuilder
} from "../utils";
import Action from "./action";

class DebugAction extends Action {
    constructor() {
        super(["ping"]);
    }

    match(message: string): boolean {
        return ContainsRule(message, this.rules);
    }

    async execute(messageEvent: Message): Promise<void> {
        messageEvent.reply(
            messageBuilder(
                "pong 🏓",
            )
        );
    }
}

export default DebugAction;