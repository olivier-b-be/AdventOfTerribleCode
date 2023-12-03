const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const numbersAndSymbols = [];

const output = input.reduce((acc, val, row) => {
	let numberString = '';
	const charactersInRow = val.split('');

	charactersInRow.map((char, col) => {
		if (!numbers.includes(char)) {
			if (numberString !== '') {
				numbersAndSymbols.push({ isNumber: true, valueString: numberString, rowIndex: row, colIndex: col - 1 });
				numberString = '';
			}
			
			if (char === '.') return;
			
			numbersAndSymbols.push({ isNumber: false, valueString: char, rowIndex: row, colIndex: col });
			
			return;
		}
		
		numberString += '' + char;
		
		// also check if last col in row
		if (charactersInRow.length - 1 === col && numberString !== '') {
			numbersAndSymbols.push({ isNumber: true, valueString: numberString, rowIndex: row, colIndex: col });
			numberString = '';
		}
	});
	
	return acc;
}, 0);

const realOutput = numbersAndSymbols.filter((input) => input.isNumber).filter((numberCoord) => {
	const startColIndex = numberCoord.colIndex - (numberCoord.valueString.length - 1);
	const startRangeIndex = startColIndex - 1;
	const endRangeIndex = numberCoord.colIndex + 1;

	return numbersAndSymbols
		.filter((newInput) => !newInput.isNumber && newInput.rowIndex >= numberCoord.rowIndex - 1 && newInput.rowIndex <= numberCoord.rowIndex + 1)
		.some((symbolCoord) => symbolCoord.colIndex >= startRangeIndex && symbolCoord.colIndex <= endRangeIndex);

}).reduce((acc, validNumber) => acc + Number(validNumber.valueString), 0);

console.log(realOutput);