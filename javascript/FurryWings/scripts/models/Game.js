import { getObjectXY, randomXPosition, isColliding, randMinMax } from './utils.js';

class Game {
    constructor(factories, gameBox) {
        this.heroFactory = factories.hero;
        this.enemyFactory = factories.enemy;
        this.weaponFactory = factories.weapon;
        this.score = 0;
        this.currentLevel = 1;
        this.finalLevel = 3;
        this.remainingLives = 3;
        this.enemyPositions = [];
        this.activeIntervals = [];
        this.gameBox = gameBox;
    }

    // Display game state
    updateGameStatsDisplay() {
        this.updateScoreDisplay();
        this.updateLivesDisplay();
        this.updateLevelDisplay();
    }
    updateScoreDisplay() {
        document.getElementById('score').innerText = `${this.score}`;
    }

    updateLivesDisplay() {
        const livesContainer = document.getElementById('lives');
        livesContainer.innerHTML = '';
        for (let i = 0; i < this.remainingLives; i++) {
            const heart = document.createElement('i');
            heart.className = 'bi bi-heart-fill heart';
            livesContainer.appendChild(heart);
        }

        if (this.remainingLives < 3) {
            const missingLives = 3 - this.remainingLives;
            for (let i = 0; i < missingLives; i++) {
                const heart = document.createElement('i');
                heart.className = 'bi bi-heart heart';
                livesContainer.appendChild(heart);
            }
        }
    }

    updateLevelDisplay() {
        const levelContainer = document.getElementById('level');
        levelContainer.innerHTML = '';
        for (let i = 0; i < this.currentLevel; i++) {
            const star = document.createElement('i');
            star.className = 'bi bi-star-fill star';
            levelContainer.appendChild(star);
        }
    }

    // Update stats
    increaseScore(points) {
        this.score += points;
        if (this.score % 10 == 0) {
            this.increaseLevel();
        }
        this.updateScoreDisplay();
    }
    increaseLevel() {
        if (this.currentLevel < this.finalLevel) {
            this.currentLevel++;
            this.updateLevelDisplay();
            this.upgradeHero();
        }
    }
    decreaseLives() {
        if (this.remainingLives > 0) {
            this.remainingLives--;
            this.updateLivesDisplay();
        } else {
            this.gameOver();
        }
    }
    increaseLives() {
        this.remainingLives++;
        this.updateLivesDisplay();
    }

    // start the game
    start() {
        // display game state
        this.updateGameStatsDisplay();

        // deploy hero
        this.deployHero();

        // deploy enemies
        this.deployEnemies();
        this.activeIntervals.push(
            setInterval(() => {
                this.deployEnemies();
            }, randMinMax(8000, 10000) / (this.currentLevel + 1 * 0.5))
        );

        // Detect collisions
        this.startCollisionDetection();
    }

    // game over
    gameOver() {
        // Stop all active intervals
        this.activeIntervals.forEach(clearInterval);
        this.activeIntervals.length = 0;

        // Stop animations
        const animatedElements = document.querySelectorAll(".hero, .enemy, .missile");
        animatedElements.forEach((element) => {
            element.style.animationPlayState = "paused";
        });

        document.getElementById("game-box").innerHTML = "";

        // Display the game-over screen
        const startScreen = document.getElementById("start-screen");
        startScreen.style.display = "flex";
        startScreen.innerHTML = `
        <div class="overlay-content">
            <img src="assets/images/furywings.heic" class="logo" alt="Fury Wings">
            <h2 id="game-status" class="status-message">Game Over <i class="bi bi-emoji-frown-fill"></i></h2>
            <p id="game-instruction" class="instruction">Final Score: ${this.score}</p>
            <button id="restart-button" class="btn btn-primary">Try Again <i class="bi bi-repeat"></i></button>
        </div>
        `;

        // Attach the restart logic
        document.getElementById("restart-button").addEventListener("click", () => {
            this.restartGame();
        });
    }

