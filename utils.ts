import { MessageAttachment } from "discord.js";
import firebaseCollection from "./firebaseCollection";
const { getFirestore } = require('firebase-admin/firestore');

import emoticons from "./Library/emoticons";
import { IImageAttachment, IFirebaseImage } from "./types";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function getRandomImageUrl(collection: firebaseCollection): Promise<string> {
    const db = getFirestore();
    const snapshot = await db.collection(collection).get();
    const index = getRandomInt(0, snapshot.size - 1);
    console.log(`fetching image from index ${index} of collection ${collection}`);

    if (snapshot === undefined || snapshot.size === 0 || snapshot.docs[index] === undefined) {
        return "https://imgur.com/AHeOdCF.jpg";
    }

    const image: IFirebaseImage = snapshot.docs[index].data();

    return image.uri;
}

export function getRandomEmoticon() {
    return emoticons[getRandomInt(0, emoticons.length - 1)];
}

// Checking if string contains any string held within the rules array.
export const ContainsRule = (str: string, rules: string[]) => rules.some(rule => str.toLowerCase().includes(rule));

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