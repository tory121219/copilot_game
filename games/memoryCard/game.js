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
        this.icons = [
            'fa-cat', 'fa-dog', 'fa-fish', 'fa-horse', 'fa-spider', 'fa-dragon', 'fa-hippo', 'fa-kiwi-bird'
        ];
        this.init();
    }

    init() {
        const cardCount = this.level * 8;
        const icons = [...this.icons, ...this.icons];
        this.shuffle(icons);
        
        this.createGameInfo();
        this.startTimer();
        
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
        grid.style.gap = '10px';

        icons.forEach((icon, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.dataset.value = icon;
            card.innerHTML = `<i class="fas ${icon}"></i>`;
            card.style.visibility = 'hidden';
            card.addEventListener('click', () => this.flipCard(card));
            grid.appendChild(card);
        });

        this.container.appendChild(grid);
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
            card.classList.add('flipped');
            card.style.visibility = 'visible';
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
                showModal('축하합니다! 게임 클리어!');
                this.levelUp();
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.visibility = 'hidden';
                card2.style.visibility = 'hidden';
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
