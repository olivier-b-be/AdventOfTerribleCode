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

	const firstIndex = password[+minValue - 1] === letter;
	const lastIndex = password[+maxValue - 1] === letter;

	if ((firstIndex && !lastIndex) || (lastIndex && !firstIndex)) {
		validPasswords++;
	}
}
console.log("amount of passwords: " + input.length);
console.log("amount of valid passwords: " + validPasswords);