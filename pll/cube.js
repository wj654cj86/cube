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
		[['a39a', 'a68a'], ['a17a', 'a48a'], ['a37a', 'a46a'], ['a19a', 'a46a']],
		[['a17a', 'a68a'], ['a39a', 'a48a']],
		[
			['b24a', 'b48a', 'b82a', 'r19a', 'r97a', 'r71a'],
			['b28a', 'b84a', 'b42a', 'r17a', 'r79a', 'r91a'],
			['b26a', 'b68a', 'b82a', 'r37a', 'r79a', 'r93a'],
			['b28a', 'b86a', 'b62a', 'r39a', 'r97a', 'r73a']
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
						let br1 = document.createElement('br');
						let svg = pll.style(i, j);
						pll.arr[i][j].appendChild(span1);
						pll.arr[i][j].appendChild(br1);
						pll.arr[i][j].appendChild(svg);
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