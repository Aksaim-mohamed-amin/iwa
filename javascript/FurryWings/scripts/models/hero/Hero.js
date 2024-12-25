class Hero {
    static idCounter = 0;
    constructor(name, level, health, imageLocation) {
        this.name = name;
        this.level = level;
        this.health = health;
        this.imageLocation = imageLocation;
        this.followingMouse = false;
        this.damageTaken = 0;
        this.id = Hero.idCounter++;
        this.container = null;
        this.healthBar = null;

        // Movement properties
        this.speed = 5;
        this.movement = { up: false, down: false, left: false, right: false };
    }

    // Render an instance of the hero
    render() {
        this.container = document.createElement('div');
        this.container.className = 'hero';
        this.container.id = `hero-${this.id}`;

        const heroImage = document.createElement('img');
        heroImage.src = this.imageLocation;
        this.container.appendChild(heroImage);

        const healthBarContainer = document.createElement('div');
        healthBarContainer.className = 'health-bar-container';

        const healthBar = document.createElement('div');
        healthBar.className = 'health-bar';
        healthBar.style.width = `${(this.health - this.damageTaken) * 100 / this.health}%`;

        healthBarContainer.appendChild(healthBar);
        this.container.appendChild(healthBarContainer);

        this.container.addEventListener("click", () => {
            this.followingMouse = !this.followingMouse;
        });

        // Allow hero to follow mouse on click
        document.addEventListener("mousemove", (event) => {
            if (this.followingMouse) {
                const gameBoxRect = document.getElementById('game-box').getBoundingClientRect();
                const x = event.clientX - gameBoxRect.left;
                const y = event.clientY - gameBoxRect.top;

                this.x = x;
                this.y = y - 25;
                this.container.style.left = `${x}px`;
                this.container.style.top = `${y - 25}px`;
            }
        });

        // Keyboard movement
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
        document.addEventListener("keyup", (event) => this.handleKeyUp(event));

        // Start movement loop
        this.startMovement();

        this.healthBar = healthBar;
        this.container.instance = this;

        return this.container;
    }

    // Handle key press
    handleKeyDown(event) {
        event.preventDefault();
        switch (event.key) {
            case "ArrowUp":
            case "w":
            case "W":
                this.movement.up = true;
                break;
            case "ArrowDown":
            case "s":
            case "S":
                this.movement.down = true;
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                this.movement.left = true;
                break;
            case "ArrowRight":
            case "d":
            case "D":
                this.movement.right = true;
                break;
        }
    }

    // Handle key release
    handleKeyUp(event) {
        event.preventDefault();
        switch (event.key) {
            case "ArrowUp":
            case "w":
            case "W":
                this.movement.up = false;
                break;
            case "ArrowDown":
            case "s":
            case "S":
                this.movement.down = false;
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                this.movement.left = false;
                break;
            case "ArrowRight":
            case "d":
            case "D":
                this.movement.right = false;
                break;
        }
    }

    // Continuously update hero position
    startMovement() {
        const gameBox = document.getElementById('game-box');

        setInterval(() => {
            let x = this.container.offsetLeft;
            let y = this.container.offsetTop;

            if (this.movement.up && y > 0) {
                y -= this.speed;
            }
            if (this.movement.down && y < gameBox.offsetHeight - this.container.offsetHeight) {
                y += this.speed;
            }
            if (this.movement.left && x > 0) {
                x -= this.speed;
            }
            if (this.movement.right && x < gameBox.offsetWidth - this.container.offsetWidth) {
                x += this.speed;
            }

            this.container.style.left = `${x}px`;
            this.container.style.top = `${y}px`;
        }, 16);
    }

    // Take damage
    takeDamage(damage, game) {
        this.damageTaken += damage;
        if (this.damageTaken >= this.health) {
            game.decreaseLives();
            this.respawn();
        } else {
            this.updateHealthBar();
        }
    }

    // Respawn hero
    respawn() {
        this.container.click();

        this.container.classList.add('respawn-animation');
        this.healthBar.classList.add('respawn-animation');

        setTimeout(() => {
            this.container.style.left = '50%';
            this.container.style.top = '85%';
        }, 1000);

        setTimeout(() => {
            this.damageTaken = 0;
            this.updateHealthBar();

            this.container.classList.remove('respawn-animation');
            this.healthBar.classList.remove('respawn-animation');
        }, 3000);
    }

    // Update the health bar width based on current health
    updateHealthBar() {
        const remainingHealthPercentage = ((this.health - this.damageTaken) / this.health) * 100;
        this.healthBar.style.width = `${remainingHealthPercentage}%`;
    }

    destroy() {
        const gameBox = document.getElementById('game-box');

        const explosionX = this.container.offsetLeft;
        const explosionY = this.container.offsetTop;

        // Create explosion element
        const explosion = document.createElement('div');
        explosion.classList.add('explosion', 'enemy-explosion');
        explosion.style.left = `${explosionX}px`;
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

export default Hero;