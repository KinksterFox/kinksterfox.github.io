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

    }

    toString() {

    }
};

const tonberry = new Card("Tonberry", "A monster", "Tonberry.png", [7, 2, 2, 2], "Neutral", 1);
console.log(tonberry);

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