var plldata = {
	h: 6,
	w: 4,
	id: [
		['H', 'Z', 'E'],
		['Ua', 'Ub', 'Aa', 'Ab'],
		['F', 'T', 'V', 'Y'],
		['Ja', 'Jb', 'Na', 'Nb'],
		['Ra', 'Rb'],
		['Ga', 'Gb', 'Gc', 'Gd']
	],
	script: [
		[['a28a', 'a46a'], ['a24a', 'a68a'], ['a17a', 'a39a']],
		[['86a', '64a', '48a'], ['84a', '46a', '68a'], ['19a', '97a', '71a'], ['37a', '79a', '93a']],
		[['a28a', 'a39a'], ['a39a', 'a46a'], ['a37a', 'a68a'], ['a19a', 'a24a']],
		[['a17a', 'a48a'], ['a39a', 'a68a'], ['a37a', 'a46a'], ['a19a', 'a46a']],
		[['a24a', 'a39a'], ['a26a', 'a17a']],
		[
			['b24a', 'b46a', 'b62a', 'r31a', 'r17a', 'r73a'],
			['b42a', 'b64a', 'b26a', 'r13a', 'r71a', 'r37a'],
			['b26a', 'b64a', 'b42a', 'r13a', 'r39a', 'r91a'],
			['b62a', 'b46a', 'b24a', 'r31a', 'r93a', 'r19a']
		]
	],
	formula: [
		[
			"M2 U M2 U2 M2 U M2",
			"M2 U M2 U M' U2 M2 U2 M' U2",
			"l U' R' D R U R' D' R U R' D R U' R' D'"
		],
		[
			"M2 U M U2 M' U M2",
			"M2 U' M U2 M' U' M2",
			"r' U L' D2 L U' L' D2 L2",
			"l U' R D2 R' U R D2 R2"
		],
		[
			"R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
			"R U R' U' R' F R2 U' R' U' R U R' F'",
			"L' U R U' L U L' U R' U' L U2 R U2 R'",
			"F R U' R' U' R U R' F' R U R' U' R' F R F'"
		],
		[
			"L' U' L F L' U' L U L F' L2 U L U",
			"R U R' F' R U R' U' R' F R2 U' R' U'",
			"R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
			"L' U' L U' L' U' L F L' U' L U L F' L2 U L U2 L' U L"
		],
		[
			"R U R' F' R U2 R' U2 R' F R U R U2 R' U'",
			"L' U' L F L' U2 L U2 L F' L' U' L' U2 L U"
		],
		[
			"L2 F2 L' U2 L' U2 L F' L' U' L U L F' L2",
			"L2 F L' U' L' U L F L' U2 L U2 L F2 L2",
			"R2 F2 R U2 R U2 R' F R U R' U' R' F R2",
			"R2 F' R U R U' R' F' R U2 R' U2 R' F2 R2"
		]
	]
};

var pll = {
	text: {},
	reg: {},
	file: 'pll/style.svg',
	initial: function (callback) {
		openfiletotext(pll.file, function (text) {
			pll.text = text;
			if (document.getElementById('puzzleup') === null) {
				let puzzleup = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				puzzleup.setAttribute('id', 'puzzleup');
				puzzleup.setAttribute('x', '-9');
				puzzleup.setAttribute('y', '-9');
				puzzleup.setAttribute('width', '18');
				puzzleup.setAttribute('height', '18');
				puzzleup.setAttribute('stroke', '#000');
				puzzleup.setAttribute('stroke-width', '2');
				refpiece.appendChild(puzzleup);
			}
			callback();
		});
	},
	build: function () {
		let table = document.createElement('table');
		for (let i = 0; i < plldata.h; i++) {
			let tr = document.createElement('tr');
			pll.arr[i] = [];
			for (let j = 0; j < plldata.w; j++) {
				let td = document.createElement('td');
				pll.arr[i][j] = td;
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		plldiv.appendChild(table);

		for (let i = 0; i < plldata.h; i++) {
			if (typeof plldata.id[i] != 'undefined') {
				for (let j = 0; j < plldata.w; j++) {
					if (typeof plldata.id[i][j] != 'undefined') {
						let span1 = document.createElement('span');
						span1.innerHTML = 'PLL ' + plldata.id[i][j];
						let br = document.createElement('br');
						let svg = pll.style(i, j);
						let span2 = document.createElement('span');
						span2.innerHTML = plldata.formula[i][j];
						pll.arr[i][j].appendChild(span1);
						pll.arr[i][j].appendChild(br);
						pll.arr[i][j].appendChild(svg);
						if (geturl['formula'] == '1') {
							pll.arr[i][j].appendChild(br);
							pll.arr[i][j].appendChild(span2);
						}
					}
				}
			}
		}
	},
	style: function (i, j) {
		let svg = text2xml(pll.text);
		let id = plldata.id[i][j];
		let script = plldata.script[i][j];
		for (let i in script) {
			let it = script[i];
			let clr = '#f00';
			let ptr = 0;
			if (it[0] == 'r') {
				clr = '#f00';
				ptr++;
			} else if (it[0] == 'g') {
				clr = '#0a0';
				ptr++;
			} else if (it[0] == 'b') {
				clr = '#33f';
				ptr++;
			}
			let d = 'M5,0';
			if (it[ptr] == 'a') {
				d = 'M4,0l2-1v2zm2,0';
				ptr++;
			}
			let s = pll.id2seat(it[ptr]);
			let e = pll.id2seat(it[ptr + 1]);
			let x = e.x - s.x;
			let y = e.y - s.y;
			d += 'h' + Math.round((Math.sqrt(x * x + y * y) * 18 - 10) * 10000) / 10000;
			let t = 'translate(' + s.x * 18 + ',' + s.y * 18 + ') rotate(' + (x != 0 ? (x < 0 ? 180 : 0) + (Math.atan(y / x) * 180 / Math.PI) : (90 + (y < 0) * 180)) + ')';
			if (it[ptr + 2] == 'a') {
				d += 'm1,0l-2-1v2l2-1z';
			}
			let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('fill', clr);
			path.setAttribute('stroke', clr);
			path.setAttribute('stroke-width', 2);
			path.setAttribute('d', d);
			path.setAttribute('transform', t);
			svg.getElementsByTagName('svg')[0].appendChild(path);
		}
		pll.reg[id] = svg.getElementsByTagName('svg')[0];
		return pll.reg[id];
	},
	arr: [],
	id2seat: function (id) {
		let tmp = id - 1;
		return { x: tmp % 3 - 1, y: Math.floor(tmp / 3) - 1 };
	}
};