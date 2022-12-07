const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const sameLetters = [];
for (let i = 0; i < input.length; i += 3) {
	const firstCheck = input[i].split('').filter((val) => input[i+1].split('').includes(val));
	const secondCheck = firstCheck.filter((val) => input[i+2].split('').includes(val));
	
	sameLetters.push(secondCheck[0]);
}

const indexedValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const value = sameLetters.reduce((acc, val) => {
	const index = indexedValues.findIndex((value) => value === val.toLowerCase());
	let value = index + 1;

	if (val === indexedValues.at(index)) {
		return acc + value;
	}

	return acc + value + 26;
}, 0)

console.log(value);
