const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

let maxCardNumber = 0;
const copies = [];
// { cardNumber: number, copies: number }

const output = input.reduce((acc, val) => {
	const [card, numbers] = val.split(':');
	const cardNumber = Number(card.split(' ').filter((x) => x !== '')[1]);

	if (cardNumber > maxCardNumber) maxCardNumber = cardNumber;

	if (copies.findIndex((x) => x.cardNumber === cardNumber) < 0) {
		copies.push({ cardNumber: cardNumber, copies: 0 });
	}
	const [winningNumbers, myNumbers] = numbers.trim().split('|');
	const winningNumbersAsNumber = winningNumbers.trim().split(' ').filter((x => x !== '')).map((x) => Number(x.trim()));
	const amountOfMatches = myNumbers.trim().split(' ').filter((x) => x !== '' && winningNumbersAsNumber.includes(Number(x.trim()))).length;
	const amountOfCopies = copies.find((x) => x.cardNumber === cardNumber).copies;

	for (let i = cardNumber + 1; i <= cardNumber + amountOfMatches ; i++) {
		const existingIndex = copies.findIndex((x) => x.cardNumber === i);

		if (existingIndex < 0) {
			copies.push({ cardNumber: i, copies: 1 + amountOfCopies });
		} else {
			copies[existingIndex].copies += 1 + amountOfCopies;
		}
	}

	return acc;
}, 0);

const scratchCards = copies.filter((x) => x.cardNumber <= maxCardNumber).reduce((acc, val) => acc + val.copies + 1, 0);

console.log(scratchCards);
// console.log(output);