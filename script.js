let currentGame = null;

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

// Color Match Game
class ColorMatchGame {
    constructor(container) {
        this.container = container;
        this.colors = [];
        this.targetColor = null;
        this.score = 0;
        this.timer = 30;
        this.timerInterval = null;
        this.init();
    }

    init() {
        this.createGame();
        this.startTimer();
    }

    createGame() {
        this.targetColor = this.generateRandomColor();
        const targetDisplay = document.createElement('div');
        targetDisplay.style.backgroundColor = this.targetColor;
        targetDisplay.className = 'color-tile target-color';
        this.container.appendChild(targetDisplay);

        const tilesContainer = document.createElement('div');
        tilesContainer.style.display = 'flex';
        tilesContainer.style.flexWrap = 'wrap';
        tilesContainer.style.justifyContent = 'center';
        tilesContainer.style.marginTop = '20px';

        for (let i = 0; i < 6; i++) {
            const tile = document.createElement('div');
            const color = i === 0 ? this.targetColor : this.generateRandomColor();
            tile.style.backgroundColor = color;
            tile.className = 'color-tile';
            tile.addEventListener('click', () => this.checkColor(color));
            tilesContainer.appendChild(tile);
        }

        this.container.appendChild(tilesContainer);
    }

    generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    checkColor(selectedColor) {
        if (selectedColor === this.targetColor) {
            this.score += 10;
            updateScore(this.score);
            this.container.innerHTML = '';
            this.createGame();
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer--;
            updateTime(`${this.timer}초`);
            if (this.timer <= 0) {
                this.gameOver();
            }
        }, 1000);
    }

    gameOver() {
        clearInterval(this.timerInterval);
        alert(`게임 종료! 최종 점수: ${this.score}`);
        this.restart();
    }

    restart() {
        clearInterval(this.timerInterval);
        this.score = 0;
        this.timer = 30;
        updateScore(this.score);
        updateTime(`${this.timer}초`);
        this.container.innerHTML = '';
        this.init();
    }

    destroy() {
        clearInterval(this.timerInterval);
        this.container.innerHTML = '';
    }
}

// Memory Card Game
class MemoryCardGame {
    constructor(container) {
        this.container = container;
        this.cards = [];
        this.flippedCards = [];
        this.matches = 0;
        this.score = 0;
        this.timer = 0;
        this.timerInterval = null;
        this.level = 1;
        this.init();
    }

    init() {
        const cardCount = this.level * 8;
        const numbers = [...Array(cardCount).keys(), ...Array(cardCount).keys()];
        this.shuffle(numbers);
        
        this.createGameInfo();
        this.startTimer();
        
        numbers.forEach((number, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = number;
            card.addEventListener('click', () => this.flipCard(card));
            this.container.appendChild(card);
        });
    }

    createGameInfo() {
        const gameInfo = document.createElement('div');
        gameInfo.className = 'game-info';
        gameInfo.innerHTML = `레벨: ${this.level}<br>점수: ${this.score}`;
        this.container.appendChild(gameInfo);
    }

    startTimer() {
        const timerDisplay = document.createElement('div');
        timerDisplay.className = 'timer';
        this.container.appendChild(timerDisplay);

        this.timerInterval = setInterval(() => {
            this.timer++;
            timerDisplay.textContent = `시간: ${this.timer}초`;
        }, 1000);
    }

    flipCard(card) {
        if (this.flippedCards.length < 2 && !this.flippedCards.includes(card)) {
            card.style.backgroundColor = '#4CAF50';
            card.textContent = card.dataset.value;
            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                this.checkMatch();
            }
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            this.matches++;
            this.score += 10;
            this.flippedCards = [];
            if (this.matches === this.level * 8) {
                alert('축하합니다! 게임 클리어!');
                this.levelUp();
            }
        } else {
            setTimeout(() => {
                card1.style.backgroundColor = '#ddd';
                card2.style.backgroundColor = '#ddd';
                card1.textContent = '';
                card2.textContent = '';
                this.flippedCards = [];
            }, 1000);
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    restart() {
        this.container.innerHTML = '';
        this.flippedCards = [];
        this.matches = 0;
        this.score = 0;
        this.timer = 0;
        clearInterval(this.timerInterval);
        this.init();
    }

    destroy() {
        this.container.innerHTML = '';
        clearInterval(this.timerInterval);
    }

    levelUp() {
        this.level++;
        this.restart();
    }
}

// Word Chain Game
class WordChainGame {
    // ... Word Chain Game implementation
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
