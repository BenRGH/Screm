import { Message } from "discord.js";

import { ContainsRule, messageBuilder, getGitCommit } from "../utils";
import Action from "./action";

class DebugAction extends Action {
    constructor() {
        super(["ping", "commit"]);
    }

    match(message: string): boolean {
        return ContainsRule(message, this.rules);
    }

    async execute(messageEvent: Message, message: string): Promise<void> {
        if (ContainsRule(message, ["ping"])) {
            messageEvent.reply(
                messageBuilder(
                    "pong",
                )
            );
        } else if (ContainsRule(message, ["commit"])) {
            const commit = await getGitCommit();
            messageEvent.reply(
                messageBuilder(JSON.stringify({
                    author: commit.committer.name,
                    message: commit.subject,
                }))
            );
        }
    }
}

export default DebugAction;