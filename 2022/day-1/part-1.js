const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((acc, val) => {
	if (val) {
		return { 
			current: acc.current + Number(val),
			highest: acc.highest
		}
	} else {
		return {
			current: 0,
			highest: acc.current > acc.highest ? acc.current : acc.highest
		}
	}
}, { current: 0, highest: 0 });

console.log(output);