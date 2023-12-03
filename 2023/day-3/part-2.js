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

let finalOutputNumber = 0;
numbersAndSymbols.filter((input) => !input.isNumber && input.valueString === '*').map((gearSymbol) => {	
	const numbersInRange = numbersAndSymbols
		.filter((newInput) => newInput.isNumber && newInput.rowIndex >= gearSymbol.rowIndex - 1 && newInput.rowIndex <= gearSymbol.rowIndex + 1)
		.filter((numberCoord) => gearSymbol.colIndex >= (numberCoord.colIndex - (numberCoord.valueString.length - 1) - 1) && gearSymbol.colIndex <= (numberCoord.colIndex + 1));

	if (numbersInRange.length === 2) {
		finalOutputNumber += Number(numbersInRange[0].valueString) * Number(numbersInRange[1].valueString)
	}
});

console.log(finalOutputNumber);