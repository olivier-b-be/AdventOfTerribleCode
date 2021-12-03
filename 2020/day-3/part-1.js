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
let continueDriving = true;

while (continueDriving) {
	//-3 for position, -1 for index
	if (area[yPosition].length - 4 >= xPosition) {
		xPosition += 3;
	} else {
		let xDifference = xPosition - (area[yPosition].length - 4);
		xPosition = 0 + xDifference - 1;
	}

	yPosition += 1;

	if (area[yPosition][xPosition] === "#") {
		treesHit++;
	}

	if (yPosition + 1 > area.length - 1) {
		continueDriving = false;
	}
}

console.log(`Hit ${treesHit} trees.`);