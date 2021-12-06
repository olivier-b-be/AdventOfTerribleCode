const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split(",").filter(el => el !== '').map(Number);
const amountOfDays = 256;

let lanternFish = input.reduce((acc, curr) => {
	if (acc.length === 0) {
		acc.push({ timer: curr, amount: 1 });
		return acc;
	}

	const keys = acc.reduce((prev, fish) => [...prev, fish.timer],  []);
	if (keys.includes(curr)) {
		acc.forEach(fish => {
			if (fish.timer === curr) fish.amount++;
		});
	} else {
		acc.push({ timer: curr, amount: 1 });
	}
	return acc;
}, []);

for (let i = 0; i < amountOfDays; i++) {
	let fishResets = 0;
	lanternFish = lanternFish.map(fish => {
		if (fish.timer > 0) return { ...fish, timer: fish.timer - 1 };
		fishResets += fish.amount;
		return { ...fish, timer: 6 };
	});
	if (fishResets > 0)	{
		lanternFish.push({ timer: 8, amount: fishResets });
	}
}
const totalFish = lanternFish.reduce((acc, curr) => acc += curr.amount, 0);
console.log(`Total fish: ${totalFish}`);