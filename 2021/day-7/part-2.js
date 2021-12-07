const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split(",").filter(el => el !== '').map(Number);

const minHorizontalPos = Math.min(...input);
const maxHorizontalPos = Math.max(...input);

const positionsMoved = [];

for (let i = minHorizontalPos; i <= maxHorizontalPos; i++) {
	const moved = input.reduce((acc, curr) => {
		const steps = Math.abs(curr - i);
		return acc += steps * ((steps + 1) / 2);
	}, 0);
	positionsMoved.push(moved);
}

console.log('Lowest moves needed:', Math.min(...positionsMoved));
//console.log('Positions moved: ' + positionsMoved.join(', '));
