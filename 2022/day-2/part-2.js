const fs = require("fs");
let input = [];

const data = fs.readFileSync("input.txt", { encoding: "utf8" });
input = data.toString().split("\r\n");

const values = {
	'X': 1,
	'Y': 2,
	'Z': 3,
};

const output = input.reduce((acc, val) => {
	let [opp, mine] = val.split(' ');
	let value = 0;

	switch (opp) {
		case 'A':
			if (mine == 'Y') {
				value = 3;
				mine = 'X';
			} else if (mine == 'Z') {
				value = 6;
				mine = 'Y';
			} else {
				mine = 'Z';
			}
			break;
		case 'B':
			if (mine == 'Y') {
				value = 3;
				mine = 'Y';
			} else if (mine == 'Z') {
				value = 6;
				mine = 'Z';
			} else {
				mine = 'X';
			}
			break;
		case 'C':
			if (mine == 'Y') {
				value = 3;
				mine = 'Z';
			} else if (mine == 'Z') {
				value = 6
				mine = 'X';
			} else {
				mine = 'Y';
			}
			break;
	}

	return acc + value + values[mine];
}, 0);

console.log(output);