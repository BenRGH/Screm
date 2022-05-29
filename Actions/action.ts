import DiscordJs from "discord.js";

abstract class Action {
    rules: string[];

    constructor(rules: string[]) {
        this.rules = rules;
    }

    abstract match(message: string): boolean;

    abstract execute(messageEvent: DiscordJs.Message<boolean>): void;
}

export default Action;