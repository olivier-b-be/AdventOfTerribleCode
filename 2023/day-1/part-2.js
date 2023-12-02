const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const numberWords = {
	"one": 1,
	"two": 2,
	"three": 3,
	"four": 4,
	"five": 5,
	"six": 6,
	"seven": 7,
	"eight": 8,
	"nine": 9,
};

const output = input.reduce((acc, val) => {
	const indexAndNumber = [];

	for (var word in numberWords) {
		if (val.indexOf(word) > -1) {
			const indexesOfWord = allIndexes(val, word);
			indexesOfWord.forEach((index) => indexAndNumber.push({ index: index, number: Number(numberWords[word]) }));
		}
		
		if (val.indexOf('' + numberWords[word]) > -1) {
			const indexesOfNumber = allIndexes(val, '' + numberWords[word]);
			indexesOfNumber.forEach((index) => indexAndNumber.push({ index: index, number: Number(numberWords[word]) }));
		}
	}

	if (indexAndNumber.length === 1) {
		return acc + Number(`${indexAndNumber[0].number}${indexAndNumber[0].number}`);
	}

	const firstNumber = [...indexAndNumber].sort((a, b) => a.index - b.index)[0].number;
	const lastNumber = [...indexAndNumber].sort((a, b) => a.index - b.index)[indexAndNumber.length - 1].number;
	const concatNumber = Number(`${firstNumber}${lastNumber}`);
	
	return concatNumber + acc;
}, 0);

function allIndexes(value, wordNumber) {
	const indexes = [];
	let i = -1;
	while (value.indexOf(wordNumber, i + 1) > -1) {
		i = value.indexOf(wordNumber, i + 1);
		indexes.push(i);
	}

	return indexes;
}

console.log(output);