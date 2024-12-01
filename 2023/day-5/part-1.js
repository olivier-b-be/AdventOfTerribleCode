const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const seeds = [];
const mappings = {
	"seed-to-soil": [],
	"soil-to-fertilizer": [],
	"fertilizer-to-water": [],
	"water-to-light": [],
	"light-to-temperature": [],
	"temperature-to-humidity": [],
	"humidity-to-location": []
};

let currentMapping = "";

input.forEach((val) => {
	if (val.startsWith("seeds")) {
		seeds.push(...val.split(":")[1].trim().split(" ").map((x) => Number(x)));
		return;
	}

	if (val === "") return;

	if (val.endsWith("map:")) {
		currentMapping = val.split(" ")[0].trim();
		return;
	}

	const [destinationRangeStart, sourceRangeStart, rangeLength] = val.split(" ").map((x) => Number(x.trim()));
	mappings[currentMapping].push({ destinationRangeStart, sourceRangeStart, rangeLength });
});

const locationNumbers = [];
// { seed: number, finalLocation: number }

seeds.forEach((seed) => {
	let destinationNumber = seed;

	for (const map in mappings) {
		for (const { destinationRangeStart, sourceRangeStart, rangeLength} of mappings[map]) {
			const sourceRangeEnd = sourceRangeStart + rangeLength - 1;
			const isMapped = destinationNumber >= sourceRangeStart && destinationNumber <= sourceRangeEnd; // 97 - 79 = 18, 18 + 52 = 70

			if (isMapped) {
				const offset = destinationRangeStart - sourceRangeStart;
				destinationNumber += offset;
				break;
			}
		}
	}

	// destination number is location number
	locationNumbers.push({ seed: seed, finalLocation: destinationNumber})
});

console.log(Math.min(...locationNumbers.map((x) => Number(x.finalLocation))));