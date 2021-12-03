const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((prev, curr) => {
	const [direction, amount] = curr.split(' ');

	if (direction === 'forward') {
		prev.horizontal += +amount;
		prev.depth += +amount * prev.aim;
		return prev;
	}
	if (direction === 'down') {
		prev.aim += +amount
		return prev;
	}

	prev.aim -= +amount;
	return prev;

}, { horizontal: 0, depth: 0, aim: 0 });

console.log(output);
console.log(`Total multiplied: ${output.horizontal * output.depth}`);