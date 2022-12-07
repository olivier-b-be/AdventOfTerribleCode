const fs = require("fs");
let input = [];

// const data = fs.readFileSync("sample.txt", { encoding: "utf8" });
const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((acc, val) => {
	if (val) {
		return { 
			current: acc.current + Number(val),
			highest: [...acc.highest]
		}
	} else {
		if (acc.highest.length < 3) {
			return {
				current: 0,
				highest: [...acc.highest, acc.current]
			}
		}
		
		const sorted = [...acc.highest].sort((a, b) => a - b);

		if (sorted[0] < acc.current) {
			return {
				current: 0,
				highest: [...sorted.slice(1), acc.current]
			}
		}

		return {
			current: 0,
			highest: [...acc.highest]
		} 
	}
}, { current: 0, highest: [] });

console.log(output.highest.reduce((acc, val) => acc + val, 0));