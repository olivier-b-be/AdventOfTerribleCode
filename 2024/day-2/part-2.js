const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const levels = [];
for (const item of input) {
	levels.push(item.split(' ').map(x => Number(x)));
}

const unsafeLevels = [];

const safeLevels = levels.reduce((prev, level) => {
	const isLevelSafe = checkLevelSafety(level);

	if (!isLevelSafe) {
		unsafeLevels.push([...level]);
		return prev;
	}

	return prev + 1;
}, 0);

// console.log(safeLevels);
// console.log(unsafeLevels);
const levelsWithTolerance = [];

for (const level of unsafeLevels) {
	const length = level.length;

	const levelsToAdd = [];

	for (let i = 0; i < length; i++) {
		const levelToSplice = [...level];
		levelToSplice.splice(i, 1)
		levelsToAdd.push(levelToSplice);
	}

	levelsWithTolerance.push(levelsToAdd);
}

// console.log(levelsWithTolerance);

const safeLevelsWithTolerance = levelsWithTolerance.reduce((prev, levels) => {
	const filtered = levels.filter((level) => checkLevelSafety(level));

	if (filtered.length > 0) return prev + 1;

	return prev;
}, 0);

console.log(safeLevels + safeLevelsWithTolerance);

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