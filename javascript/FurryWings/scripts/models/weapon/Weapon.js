class Weapon {
    static idCounter = 0;
    constructor(level, speed, damage, imageLocation) {
        this.level = level;
        this.speed = speed;
        this.damage = damage;
        this.imageLocation = imageLocation;
        this.id = Weapon.idCounter++;
        this.container = null;
    }

    // render a missile
    render(type = "enemy", xPosition, yPosition) {
        this.container = document.createElement('div');

        // Determine missile class based on type
        this.container.className = type === "hero" ? "hero-missile" : "enemy-missile";
        this.container.id = `${type}-missile-${this.id}`;

        this.container.style.backgroundImage = `url(${this.imageLocation})`;

        // Adjust position based on type
        this.container.style.top = `${type === "hero" ? yPosition - 70 : yPosition}px`;
        this.container.style.left = `${xPosition}px`;

        // Adjust animation based on type
        this.container.style.animation = type === "hero" ? `heroBullet ${this.speed}s linear` : `bullet ${this.speed}s linear`;

        this.container.instance = this;

        return this.container;
    }


    destroy() {
        const gameBox = document.getElementById('game-box');

        const explosionX = this.container.offsetLeft;
        const explosionY = this.container.offsetTop;
    
        // Create explosion element
        const explosion = document.createElement('div');
        explosion.classList.add('explosion', 'missile-explosion');
        explosion.style.left = `${explosionX}px`;
        explosion.style.top = `${explosionY}px`;
    
        gameBox.appendChild(explosion);
    
        setTimeout(() => {
            explosion.remove();
        }, 500);
    
        this.erase();
    }

    erase() {
        this.container.remove();
        this.container.instance = null;
        this.container = null;
        this.healthBar = null;
    }
}

export default Weapon;