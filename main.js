let currentGame = null;

function loadGame(gameType) {
    const script = document.createElement('script');
    script.src = `games/${gameType}/game.js`;
    script.onload = () => startGame(gameType);
    document.body.appendChild(script);
}


function startGame(gameType) {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    document.getElementById('currentGameTitle').textContent = getGameTitle(gameType);
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    
    switch(gameType) {
        case 'colorMatch':
            currentGame = new ColorMatchGame(gameArea);
            break;
        case 'memoryCard':
            currentGame = new MemoryCardGame(gameArea);
            break;
        case 'wordChain':
            currentGame = new WordChainGame(gameArea);
            break;
    }
}

function getGameTitle(gameType) {
    const titles = {
        'colorMatch': 'Color Match',
        'memoryCard': 'Memory Card',
        'wordChain': 'Word Chain'
    };
    return titles[gameType] || '';
}

function updateScore(score) {
    document.getElementById('score').textContent = `${score}점`;
}

function updateTime(time) {
    document.getElementById('time').textContent = time;
}

function showModal(message) {
    if (message) {
        document.getElementById('modalMessage').textContent = message;
        document.getElementById('modal').classList.add('show');
    }
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function restartGame() {
    if (currentGame) {
        currentGame.restart();
    }
}

function goToMain() {
    if (currentGame) {
        currentGame.destroy();
    }
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('score').textContent = '0점';
    document.getElementById('time').textContent = '00:00';
}
