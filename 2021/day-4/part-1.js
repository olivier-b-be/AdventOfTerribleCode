const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");
const numbersDrawn = input.shift().split(',');
const bingoBoards = input.reduce((prev, curr, index) => {
	if (curr === '') {
		const map = new Map();
		prev.push(map);
		return prev;
	}
	
	curr.split(' ').forEach(number => {
		if (number !== '') prev[prev.length - 1].set(number, 0);
	});

	return prev;
}, []);

const fillInBoards = number => {
	bingoBoards.forEach(board => {
		if (board.has(number))
			board.set(number, 1);
	})
}

let boardWon = false;
const checkIfBoardWon = () => {
	for (let i = 0; i < bingoBoards.length; i++) {
		if (!boardWon)
			checkRows(bingoBoards[i]);

		if (!boardWon)
			checkColumns(bingoBoards[i]);

		if (boardWon) return i;
	}

	return null;
}

const checkRows = board => {
	const values = board.values();
	let rowItems = 0;
	let rowSum = 0;

	for (const value of values) {
		if (rowItems === 5) {
			rowItems = 0;
			if (rowSum === 5) {
				boardWon = true;
				break;
			} else {
				rowSum = 0;
			}
		}

		rowSum += value;
		rowItems++;
	}
}

const checkColumns = board => {
	const values = Array.from(board.values());
	let cols = 5;
	
	for (let col = 0; col < cols; col++) {
		const colSum = values[col] + values[col+(cols*1)] + values[col+(cols*2)] + values[col+(cols*3)] + values[col+(cols*4)]
		if (colSum === 5) {
			boardWon = true;
			break;
		}
	}
}

let gameOver = null;
for (let i = 0; i < numbersDrawn.length; i++) {
	fillInBoards(numbersDrawn[i]);

	if (i > 3 && !boardWon) {
		gameOver = checkIfBoardWon()
	}

	if (gameOver !== null) {
		const winningBoard = bingoBoards[gameOver];
		let bingoSum = 0;
		const entries = winningBoard.entries();
		for (const [key, value] of entries) {
			if (value === 0)
				bingoSum += +key;
		}
		console.log('final score: ' + bingoSum * numbersDrawn[i])
		break;
	}
}
