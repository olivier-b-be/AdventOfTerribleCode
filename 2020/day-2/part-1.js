const fs = require("fs");
let input = [];
let validPasswords = 0;

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

for (let policy of input) {
	const policyValues = policy.split(" ");
	const [minValue, maxValue] = policyValues[0].split("-");
	const letter = policyValues[1].replace(":", "");
	const password = policyValues[2];

	const regex = new RegExp(letter, "g");
	const amount = (password.match(regex) || []).length;

	if (amount >= minValue && amount <= maxValue) {
		validPasswords++;
	}
}
console.log("amount of passwords: " + input.length);
console.log("amount of valid passwords: " + validPasswords);