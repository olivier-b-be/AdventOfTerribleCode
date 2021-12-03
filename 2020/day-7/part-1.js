// const fs = require("fs");
// let inputData = [];

// const fileData = fs.readFileSync("example.txt", { encoding: "utf8" });
const goldbagRegex = new RegExp("shiny gold bag");
const noBagRegex = new RegExp("no other bag");

// inputData = fileData.toString()
// 	.split("\r\n")
// 	.map(e => e.split(" contain "))
// 	//.filter(e => !goldbagRegex.test(e[0]))
// 	.map(e => {
// 		if (e[1].includes(",")) {
// 			e[1] = e[1].split(", ");
// 		} else {
// 			e[1] = [e[1]];
// 		}
// 		return e;
// 	});

let inputData = [
	[
		'light red bags',
		['1 bright white bag', '2 muted yellow bags.']
	],
	[
		'dark orange bags',
		['3 bright white bags', '4 muted yellow bags.']
	],
	['bright white bags', ['1 shiny gold bag.']],
	[
		'muted yellow bags',
		['2 shiny gold bags', '9 faded blue bags.']
	],
	['shiny gold bags', ['1 dark olive bag', '2 vibrant plum bags.']],
	[
		'dark olive bags',
		['3 faded blue bags', '4 dotted black bags.']
	],
	[
		'vibrant plum bags',
		['5 faded blue bags', '6 dotted black bags.']
	],
	['faded blue bags', ['no other bags.']],
	['dotted black bags', ['no other bags.']]
]
//console.log(input);
let totalBags = 0;
for (let bagInput of inputData) {
	//console.log(bagInput);
	const goldenbag = checkInnerBag(bagInput);

	if (goldenbag)
		totalBags++;
}

function checkInnerBag(input) {
	if (noBagRegex.test(input[1])) return false;
	if (input[1].some(e => goldbagRegex.test(e))) return true;
	return input[1].map(innerBag => {
		if (!noBagRegex.test(innerBag)) {
			const [, tone, color,] = innerBag.split(" ")
			const bagRegex = new RegExp(`${tone} ${color}`);
			const [bag] = inputData.filter(e => bagRegex.test(e[0]));
			checkInnerBag(bag);
		}
	});
}

console.log(totalBags);