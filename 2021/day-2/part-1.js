const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((prev, curr) => {
	const [direction, amount] = curr.split(' ');

	if (direction === 'forward') {
		prev.x += Number(amount);
		return prev;
	}
	if (direction === 'down') {
		prev.y += Number(amount)
		return prev;
	}

	prev.y -= Number(amount);
	return prev;

}, { x: 0, y: 0 });

console.log(output);
console.log(`Total multiplied: ${output.x * output.y}`);