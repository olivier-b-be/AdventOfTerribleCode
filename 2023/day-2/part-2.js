const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((acc, val) => {
	const [, cubes] = val.split(':');
	
	const colourAmounts = {
		red: 0,
		green: 0,
		blue: 0
	};
	
	cubes.trim().split(';').map((set) => {
		set.trim().split(',').map((dice) => {
			const [amount, colour] = dice.trim().split(' ');
			const amountNumber = Number(amount);
			
			if (amountNumber > Number(colourAmounts[colour])) 
				colourAmounts[colour] = amountNumber;
		});
	});

	return acc + (
		(colourAmounts.red > 0 ? colourAmounts.red : 1) *
		(colourAmounts.green > 0 ? colourAmounts.green : 1) *
		(colourAmounts.blue > 0 ? colourAmounts.blue : 1)
	);
}, 0);

console.log(output);