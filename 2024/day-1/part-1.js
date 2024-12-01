const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const firstList = [];
const secondList = [];

for (const item of input) {
	const [firstItem, secondItem] = item.split(' ').filter((x) => x != '' && x != ' ');

	firstList.push(firstItem);
	secondList.push(secondItem);
}

firstList.sort((a, b) => a - b);
secondList.sort((a, b) => a - b);

let totalDistanceApart = 0;

for (let i = 0; i < firstList.length; i++) {
	totalDistanceApart += Math.abs(firstList[i] - secondList[i]);
}

console.log(totalDistanceApart);