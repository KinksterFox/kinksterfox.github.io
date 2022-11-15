class Card {
    constructor(name, description, image, ranks, element, level) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.ranks = ranks;
        this.element = element;
        this.level = level;
    }

    compare(opposingCard, direction) {
        if (this.ranks[0] < opposingCard.ranks[2]) {

        }
        if (this.ranks[1] < opposingCard.ranks[3]) {

        }
        if (this.ranks[2] < opposingCard.ranks[0]) {

        }
        if (this.ranks[3] < opposingCard.ranks[1]) {

        }
    }

    toString() {
        return `Name: ${this.name}\nImage: ${this.image}\nValues:\n ${this.ranks[0]}\n${this.ranks[1]} ${this.ranks[2]}\n ${this.ranks[3]} \nElement: ${this.element}`;
    }
};

class Fieldposition {

    placeCard(card, player) {

    }

    changePlayer() {

    }

    toString() {

    }
};

class Playingfield {

    placeCard(x, y, card, player) {

    }

    viewCard(x, y) {

    }

    viewPlayer(x, y) {

    }

    getScore() {

    }

    toString() {

    }
};

const cockatriceRank = [2, 1, 2, 6];
const cockatrice = new Card({
    name: 'Cockatrice',
    image: 'cockatrice.png',
    ranks: cockatriceRank,
    level: 1,
});

cockatriceRank[3] = 1;

const bahamut = new Card({
    name: 'Bahamut',
    image: 'bahamut.png',
    ranks: [10, 8, 2, 6],
    level: 9,
});

const doomtrain = new Card({
    name: 'Doomtrain',
    image: 'doomtrain.png',
    ranks: [3, 1, 10, 10],
    element: 'poison',
    level: 9,
});

const ifrit = new Card({
    name: 'Ifrit',
    image: 'ifrit.png',
    ranks: [9, 6, 2, 8],
    element: 'fire',
    level: 8,
});

const quezacotl = new Card({
    name: 'Quezacotl',
    image: 'quezacotl.png',
    ranks: [2, 9, 9, 4],
    element: 'lightning',
    level: 8,
});

const shiva = new Card({
    name: 'Shiva',
    image: 'shiva.png',
    ranks: [6, 7, 4, 9],
    element: 'ice',
    level: 8,
});

const tonberry = new Card("Tonberry", "A monster", "Tonberry.png", [7, 2, 2, 2], "Neutral", 1);

console.log(tonberry.toString());