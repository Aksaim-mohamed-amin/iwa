const goBtn = document.getElementById('go-btn');
const slowBtn = document.getElementById('slow-btn');
const stopBtn = document.getElementById('stop-btn');
const lamps = Array.from(document.getElementsByClassName('lamp'));

goBtn.addEventListener('click', () => changeState('go'));
slowBtn.addEventListener('click', () => changeState('slow'));
stopBtn.addEventListener('click', () => changeState('stop'));


function changeState(state){
    for (let lamp of lamps){
        if (lamp.classList.contains(state)){
            lamp.classList.add('on');
        } else {
            lamp.classList.remove('on');
        }
    }
}