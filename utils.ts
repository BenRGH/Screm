import emoticons from "./Library/emoticons";
import imgUrls from "./Library/imgUrls";

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomImageUrl() {
    return imgUrls[getRandomInt(0, imgUrls.length - 1)];
}

export function getRandomEmoticon() {
    return emoticons[getRandomInt(0, emoticons.length - 1)];
}
