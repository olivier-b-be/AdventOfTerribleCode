const fs = require("fs");
let input = [];
let data = [];

const fileData = fs.readFileSync("input.txt", { encoding: "utf8" });
input = fileData.toString().split("\r\n\r\n");

const regex = new RegExp("\r\n", "g");

for (let element of input) {
	element = element.replace(regex, "");
	data.push(element);
}

let sumOfCounts = 0;

for (let group of data) {
	const letters = [];
	for (let letter of group) {
		if (!letters.includes(letter))
			letters.push(letter);
	}
	sumOfCounts += letters.length;
}

console.log(sumOfCounts);