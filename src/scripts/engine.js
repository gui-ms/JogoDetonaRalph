
const DIFICULDADE = {
    FACIL: 1500,
    MEDIO: 1000,
    DIFICIL: 500,
}

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.getElementById("time-left"),
        score: document.getElementById("score"),
    },
    values: {
        timerId: null,
        countdownTimerId: setInterval(countdown, 1000),
        gameSpeed: DIFICULDADE.DIFICIL,
        hitPosition: 0,
        result: 0,
        currentTime: 60
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare,state.values.gameSpeed);
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                playSound("hit");
            }
        })
    })
}

function countdown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0){
        clearInterval(state.values.countdownTimerId);
        clearInterval(state.values.timerId);
        alert(`Game Over! Seu score foi: ${state.values.result}`);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function initialize(){
    moveEnemy();
    addListenerHitbox();
}

initialize();