const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const levels = [];
for (const item of input) {
	levels.push(item.split(' ').map(x => Number(x)));
}

// console.log(levels);

const safeLevels = levels.reduce((prev, level) => {
	return prev + (checkLevelSafety(level) ? 1 : 0);
}, 0);

console.log(safeLevels);

function checkLevelSafety(level) {
	let levelIsAscending = undefined;

	for (let i = 0; i < level.length - 1; i++) {
		const firstElement = level[i];
		const secondElement = level[i + 1];
		const difference = firstElement - secondElement;
		
		if (difference === 0 || Math.abs(difference) > 3) {
			return false;
		}

		if (levelIsAscending === undefined) {
			levelIsAscending = difference < 0;
		}

		if (levelIsAscending && difference > 0) {
			return false;
		}

		if (!levelIsAscending && difference < 0) {
			return false;
		}
	}

	return true;
}