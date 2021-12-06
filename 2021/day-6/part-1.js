const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split(",").filter(el => el !== '').map(Number);
let lanternFish = [...input];
const amountOfDays = 80;

for (let i = 0; i < amountOfDays; i++) {
	let fishResets = 0;
	lanternFish = lanternFish.map(fish => {
		if (fish > 0) return fish - 1;
		fishResets++;
		return 6;
	});
	if (fishResets > 0)	lanternFish = lanternFish.concat(new Array(fishResets).fill(8));
}
console.log(`Total fish: ${lanternFish.length}`);