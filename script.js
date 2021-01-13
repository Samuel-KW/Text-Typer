class Typer {
    constructor(element) {
        this.element = element;

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

let css = `
	.console::after {
		transition: none;
		display: inline-block;
		content: '_';
		animation: blinking 2s 0s ease infinite;
	}

	@keyframes blinking {
		0% { opacity: 1; }
		50% { opacity: 0; }
		100% { opacity: 1; }
	}
`;

let style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);


let handle = new Typer(document.getElementById('header'));
handle.type(Typer.toString());