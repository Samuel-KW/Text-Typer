class Typer {
    constructor(element) {
        this.element = element;
        this.element.classList.add('typing-cursor');

        this.text = '';
        this.index = 0;

        this.speed = 60;
        this.accuracy = 0.05;

        this.chars = 'qwertyuiopasdfghjklzxcvbnm';
    }

    loop (resolve) {

        if (this.index >= this.text.length &&
            this.element.textContent == this.text) return resolve();


        if (this.element.textContent[this.index - 1] != this.text[this.index - 1]) {
            
            this.element.textContent = this.element.textContent.slice(0, -1);
            this.index--;
            
            return setTimeout(() => this.loop(resolve), this.speed * 2);
        }

        const is_mistake = Math.random() < this.accuracy;

        this.element.textContent += is_mistake ?
            this.chars[Math.floor(Math.random() * this.chars.length)] :
            this.text[this.index];
        
        this.index++;

        return setTimeout(() => this.loop(resolve), this.speed);
    }

    type (text, speed=1, accuracy=0.05) {

        this.text = text;
        this.speed = speed;
        this.accuracy = accuracy;

        return new Promise(resolve => this.loop(resolve));
    }
}

let style = document.createElement('style');
style.textContent = `.typing-cursor::after { animation: cursor_blink .75s steps(1) infinite; display: inline-block; content: '_'; } @keyframes cursor_blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }`;;
document.head.appendChild(style);


let handle = new Typer(document.getElementById('header'));
handle.type(Typer.toString(), 100, 0.5);