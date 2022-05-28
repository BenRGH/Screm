import { MessageAttachment } from "discord.js";
import { Commit, getLastCommit } from "git-last-commit";

import emoticons from "./Library/emoticons";
import imgUrls from "./Library/imgUrls";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomImageUrl(images: string[] = imgUrls) {
    return images[getRandomInt(0, images.length - 1)];
}

export function getRandomEmoticon() {
    return emoticons[getRandomInt(0, emoticons.length - 1)];
}

// Checking if string contains any string held within the rules array.
export const ContainsRule = (str: string, rules: string[]) => rules.some(rule => str.toLowerCase().includes(rule));

export interface IImageAttachment {
    imageUrl: string,
    imageName: string,
}

export function messageBuilder(content: string, imageAttachment?: IImageAttachment) {
    return {
        content,
        files: imageAttachment !== undefined
            ? [
                new MessageAttachment(imageAttachment.imageUrl, imageAttachment.imageName),
            ]
            : [],
    };
}

export async function getGitCommit(): Promise<Commit> {
    return new Promise((resolve, reject) => {
        getLastCommit((err, commit) => {
            if (err) {
                reject(err);
            } else {
                resolve(commit);
            }
        });
    });
}