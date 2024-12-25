class Enemy {
    static idCounter = 0;

    constructor(type, name, level, speed, health, bladesImage, imageLocation) {
        this.type = type;
        this.name = name;
        this.level = level;
        this.speed = speed;
        this.health = health;
        this.bladesImage = bladesImage;
        this.imageLocation = imageLocation;
        this.id = Enemy.idCounter++;
        this.container = null;
        this.healthBar = null;
        this.damageTaken = 0;
    }

    // Render an enemy on the screen
    render(xPosition) {
        this.container = document.createElement('div');
        this.container.classList.add(this.type, "enemy");
        this.container.id = `enemy-${this.id}`;
        this.container.style.left = `${xPosition}px`;

        this.addHealthBar();

        if (this.type === 'airplane') {
            this.addAirplaneImage();
        } else if (this.type === 'helicopter') {
            this.addHelicopterImage();
        } else {
            console.error(`Unknown enemy type: ${this.type}`);
            return null;
        }

        this.container.style.animation = `moveDown ${this.speed}s linear infinite`;

        // Bind this instance to the DOM element for easy access later
        this.container.instance = this;

        return this.container;
    }

    // Add a health bar to the enemy
    addHealthBar() {
        const healthBarContainer = document.createElement('div');
        healthBarContainer.className = 'health-bar-container';

        const healthBar = document.createElement('div');
        healthBar.className = 'health-bar';
        healthBar.style.width = '100%';

        healthBarContainer.appendChild(healthBar);
        this.container.appendChild(healthBarContainer);

        this.healthBar = healthBar;
    }

    // Add an airplane image
    addAirplaneImage() {
        const airplaneImage = document.createElement('img');
        airplaneImage.src = this.imageLocation;
        this.container.appendChild(airplaneImage);
    }

    // Add a helicopter image and its blades
    addHelicopterImage() {
        const helicopterImage = document.createElement('img');
        helicopterImage.className = 'helicopter-image';
        helicopterImage.src = this.imageLocation;

        const bladesImage = document.createElement('img');
        bladesImage.className = 'helicopter-blades';
        bladesImage.src = this.bladesImage;

        this.container.appendChild(helicopterImage);
        this.container.appendChild(bladesImage);
    }

    // Handle taking damage
    takeDamage(damage, game) {
        this.damageTaken += damage;

        if (this.damageTaken >= this.health) {
            game.increaseScore(this.level * 5);
            this.destroy();
        } else {
            this.updateHealthBar();
        }
    }

    // Update the health bar width based on current health
    updateHealthBar() {
        const remainingHealthPercentage = ((this.health - this.damageTaken) / this.health) * 100;
        this.healthBar.style.width = `${remainingHealthPercentage}%`;
    }

    // Destroy the enemy and create an explosion effect
    destroy() {
        const gameBox = document.getElementById('game-box');

        const explosionX = this.container.offsetLeft;
        const explosionY = this.container.offsetTop;

        // Create explosion element
        const explosion = document.createElement('div');
        explosion.classList.add('explosion', 'enemy-explosion');
        explosion.style.left = `${explosionX + 25}px`;
        explosion.style.top = `${explosionY + 25}px`;

        gameBox.appendChild(explosion);

        setTimeout(() => {
            explosion.remove();
        }, 800);

        this.erase();
    }

    erase() {
        this.container.remove();
        this.container.instance = null;
        this.container = null;
        this.healthBar = null;
    }
}

export default Enemy;