const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");
const bitsLength = input[0].length;

const splitBitsReturnArray = (input) => {
	const array = [];
	for (let i = 0; i < bitsLength; i++) {
		array.push([]);
	}

	input.map(bits => {
		const bitsSplit = bits.split('');
		for (let i = 0; i < bitsSplit.length; i++) {
			array[i].push(bitsSplit[i]);
		}
	});
	
	return array;
}

let bitsArrayO2 = splitBitsReturnArray(input);
let bitsArrayCO2 = splitBitsReturnArray(input);

let leftoverO2BitsArray = [...input];
let leftoverCO2BitsArray = [...input];
for (let i = 0; i < bitsLength; i++) {
	const o2map = new Map();
	const co2map = new Map();
	for (const bit of bitsArrayO2[i]) {
		if (o2map.has(bit)) {
			value = o2map.get(bit);
			o2map.set(bit, ++value);
		} else {
			o2map.set(bit, 1);
		}
	}

	for (const bit of bitsArrayCO2[i]) {
		if (co2map.has(bit)) {
			value = co2map.get(bit);
			co2map.set(bit, ++value);
		} else {
			co2map.set(bit, 1);
		}
	}

	if (o2map.get('0') > o2map.get('1')) {
		if (leftoverO2BitsArray.length > 1) leftoverO2BitsArray = leftoverO2BitsArray.filter(value => value.split('')[i] === '0');
	} else {
		if (leftoverO2BitsArray.length > 1) leftoverO2BitsArray = leftoverO2BitsArray.filter(value => value.split('')[i] === '1');
	}

	if (co2map.get('1') < co2map.get('0')) {
		if (leftoverCO2BitsArray.length > 1) leftoverCO2BitsArray = leftoverCO2BitsArray.filter(value => value.split('')[i] === '1');
	} else {
		if (leftoverCO2BitsArray.length > 1) leftoverCO2BitsArray = leftoverCO2BitsArray.filter(value => value.split('')[i] === '0');
	}

	bitsArrayO2 = splitBitsReturnArray(leftoverO2BitsArray);
	bitsArrayCO2 = splitBitsReturnArray(leftoverCO2BitsArray);
}


console.log('O2: ', leftoverO2BitsArray);
console.log('CO2: ', leftoverCO2BitsArray);
console.log('Life support: ' + parseInt(leftoverO2BitsArray[0], 2) * parseInt(leftoverCO2BitsArray, 2));