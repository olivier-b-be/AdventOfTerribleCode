const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");
console.log(input);
let totalIncreased = 0;
for (let i = 0; i < input.length; i++) {
	if (input[i+1] == undefined || input[i+2] == undefined) continue;
	
	const first = Number(input[i]) + Number(input[i+1]) + Number(input[i+2]);
	const second = Number(input[i+1]) + Number(input[i+2]) + Number(input[i+3]);

	if (second > first) totalIncreased++;
}

console.log(totalIncreased);