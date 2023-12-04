const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((acc, val) => {
	const [_, numbers] = val.split(':');
	const [winningNumbers, myNumbers] = numbers.trim().split('|');

	const winningNumbersAsNumber = winningNumbers.trim().split(' ').filter((x => x !== '')).map((x) => Number(x.trim()));
	const matches = myNumbers.trim().split(' ').filter((x) => x !== '' && winningNumbersAsNumber.includes(Number(x.trim())));

	if (matches.length < 1) return acc;
	
	const points = (matches.reduce((prev, _) => prev * 2, 1) / 2)
	return acc + points;
}, 0);

console.log(output);