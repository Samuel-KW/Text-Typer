class Typer {
    constructor(element) {
        this.element = element;
        this.element.classList.add('typing-cursor');

        this.index = 0;
        this.chars = 'qwertyuiopasdfghjklzxcvbnm{}[]();';
    }

    type_loop (resolve, text, speed, accuracy) {

        if (this.index >= text.length &&
            this.element.textContent == text) return resolve();

        if (this.element.textContent.slice(0, this.index) != text.slice(0, this.index)) {
            
            this.element.textContent = this.element.textContent.slice(0, -1);
            this.index--;
            
            return setTimeout(() => this.type_loop.apply(this, arguments), speed);
        }

        const is_mistake = Math.random() < accuracy;

        this.element.textContent += is_mistake ?
            this.chars[Math.floor(Math.random() * this.chars.length)] :
            text[this.index];
        
        this.index++;

        return setTimeout(() => this.type_loop.apply(this, arguments), speed * (is_mistake ? 5 : 1));
    }
    
    clean_loop (resolve, speed) {
        if (this.element.textContent == '')
            return resolve();

        this.element.textContent = this.element.textContent.slice(0, -1);
        return setTimeout(() => this.clean_loop.apply(this, arguments), speed);
    }

    clean (speed=30) {
        return new Promise(resolve => this.clean_loop(resolve, speed));
    }

    type (text, speed=30, accuracy=0.05) {
        return new Promise(resolve => this.type_loop(resolve, text, speed, accuracy));
    }
}

const style = document.createElement('style');
style.textContent = `.typing-cursor::after { animation: cursor_blink 1s steps(1) infinite; display: inline-block; content: '_'; } @keyframes cursor_blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }`;;
document.head.appendChild(style);


// DEMO CODE
// Create a new handler for the text typer
const handle = new Typer(document.getElementById('header'));

let typing = [ 'professional developer', '10+ years of backend experience', '3+ years of frontend experience', '10+ years of UI/UX Design', '5+ years of game development'],
    index = 0;

const loop = () => {

    if (index >= typing.length) index = 0;

    handle.clean();
    handle.type(typing[index++], 30, 0.05)
        .then(() => setTimeout(loop, 4000));
};

loop();