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
	const [opp, mine] = val.split(' ');
	let value = 0;

	switch (opp) {
		case 'A':
			if (mine == 'X') {
				value = 3;
			} else if (mine == 'Y') {
				value = 6;
			}
			break;
		case 'B':
			if (mine == 'Y') {
				value = 3;
			} else if (mine == 'Z') {
				value = 6;
			}
			break;
		case 'C':
			if (mine == 'Z') {
				value = 3;
			} else if (mine == 'X') {
				value = 6
			}
			break;
	}

	return acc + value + values[mine];
}, 0);

console.log(output);