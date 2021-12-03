const fs = require("fs");
let input = [];

const fileData = fs.readFileSync("input.txt", { encoding: "utf8" });
input = fileData.toString().split("\r\n");

let highestId = 0;
const MAX_ROWS = 128;
const MAX_COL = 8;


for (let partition of input) {
	const rowsInput = partition.substr(0, 7);
	const colInput = partition.substr(7);

	let row = { min: 1, max: MAX_ROWS };
	let col = { min: 1, max: MAX_COL };

	for (let letter of rowsInput) {
		let divider = row.max + 1 - row.min;
		divider /= 2;
		switch (letter) {
			case "B":
				row.min += divider;
				break;
			case "F":
				row.max -= divider;
				break;
			default:
				break;
		}
	}

	for (let letter of colInput) {
		let divider = col.max + 1 - col.min;
		divider /= 2;
		switch (letter) {
			case "R":
				col.min += divider;
				break;
			case "L":
				col.max -= divider;
				break;
			default:
				break;
		}
	}

	const seatID = (row.min - 1) * 8 + (col.min - 1);
	if (seatID > highestId) {
		highestId = seatID;
	}
}

console.log("The seat with the highest id: " + highestId);