var pll = (() => {
	let data = {
		h: 6,
		w: 4,
		name: [
			'基本',
			'2段PLL',
			'OLL組合',
			'J-perm',
			'R-perm',
			'G-perm'
		],
		id: [
			['Ua', 'Ub', 'Aa', 'Ab'],
			['H', 'Z', 'E'],
			['F', 'T', 'V', 'Y'],
			['Ja', 'Jb', 'Na', 'Nb'],
			['Ra', 'Rb'],
			['Ga', 'Gb', 'Gc', 'Gd']
		],
		script: [
			[['86a', '64a', '48a'], ['84a', '46a', '68a'], ['19a', '97a', '71a'], ['37a', '79a', '93a']],
			[['a28a', 'a46a'], ['a24a', 'a68a'], ['a17a', 'a39a']],
			[['a28a', 'a39a'], ['a39a', 'a46a'], ['a37a', 'a68a'], ['a19a', 'a24a']],
			[['a17a', 'a48a'], ['a39a', 'a68a'], ['a37a', 'a46a'], ['a19a', 'a46a']],
			[['a24a', 'a39a'], ['a26a', 'a17a']],
			[
				['b24a', 'b46a', 'b62a', 'r13a', 'r71a', 'r37a'],
				['b42a', 'b64a', 'b26a', 'r31a', 'r17a', 'r73a'],
				['b26a', 'b64a', 'b42a', 'r31a', 'r93a', 'r19a'],
				['b62a', 'b46a', 'b24a', 'r13a', 'r39a', 'r91a']
			]
		],
		setup: [
			[
				"",
				"",
				"x'",
				"x'"
			],
			[
				"",
				"",
				"x'"
			],
			[
				"",
				"",
				"z",
				""
			],
			[
				"",
				"",
				"",
				""
			],
			[
				"",
				""
			],
			[
				"",
				"",
				"",
				""
			]
		],
		formula: [
			[
				"L2 U' L' U' L U L U L U' L",
				"R2' U R U R' U' R' U' R' U R'",
				"r' U L' D2' L U' L' D2' L2'",
				"l U' R D2 R' U R D2 R2"
			],
			[
				"M2' U M2' U2 M2' U M2'",
				"M2' U M2' U M' U2 M2' U2 M' U2",
				"(l U' R' D R U R' D') (R U R' D R U' R' D')"
			],
			[
				"R' U' F' (R U R' U' R' F) R2 (U' R' U' R U R') U R",
				"(R U R' U' R' F) R2 (U' R' U' R U R' F')",
				"z U' R D R' U R U' R D' R' U R2 D R2' D'",
				"(F R U' R' U' R U R' F') (R U R' U' R' F R F')"
			],
			[
				"L' U' L F (L' U' L U L F') L2' U L (U)",
				"R U R' F' (R U R' U' R' F) R2 U' R' (U')",
				"R U R' U (R U R' F' (R U R' U' R' F) R2 U' R') U2' R U' R'",
				"L' U' L U' (L' U' L F (L' U' L U L F') L2' U L) U2 L' U L"
			],
			[
				"R U R' F' (R U2 R' U2' R' F R U R) U2' R' (U')",
				"L' U' L F (L' U2' L U2 L F' L' U' L') U2 L (U)"
			],
			[
				"(L2 F2' L' U2' L' U2 L F') (L' U' L U L F') (L2')",
				"(L2) (F L' U' L' U L) (F L' U2' L U2 L F2 L2')",
				"(R2' F2 R U2 R U2' R' F) (R U R' U' R' F) (R2)",
				"(R2') (F' R U R U' R') (F' R U2 R' U2' R' F2' R2)"
			]
		],
		explanation: [
			["Ub鏡像", "全RU公式", "　", "Aa鏡像"],
			["全MU公式", "全MU公式", "OLL-25 + OLL-24"],
			["R'U'F'(T-perm)FUR", "OLL-33 + OLL-37", "　", "OLL-37 + OLL-33"],
			["Jb鏡像", "RUR'F'(OLL-33)FRU'R'U'", "RUR'U(Jb-perm)U'RU'R'", "Na鏡像"],
			["　", "Ra鏡像"],
			["Gc鏡像", "Ga反向", "　", "Gc反向"]
		],
		description: [
			["Ub鏡像，也可以Ub的反向公式", "全RU公式", "", "Aa鏡像，也可以轉向後用Aa的反向"],
			["全MU公式", "全MU公式", "OLL-25 + OLL-24，因為OLL-25已經轉向，OLL-24開頭改為R"],
			["R' U' F' (T-perm) F U R，且F' F抵銷", "OLL-33 + OLL-37，且R F' F R合併為R2，注意OLL-37公式不一樣", "", "OLL-37 + OLL-33，注意OLL-37公式不一樣"],
			["Jb鏡像", "R U R' F' (OLL-33) F R U' R'，且R F' F R合併為R2，最後U'校正", "R U R' U (Jb-perm) U' R U' R'，且U' U'合併為U2", "Na鏡像"],
			["最後U'校正", "Ra鏡像"],
			["Gc鏡像", "Ga反向", "後半段是(OLL-33) F R，且R F' F R合併為R2", "Gc反向"]
		]
	};
	let text = '';
	let defs = '';
	let reg = {};
	let iconurl = '';
	let tagreg = [];
	async function icon() {
		if (iconurl == '') {
			let temp = copyxml(style(5, 0)).getElementsByTagName('svg')[0];
			let svg = text2xml(defs);
			temp.appendChild(svg.getElementsByTagName('defs')[0]);
			iconurl = await promise(svgtopngurl, temp);
		}
		iconlink.setAttribute('href', iconurl);
	}
	async function initial() {
		if (text == '') {
			text = await promise(openfile, 'pll/style.svg');
			defs = await promise(openfile, 'pll/defs.svg');
			let svg = text2xml(defs);
			refpiece.appendChild(svg.getElementsByTagName('defs')[0]);
		}
	}
	function build(formula) {
		if (formula == 1) {
			if (typeof tagreg[1] != 'undefined') {
				return;
			}
			let arr = [];
			let main = document.createElement('tbody');
			tagreg[1] = main;
			for (let i = 0; i < data.h; i++) {
				arr[i] = [];
				let tr = document.createElement('tr');
				let td = document.createElement('td');
				td.className = 'group';
				td.colSpan = '4';
				arr[i][-1] = td;
				tr.appendChild(td);
				main.appendChild(tr);
				for (let j = 0; j < data.w; j++) {
					if (typeof data.id[i][j] != 'undefined') {
						let tr = document.createElement('tr');
						let tr2 = document.createElement('tr');
						let td = document.createElement('td');
						let td2 = document.createElement('td');
						let td3 = document.createElement('td');
						let td4 = document.createElement('td');
						let td5 = document.createElement('td');
						td.className = 'name';
						td.rowSpan = '2';
						td2.className = 'img';
						td2.rowSpan = '2';
						td3.className = 'formula';
						td4.className = 'description';
						td5.className = 'alg';
						td5.rowSpan = '2';
						arr[i][j] = [td, td2, td3, td4, td5];
						tr.appendChild(td);
						tr.appendChild(td2);
						tr.appendChild(td5);
						tr.appendChild(td3);
						tr2.appendChild(td4);
						main.appendChild(tr);
						main.appendChild(tr2);
					}
				}
			}
			for (let i = 0; i < data.h; i++) {
				if (typeof data.id[i] != 'undefined') {
					arr[i][-1].innerHTML = data.name[i];
					for (let j = 0; j < data.w; j++) {
						if (typeof data.id[i][j] != 'undefined') {
							let span1 = document.createElement('span');
							span1.innerHTML = data.id[i][j] + '-perm';
							let svg = copyxml(style(i, j)).getElementsByTagName('svg')[0];
							let a = document.createElement('a');
							a.href = `/alg/?type=alg${data.setup[i][j] == "" ? '' : '&setup=' + data.setup[i][j].replace(/'/g, '-').replace(/ /g, '_')}&alg=${data.formula[i][j].replace(/'/g, '-').replace(/ /g, '_')}`
							a.innerHTML = data.formula[i][j];
							a.target = '_blank';
							let span3 = document.createElement('span');
							span3.innerHTML = data.description[i][j];
							let button = document.createElement('button');
							button.innerHTML = '顯示動畫';
							button.onclick = () => {
								let iframe = document.createElement('iframe');
								iframe.src = `/alg/?type=alg&view=fullscreen&cycleView=disabled${data.setup[i][j] == "" ? '' : '&setup=' + data.setup[i][j].replace(/'/g, '-').replace(/ /g, '_')}&alg=${data.formula[i][j].replace(/'/g, '-').replace(/ /g, '_')}`
								iframe.frameBorder = 0;
								arr[i][j][4].appendChild(iframe);
								let div = document.createElement('div');
								div.append(button);
							};
							arr[i][j][0].appendChild(span1);
							arr[i][j][1].appendChild(svg);
							arr[i][j][2].appendChild(a);
							arr[i][j][3].appendChild(span3);
							arr[i][j][4].appendChild(button);
						}
					}
				}
			}
		} else {
			if (typeof tagreg[0] != 'undefined') {
				return;
			}
			let arr = [];
			let main = document.createElement('tbody');
			tagreg[0] = main;
			for (let i = 0; i < data.h; i++) {
				let tr = document.createElement('tr');
				arr[i] = [];
				let td = document.createElement('td');
				td.style.width = '200px';
				td.className = 'group';
				arr[i][-1] = td;
				tr.appendChild(td);
				for (let j = 0; j < data.w; j++) {
					let td = document.createElement('td');
					td.style.width = '200px';
					td.className = 'img';
					arr[i][j] = td;
					tr.appendChild(td);
				}
				main.appendChild(tr);
			}
			for (let i = 0; i < data.h; i++) {
				if (typeof data.id[i] != 'undefined') {
					arr[i][-1].innerHTML = data.name[i];
					arr[i][-1].style.width = '80px';
					for (let j = 0; j < data.w; j++) {
						if (typeof data.id[i][j] != 'undefined') {
							let span1 = document.createElement('span');
							span1.innerHTML = data.id[i][j] + '-perm';
							let br1 = document.createElement('br');
							let svg = copyxml(style(i, j)).getElementsByTagName('svg')[0];
							let br2 = document.createElement('br');
							let span2 = document.createElement('span');
							span2.innerHTML = data.explanation[i][j];
							arr[i][j].appendChild(span1);
							arr[i][j].appendChild(br1);
							arr[i][j].appendChild(svg);
							arr[i][j].appendChild(br2);
							arr[i][j].appendChild(span2);
						}
					}
				}
			}
		}
	}
	function style(i, j) {
		let id = data.id[i][j];
		if (id in reg) {
			return reg[id];
		}
		let svg = text2xml(text);
		let script = data.script[i][j];
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
			let s = id2seat(it[ptr]);
			let e = id2seat(it[ptr + 1]);
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
		reg[id] = svg.getElementsByTagName('svg')[0];
		return reg[id];
	}
	function id2seat(id) {
		let tmp = id - 1;
		return { x: tmp % 3 - 1, y: Math.floor(tmp / 3) - 1 };
	}
	return {
		get tagreg() {
			return tagreg;
		},
		icon: icon,
		initial: initial,
		build: build,
		style: style
	};
})();