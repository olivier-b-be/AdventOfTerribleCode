const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const MAX_AMOUNT_RED = 12;
const MAX_AMOUNT_GREEN = 13;
const MAX_AMOUNT_BLUE = 14;

const output = input.reduce((acc, val) => {
	const [game, cubes] = val.split(':');
	const gameID = game.split(' ')[1];
	
	const colourAmounts = {
		red: 0,
		green: 0,
		blue: 0
	};

	let possible = true;
	
	cubes.trim().split(';').map((set) => {
		colourAmounts.red = 0;
		colourAmounts.green = 0;
		colourAmounts.blue = 0;

		set.trim().split(',').map((dice) => {
			const [amount, colour] = dice.trim().split(' ');
			colourAmounts[colour] += Number(amount);
		});
		
		if (!(colourAmounts.red <= MAX_AMOUNT_RED && colourAmounts.green <= MAX_AMOUNT_GREEN && colourAmounts.blue <= MAX_AMOUNT_BLUE)) {
			possible = false;
		}
	});

	return possible ? acc + Number(gameID) : acc;
}, 0);

console.log(output);