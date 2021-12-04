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
	const winningBoards = [];
	for (let i = 0; i < bingoBoards.length; i++) {
		checkRows(bingoBoards[i]);
		checkColumns(bingoBoards[i]);

		if (boardWon) winningBoards.push(i);
		boardWon = false;
	}

	if (winningBoards.length > 0) return { won: true, boards: winningBoards}
	return { won: false, boards: [-1] };
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
	const cols = 5;
	
	for (let col = 0; col < cols; col++) {
		const colSum = values[col] + values[col+(cols*1)] + values[col+(cols*2)] + values[col+(cols*3)] + values[col+(cols*4)];
		if (colSum === 5) {
			boardWon = true;
			break;
		}
	}
}

for (let i = 0; i < numbersDrawn.length; i++) {
	fillInBoards(numbersDrawn[i]);
	let result = checkIfBoardWon()

	if (result.won) {
		let indexOffset = 0;
		if (bingoBoards.length > 1) {
			result.boards.forEach(board => {
				bingoBoards.splice(board - indexOffset, 1);
				indexOffset++;
			});
			boardWon = false;
		} else {
			let bingoSum = 0;
			const entries = bingoBoards[result.boards[0]].entries();
			for (const [key, value] of entries) {
				if (value === 0)
					bingoSum += +key;
			}
			console.log('final score of last board: ' + bingoSum * numbersDrawn[i]);
			break;
		}
	}
}
