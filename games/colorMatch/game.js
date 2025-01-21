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

        const colors = [this.targetColor];
        for (let i = 1; i < 6; i++) {
            colors.push(this.generateSimilarColor(this.targetColor));
        }
        this.shuffle(colors);

        colors.forEach(color => {
            const tile = document.createElement('div');
            tile.style.backgroundColor = color;
            tile.className = 'color-tile';
            tile.addEventListener('click', () => this.checkColor(color));
            tilesContainer.appendChild(tile);
        });

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

    generateSimilarColor(baseColor) {
        const base = parseInt(baseColor.slice(1), 16);
        const variation = Math.floor(Math.random() * 256) - 128;
        const newColor = (base + variation).toString(16).padStart(6, '0');
        return `#${newColor}`;
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
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
        showModal(`게임 종료! 최종 점수: ${this.score}`);
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
