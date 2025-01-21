class WordChainGame {
    constructor(container) {
        this.container = container;
        this.words = [];
        this.score = 0;
        this.timer = 60;
        this.timerInterval = null;
        this.init();
    }

    init() {
        this.createGame();
        this.startTimer();
    }

    createGame() {
        const input = document.createElement('input');
        input.className = 'word-input';
        input.placeholder = '단어를 입력하세요';
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.checkWord(input.value);
                input.value = '';
            }
        });
        this.container.appendChild(input);
    }

    checkWord(word) {
        if (this.words.length === 0 || this.words[this.words.length - 1].slice(-1) === word[0]) {
            this.words.push(word);
            this.score += 10;
            updateScore(this.score);
        } else {
            showModal('잘못된 단어입니다!');
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
        this.words = [];
        this.score = 0;
        this.timer = 60;
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
