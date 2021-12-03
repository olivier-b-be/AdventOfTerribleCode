const fs = require("fs");
let input = [];
let data = [];

const fileData = fs.readFileSync("input.txt", { encoding: "utf8" });
input = fileData.toString().split("\r\n\r\n");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const validEyecolors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

const regex = new RegExp("\r\n", "g");

for (let element of input) {
	element = element.replace(regex, " ");
	data.push(element);
}

const acceptedPassports = data.filter(value => requiredFields.every(field => value.includes(field)));
data = [];
for (let element of acceptedPassports) {
	element = element.split(" ");
	data.push(element);
}

const hairRegex = new RegExp("^#[0-9a-f]{6}$");

const test = data.map(m => m.every(item => {
	const field = item.substr(0, 3);
	const value = item.substr(4);
	switch (field) {
		case "byr":
			return +value >= 1920 && +value <= 2002;
		case "ecl":
			return validEyecolors.includes(value);
		case "eyr":
			return +value >= 2020 && +value <= 2030;
		case "hcl":
			if (value.startsWith("#")) {
				return hairRegex.test(value);
			}
		case "hgt":
			if (value.endsWith("cm")) {
				const height = value.substr(0, 3);
				return +height >= 150 && +height <= 193;
			} else if (value.endsWith("in")) {
				const height = value.substr(0, 2);
				return +height >= 59 && +height <= 76;
			}
			return false;
		case "iyr":
			return +value >= 2010 && +value <= 2020;
		case "pid":
			return value.length === 9;
		case "cid":
			return true;
	}
}))

const validPassports = test.filter(p => p);

console.log("Amount of valid passports: " + validPassports.length);