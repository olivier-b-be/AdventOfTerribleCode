const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const firstList = [];
const secondList = [];

for (const item of input) {
	const [firstItem, secondItem] = item.split(' ').filter((x) => x != '' && x != ' ');

	firstList.push(Number(firstItem));
	secondList.push(Number(secondItem));
}

let similarityScore = 0;

for (let i = 0; i < firstList.length; i++) {
	similarityScore += (secondList.filter((x) => x === firstList[i]).length) * firstList[i];
}

console.log(similarityScore);