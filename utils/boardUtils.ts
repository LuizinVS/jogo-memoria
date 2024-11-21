import { EMOJIS } from "../constants/emojis";

const getRandomEmojis = (arr: string[], count: number): string[] => {
    const randomEmojis = new Set<string>();

    while (randomEmojis.size < count) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        randomEmojis.add(arr[randomIndex]);
    }

    return [...randomEmojis];
}

export const getInitialCards = (): string[] => {
    const emojis = getRandomEmojis(EMOJIS, 8);

    return emojis.concat(emojis).sort(() => Math.random() - 0.5);
}