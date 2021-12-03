const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((prev, current, index) => {
	if (index === 0) {
		prev.previous = +current;
		return prev;
	}
	
	if (+current > prev.previous) prev.totalIncrease++;
	prev.previous = +current;
	return prev;
}, { previous: 0, totalIncrease: 0 });

console.log(output);