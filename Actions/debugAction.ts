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

    async execute(messageEvent: Message): Promise<void> {
        // TODO: bad, each action should be for one thing.
        if (ContainsRule(messageEvent.content, ["ping"])) {
            messageEvent.reply(
                messageBuilder(
                    "pong",
                )
            );
        } else if (ContainsRule(messageEvent.content, ["commit"])) {
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