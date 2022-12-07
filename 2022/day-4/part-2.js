const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((acc, curr) => {
	const [firstBegin, firstEnd, secondBegin, secondEnd] = curr.split(',').join('-').split('-').map(x => +x);
	if (secondBegin > firstEnd || firstBegin > secondEnd) return acc;
	return acc + 1;
}, 0);


console.log(output);
