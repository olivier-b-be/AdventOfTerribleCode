const fs = require("fs");
let input = [];
let data = [];

const fileData = fs.readFileSync("input.txt", { encoding: "utf8" });
input = fileData.toString().split("\r\n\r\n");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const regex = new RegExp("\r\n", "g");

for (let element of input) {
	element = element.replace(regex, " ");
	data.push(element);
}

const acceptedPassports = data.filter(value => requiredFields.every(field => value.includes(field)));
console.log(acceptedPassports);
console.log("Amount of valid passports: " + acceptedPassports.length);