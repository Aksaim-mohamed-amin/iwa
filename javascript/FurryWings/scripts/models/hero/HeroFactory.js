import Hero from './Hero.js';

class HeroFactory {
    constructor() {
        this.prototypes = [];
    }

    // parse heros from json file
    async load(jsonFile) {
        const response = await fetch(jsonFile);
        const data = await response.json();

        this.prototypes = data;
    }

    // deploy a hero
    create(currentLevel) {
        let qualifiedHero = this.prototypes.find(hero => hero.level === currentLevel);
        
        let hero = new Hero(qualifiedHero.name, qualifiedHero.level, qualifiedHero.health, qualifiedHero.imageLocation);
        
        return hero.render();
    }
}

export default HeroFactory;