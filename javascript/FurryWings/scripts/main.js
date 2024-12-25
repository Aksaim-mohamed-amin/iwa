import  HeroFactory  from './models/hero/HeroFactory.js';
import  EnemyFactory  from './models/enemy/EnemyFactory.js';
import  WeaponFactory  from './models/weapon/WeaponFactory.js';
import Game from './models/Game.js'

const factories = {
    hero: new HeroFactory(),
    enemy: new EnemyFactory(),
    weapon: new WeaponFactory()
};


async function main() {
    try {
        await Promise.all([
            factories.hero.load("/assets/data/heroes.json"),
            factories.enemy.load("/assets/data/enemies.json"),
            factories.weapon.load("/assets/data/weapons.json")
        ]);


        const startButton = document.getElementById('start-button');
        const startScreen = document.getElementById('start-screen');

        startButton.addEventListener('click', () => {
            startScreen.classList.add('hidden');
            const gameBox = document.getElementById('game-box');
            const game = new Game(factories, gameBox);

            setTimeout(() => {
                startScreen.classList.remove('hidden');
                startScreen.style.display = 'none';
                game.start();
            }, 1000);
        });

    } catch (error) {
        console.error("Error during game initialization:", err);
    }
}

main();