    // restart the game
    restartGame() {
        this.score = 0;
        this.currentLevel = 1;
        this.remainingLives = 3;
        this.enemyPositions = [];
        this.activeIntervals = [];

        const startScreen = document.getElementById("start-screen");
        startScreen.classList.add("hidden");
        setTimeout(() => {
            startScreen.classList.remove("hidden");
            startScreen.style.display = "none";
            this.start();
        }, 1000);
    }

    // deploy hero
    deployHero(xPostion = '50', yPosition = '85', animationName = 'none', clicked = false) {
        const hero = this.heroFactory.create(this.currentLevel);
        hero.style.left = `${xPostion}%`;
        hero.style.top = `${yPosition}%`;
        hero.classList.add(animationName);

        if (clicked) {
            hero.click();
        }

        this.gameBox.appendChild(hero);
        this.activeIntervals.push(
            setInterval(() => {
                const [x, y] = getObjectXY(hero, this.gameBox);
                const missile = this.weaponFactory.createMissile("hero", this.currentLevel, x, y)
                this.gameBox.appendChild(missile);

                missile.addEventListener('animationend', () => {
                    missile.instance.erase();
                });
            }, randMinMax(3000, 4000) / (hero.instance.level + 1 * 0.5))
        );
    }

    // upgrade hero
    upgradeHero() {
        const oldHero = document.querySelector('.hero');
        if (oldHero) {
            const gameBoxRect = this.gameBox.getBoundingClientRect();
    
            const xPosition = (oldHero.offsetLeft / gameBoxRect.width) * 100;
            const yPosition = (oldHero.offsetTop / gameBoxRect.height) * 100;
    
            oldHero.instance.erase();
    
            this.deployHero(xPosition, yPosition, 'upgrade', true);
        }
    }

    // deploy enemies
    deployEnemies() {
        const xPostion = randomXPosition(this.gameBox, this.enemyPositions);
        const enemy = this.enemyFactory.create(this.currentLevel, xPostion);
        this.gameBox.appendChild(enemy);

        enemy.addEventListener('animationend', () => {
            enemy.erase;
            clearInterval(missileInterval);
        });

        const missileInterval = setInterval(() => {
            const [x, y] = getObjectXY(enemy, this.gameBox);
            const missile = this.weaponFactory.createMissile("enemy", this.currentLevel, x, y);
            this.gameBox.appendChild(missile);

            missile.addEventListener('animationend', () => {
                missile.instance.erase();
            });
        }, randMinMax(5000, 6000) / (enemy.instance.level + 1 * 0.5));

        this.activeIntervals.push(missileInterval);
    }

    // Detect collisions
    startCollisionDetection() {
        this.activeIntervals.push(
            setInterval(() => {
                const hero = document.querySelector(".hero");
                const heroMissiles = document.querySelectorAll(".hero-missile");
                const enemyMissiles = document.querySelectorAll(".enemy-missile");
                const enemies = document.querySelectorAll(".enemy");

                // hero missiles vs enemies missiles
                heroMissiles.forEach((heroMissile) => {
                    enemyMissiles.forEach((enemyMissile) => {
                        if (isColliding(heroMissile, enemyMissile)) {
                            heroMissile.instance.destroy();
                            enemyMissile.instance.destroy();
                        }
                    });
                });

                // hero missiles vs enemies
                heroMissiles.forEach((heroMissile) => {
                    enemies.forEach((enemy) => {
                        if (isColliding(heroMissile, enemy) && heroMissile !== null && enemy !== null) {
                            enemy.instance.takeDamage(heroMissile.instance.damage * 1.5, this);
                            heroMissile.instance.destroy();
                        }
                    });
                });

                // enemies missiles vs hero
                enemyMissiles.forEach((enemyMissile) => {
                    if (isColliding(hero, enemyMissile)) {
                        hero.instance.takeDamage(enemyMissile.instance.damage, this);
                        enemyMissile.instance.destroy();
                    }
                });

                // enemies vs hero
                enemies.forEach((enemy) => {
                    if (isColliding(hero, enemy)) {
                        hero.instance.takeDamage(hero.instance.health * 0.5, this);
                        enemy.instance.destroy();
                    }
                });

            }, 50)
        );
    }
}

export default Game;