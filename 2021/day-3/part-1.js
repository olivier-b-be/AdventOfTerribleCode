const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");
const bitsLength = input[0].length;
const bitsArray = [];
for (let i = 0; i < bitsLength; i++) {
	bitsArray.push([]);
}
//console.log(bitsArray);
input.map(bits => {
	const bitsSplit = bits.split('');
	for (let i = 0; i < bitsSplit.length; i++) {
		bitsArray[i].push(bitsSplit[i]);
	}
});
//console.log(bitsArray);
const finalBits = bitsArray.reduce((prev, curr) => {
	const map = new Map();
	for (const bit of curr) {
		if (map.has(bit)) {
			value = map.get(bit);
			map.set(bit, ++value);
		} else {
			map.set(bit, 1);
		}
	}

	if (map.get('0') > map.get('1'))
		return { mostCommon: prev.mostCommon + '0', leastCommon: prev.leastCommon + '1'}
	else
		return { mostCommon: prev.mostCommon + '1', leastCommon: prev.leastCommon + '0'}
}, { mostCommon: '', leastCommon: ''})

console.log(finalBits);
console.log('Power consumption: ' + parseInt(finalBits.mostCommon, 2) * parseInt(finalBits.leastCommon, 2));
