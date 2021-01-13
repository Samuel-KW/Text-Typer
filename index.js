function Faker(elem, string = 'Hello World.', callback = ()=>{}) {
	this.index = 0;
	this.speed = 60;
	this.error = 0.05;
	this.incorrect = false;
	this.charecters = `qwertyuiopasdfghjklzxcvbnm`;

	elem.textContent = '';

	let loop = setInterval(() => {
		let content = elem.textContent || '';
		if (this.incorrect) {
			this.incorrect = false;
			elem.textContent = content.slice(0, -1);
        } else {
			let error = Math.random() < this.error;
			if (error) {
				this.incorrect = true;
				elem.textContent += this.charecters[Math.floor(Math.random() * this.charecters.length)];
            } else {
				elem.textContent += string[this.index];
				this.index++;
			}
        }

        if (this.index === string.length) clearInterval(loop), callback();
    }, this.speed);
}

let html = `
	
`;

let css = `
	.console::after {
		transition: none;
		display: inline-block;
		content: '_';
		animation: blinking 2s 0s linear infinite;
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

let container = document.createElement('div');
container.className = 'console';
container.innerHTML = html;
container.style = `
	font-family: Consolas, "Courier New", "Lucida Console", "MS Gothic", NSimSun, Arial;
	width: 975px; height: 512px;
	color: rgb(204, 204, 204);
	background-color: #000;
	white-space: pre-wrap;
	font-size: 16px;
	padding: 5px;
`;

document.body.appendChild(container);

new Faker(container, Faker.toString());
