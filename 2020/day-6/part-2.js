const fs = require("fs");
let input = [];
let data = [];

const fileData = fs.readFileSync("input.txt", { encoding: "utf8" });
input = fileData.toString().split("\r\n\r\n");

const regex = new RegExp("\r\n", "g");

for (let element of input) {
	element = element.replace(regex, " ");
	data.push(element);
}

let sumOfCounts = 0;

for (let group of data) {
	const groupAnswers = group.split(" ");
	const answers = new Map();

	for (let answer of groupAnswers) {
		for (let letter of answer) {
			let value = 0;
			if (answers.get(letter)) {
				value = answers.get(letter);
			}
			answers.set(letter, value + 1);
		}
	}

	answers.forEach((val, key) => {
		if (val === groupAnswers.length)
			sumOfCounts++;
	});
}

console.log(sumOfCounts);
