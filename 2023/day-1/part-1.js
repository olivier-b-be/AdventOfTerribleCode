const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const output = input.reduce((acc, val) => {
	const firstNumber = val.split('').find((char) => !isNaN(char));
	const lastNumber = val.split('').reverse().find((char) => !isNaN(char));
	const concatNumber = Number(`${firstNumber}${lastNumber}`);

	return concatNumber + acc;
}, 0);

console.log(output);