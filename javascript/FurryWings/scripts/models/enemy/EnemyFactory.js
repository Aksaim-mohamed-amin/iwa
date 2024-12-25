import Enemy from "./Enemy.js";

class EnemyFactory {
    constructor() {
        this.prototypes = [];
    }

    // Parse enemies from JSON file
    async load(enemiesJson) {
        const response = await fetch(enemiesJson);
        const data = await response.json();

        this.prototypes = data;
    }

    // Deploy an enemy based on level and position
    create(currentLevel, xPosition) {
        let qualifiedPrototypes = this.prototypes.filter(enemy => enemy.level <= currentLevel);
        let randomIndex = Math.floor(Math.random() * qualifiedPrototypes.length);
        let prototype = qualifiedPrototypes[randomIndex];
        
        let enemy = new Enemy(prototype.type, prototype.name, prototype.level, prototype.speed, prototype.health, prototype.bladesImage, prototype.imageLocation);

        return enemy.render(xPosition);
    }
}

export default EnemyFactory;