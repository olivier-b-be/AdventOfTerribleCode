const fs = require("fs");
let input = [];

const data = fs.readFileSync("sample.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

let seedRanges = [];
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
		const seedAndRangeNumbers = val.split(":")[1].trim().split(" ").map((x) => Number(x));

		for (let i = 0; i < seedAndRangeNumbers.length; i += 2) {
			const startingSeed = seedAndRangeNumbers[i];
			const endingSeed = startingSeed + seedAndRangeNumbers[i + 1] - 1;

			seedRanges.push({ startRange: startingSeed, endRange: endingSeed });
		}
		return;
	}

	if (val === "") return;

	if (val.endsWith("map:")) {
		currentMapping = val.split(" ")[0].trim();
		return;
	}

	const [destinationRangeStart, sourceRangeStart, rangeLength] = val.split(" ").map((x) => Number(x.trim()));
	mappings[currentMapping].push({ destinationRangeStart, destinationRangeEnd: destinationRangeStart + rangeLength - 1, sourceRangeStart, sourceRangeEnd: sourceRangeStart + rangeLength - 1, rangeLength });
});

console.log(seedRanges);
// console.log(mappings);

for (const map in mappings) {
	const newRanges = [];
	seedRanges.sort((a, b) => a.startRange - b.startRange);
	
	mappings[map].forEach((range) => {
		const offset = range.destinationRangeStart - range.sourceRangeStart;
		const fullRangeBetween = seedRanges
			.filter((x) => x.startRange >= range.sourceRangeStart && x.endRange <= range.sourceRangeEnd)
			.map((x) => (
				{
					startRange: x.startRange + offset,
					endRange: x.endRange + offset
				}
			));

		// console.log(range, fullRangeBetween)
		if (fullRangeBetween.length > 0) {
			newRanges.push(...fullRangeBetween);
		}
		
	});
	
	seedRanges = [...newRanges];
	console.log(seedRanges);
}
