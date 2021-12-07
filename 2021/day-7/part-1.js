const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split(",").filter(el => el !== '').map(Number);

const { maxHorizontalPos, minHorizontalPos } = input.reduce((acc, curr, index) => {
	if (index === 0) {
		acc.maxHorizontalPos = curr;
		acc.minHorizontalPos = curr;
		return acc;
	}

	if (curr > acc.maxHorizontalPos) acc.maxHorizontalPos = curr;	
	if (curr < acc.minHorizontalPos) acc.minHorizontalPos = curr;
	return acc;
}, { maxHorizontalPos: 0, minHorizontalPos: 0 });

const positionsMoved = [];

for (let i = minHorizontalPos; i <= maxHorizontalPos; i++) {
	const moved = input.reduce((acc, curr) => {
		return acc += Math.abs(curr - i);
	}, 0);
	positionsMoved.push(moved);
}

console.log('Lowest moves needed:', Math.min(...positionsMoved));
//console.log('Positions moved: ' + positionsMoved.join(', '));