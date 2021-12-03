const fs = require("fs");
let input = [];
let area = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

for (let i = 0; i < input.length; i++) {
	area[i] = input[i].split("");
}

let xPosition = 0;
let yPosition = 0
let treesHit = 0;
const allSlopesTreesHit = [];
let continueDriving;

const slopes = [
	{ right: 1, down: 1 },
	{ right: 3, down: 1 },
	{ right: 5, down: 1 },
	{ right: 7, down: 1 },
	{ right: 1, down: 2 }
]

let slopeRight;
let slopeDown;

for (let i = 0; i < slopes.length; i++) {
	slopeRight = slopes[i].right;
	slopeDown = slopes[i].down;
	continueDriving = true;
	xPosition = 0;
	yPosition = 0;
	treesHit = 0;

	while (continueDriving) {
		//-3 for position, -1 for index
		if (area[yPosition].length - slopeRight - 1 >= xPosition) {
			xPosition += slopeRight;
		} else {
			let xDifference = xPosition - (area[yPosition].length - slopeRight - 1);
			xPosition = 0 + xDifference - 1;
		}

		yPosition += slopeDown;

		if (area[yPosition][xPosition] === "#") {
			treesHit++;
		}

		if (yPosition + slopeDown > area.length - 1) {
			continueDriving = false;
		}
	}

	console.log(`Slope ${i + 1}: hit ${treesHit} trees.`);
	allSlopesTreesHit.push(treesHit);
}

const multipliedTrees = allSlopesTreesHit.reduce((prev, curr) => prev * curr, 1);
console.log(`All tree hits from slopes multiplied together: ${multipliedTrees}`);