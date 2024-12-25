import Weapon from './Weapon.js';

class WeaponFactory {
    constructor() {
        this.prototypes = [];
    }

    // parse weapons from json file
    async load(jsonFile) {
        const response = await fetch(jsonFile);
        const data = await response.json();

        this.prototypes = data;
    }

    // deploy a missile
    createMissile(type, currentLevel, xPosition, yPosition) {
        let qualifiedPrototypes = this.prototypes.filter(weapon => weapon.level <= currentLevel);
        let randomIndex = Math.floor(Math.random() * qualifiedPrototypes.length);
        let prototype = qualifiedPrototypes[randomIndex];

        let weapon = new Weapon(prototype.level, prototype.speed, prototype.damage, prototype.imageLocation);
        
        return weapon.render(type, xPosition, yPosition);
    }
}

export default WeaponFactory;