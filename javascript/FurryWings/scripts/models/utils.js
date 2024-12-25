export function isColliding(element1, element2) {
    if (!element1 || !element2 || element1.instance == null || element2.instance == null) {
        return false;
    }
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
    );
}

export function getObjectXY(obj, gameBox) {
    const objRect = obj.getBoundingClientRect();
    const gameBoxRect = gameBox.getBoundingClientRect();

    const x = Math.floor(objRect.left - gameBoxRect.left + objRect.width / 2);
    const y = Math.floor(objRect.top - gameBoxRect.top + objRect.height);
    return [ x, y ];
}

export function randomXPosition(gameBox, enemiesPosition) {
    let randomX = Math.floor(Math.random() * (gameBox.clientWidth - 50));

    let minGap = 300;
    let attmepts = 0;

    while (enemiesPosition.some(pos => Math.abs(pos - randomX) < minGap)) {
        if (attmepts > 10) {
            minGap -= 10;
            attmepts = 0;
        }
        randomX = Math.floor(Math.random() * (gameBox.clientWidth - 50));
        attmepts++;
    }

    enemiesPosition.push(randomX);
    return randomX;
}

export function randMinMax(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}