const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((acc, val) => {
	const itemsPerComp = val.length / 2;
	const firstComp = val.slice(0, itemsPerComp);
	const secondComp = val.slice(itemsPerComp);

	const index = firstComp.split('').findIndex((f) => secondComp.split('').includes(f));
	
	return [...acc, firstComp.at(index)];
}, []);

const indexedValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const value = output.reduce((acc, val) => {
	const index = indexedValues.findIndex((value) => value === val.toLowerCase());
	let value = index + 1;

	if (val === indexedValues.at(index)) {
		return acc + value;
	}

	return acc + value + 26;
}, 0)

console.log(output);
console.log(value);
