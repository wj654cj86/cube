var pll = (() => {
	let width = 4, height = 6;
	let data = [
		{
			name: "基本",
			table: [
				{ id: "Ua", script: ["86a", "64a", "48a"], setup: "", formula: "L2 U' L' U' L U L U L U' L", explanation: "Ub鏡像", description: "Ub鏡像，也可以Ub的反向公式" },
				{ id: "Ub", script: ["84a", "46a", "68a"], setup: "", formula: "R2' U R U R' U' R' U' R' U R'", explanation: "全RU公式", description: "全RU公式" },
				{ id: "Aa", script: ["19a", "97a", "71a"], setup: "x'", formula: "r' U L' D2' L U' L' D2' L2'", explanation: "　", description: "" },
				{ id: "Ab", script: ["37a", "79a", "93a"], setup: "x'", formula: "l U' R D2 R' U R D2 R2", explanation: "Aa鏡像", description: "Aa鏡像，也可以轉向後用Aa的反向" }
			]
		},
		{
			name: "2段PLL",
			table: [
				{ id: "H", script: ["a28a", "a46a"], setup: "", formula: "M2' U M2' U2 M2' U M2'", explanation: "全MU公式", description: "全MU公式" },
				{ id: "Z", script: ["a24a", "a68a"], setup: "", formula: "M2' U M2' U M' U2 M2' U2 M' U2", explanation: "全MU公式", description: "全MU公式" },
				{ id: "E", script: ["a17a", "a39a"], setup: "x'", formula: "(l U' R' D R U R' D') (R U R' D R U' R' D')", explanation: "OLL-25 + OLL-24", description: "OLL-25 + OLL-24，因為OLL-25已經轉向，OLL-24開頭改為R" }
			]
		},
		{
			name: "OLL組合",
			table: [
				{ id: "F", script: ["a28a", "a39a"], setup: "", formula: "R' U' F' (R U R' U' R' F) R2 (U' R' U' R U R') U R", explanation: "R'U'F'(T-perm)FUR", description: "R' U' F' (T-perm) F U R，且F' F抵銷" },
				{ id: "T", script: ["a39a", "a46a"], setup: "", formula: "(R U R' U' R' F) R2 (U' R' U' R U R' F')", explanation: "OLL-33 + OLL-37", description: "OLL-33 + OLL-37，且R F' F R合併為R2，注意OLL-37公式不一樣" },
				{ id: "V", script: ["a37a", "a68a"], setup: "z", formula: "z U' R D R' U R U' R D' R' U R2 D R2' D'", explanation: "　", description: "" },
				{ id: "Y", script: ["a19a", "a24a"], setup: "", formula: "(F R U' R' U' R U R' F') (R U R' U' R' F R F')", explanation: "OLL-37 + OLL-33", description: "OLL-37 + OLL-33，注意OLL-37公式不一樣" }
			]
		},
		{
			name: "J-perm",
			table: [
				{ id: "Ja", script: ["a17a", "a48a"], setup: "", formula: "L' U' L F (L' U' L U L F') L2' U L (U)", explanation: "Jb鏡像", description: "Jb鏡像" },
				{ id: "Jb", script: ["a39a", "a68a"], setup: "", formula: "R U R' F' (R U R' U' R' F) R2 U' R' (U')", explanation: "RUR'F'(OLL-33)FRU'R'U'", description: "R U R' F' (OLL-33) F R U' R'，且R F' F R合併為R2，最後U'校正" },
				{ id: "Na", script: ["a37a", "a46a"], setup: "", formula: "R U R' U (R U R' F' (R U R' U' R' F) R2 U' R') U2' R U' R'", explanation: "RUR'U(Jb-perm)U'RU'R'", description: "R U R' U (Jb-perm) U' R U' R'，且U' U'合併為U2" },
				{ id: "Nb", script: ["a19a", "a46a"], setup: "", formula: "L' U' L U' (L' U' L F (L' U' L U L F') L2' U L) U2 L' U L", explanation: "Na鏡像", description: "Na鏡像" }
			]
		},
		{
			name: "R-perm",
			table: [
				{ id: "Ra", script: ["a24a", "a39a"], setup: "", formula: "R U R' F' (R U2 R' U2' R' F R U R) U2' R' (U')", explanation: "　", description: "最後U'校正" },
				{ id: "Rb", script: ["a26a", "a17a"], setup: "", formula: "L' U' L F (L' U2' L U2 L F' L' U' L') U2 L (U)", explanation: "Ra鏡像", description: "Ra鏡像" }
			]
		},
		{
			name: "G-perm",
			table: [
				{ id: "Ga", script: ["b24a", "b46a", "b62a", "r13a", "r71a", "r37a"], setup: "", formula: "(L2 F2' L' U2' L' U2 L F') (L' U' L U L F') (L2')", explanation: "Gc鏡像", description: "Gc鏡像" },
				{ id: "Gb", script: ["b42a", "b64a", "b26a", "r31a", "r17a", "r73a"], setup: "", formula: "(L2) (F L' U' L' U L) (F L' U2' L U2 L F2 L2')", explanation: "Ga反向", description: "Ga反向" },
				{ id: "Gc", script: ["b26a", "b64a", "b42a", "r31a", "r93a", "r19a"], setup: "", formula: "(R2' F2 R U2 R U2' R' F) (R U R' U' R' F) (R2)", explanation: "　", description: "後半段是(OLL-33) F R，且R F' F R合併為R2" },
				{ id: "Gd", script: ["b62a", "b46a", "b24a", "r13a", "r39a", "r91a"], setup: "", formula: "(R2') (F' R U R U' R') (F' R U2 R' U2' R' F2' R2)", explanation: "Gc反向", description: "Gc反向" }
			]
		}
	];
	let text = '';
	let defs = '';
	let reg = {};
	let iconurl = '';
	let tagreg = [];
	async function icon() {
		if (iconurl == '') {
			let temp = copyxml(style(5, 0)).getElementsByTagName('svg')[0];
			let svg = text2xml(defs);
			temp.append(svg.getElementsByTagName('defs')[0]);
			iconurl = await promise(svgtopngurl, temp);
		}
		iconlink.setAttribute('href', iconurl);
	}
	async function initial() {
		if (text == '') {
			text = await promise(openfile, 'pll/style.svg');
			defs = await promise(openfile, 'pll/defs.svg');
			let svg = text2xml(defs);
			refpiece.append(svg.getElementsByTagName('defs')[0]);
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
			for (let i = 0; i < height; i++) {
				arr[i] = [];
				let tr = document.createElement('tr');
				let td = document.createElement('td');
				td.className = 'group';
				td.colSpan = '4';
				arr[i][-1] = td;
				tr.append(td);
				main.append(tr);
				for (let j = 0; j < data[i].table.length; j++) {
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
					tr.append(td);
					tr.append(td2);
					tr.append(td5);
					tr.append(td3);
					tr2.append(td4);
					main.append(tr);
					main.append(tr2);
				}
			}
			for (let i = 0; i < height; i++) {
				arr[i][-1].innerHTML = data[i].name;
				for (let j = 0; j < data[i].table.length; j++) {
					let table = data[i].table[j];

					let span1 = document.createElement('span');
					span1.innerHTML = table.id + '-perm';
					let svg = copyxml(style(i, j)).getElementsByTagName('svg')[0];
					let a = document.createElement('a');
					a.href = `/alg/?type=alg${table.setup == "" ? '' : '&setup=' + table.setup.replace(/'/g, '-').replace(/ /g, '_')}&alg=${table.formula.replace(/'/g, '-').replace(/ /g, '_')}`
					a.innerHTML = table.formula;
					a.target = '_blank';
					let span3 = document.createElement('span');
					span3.innerHTML = table.description;
					let button = document.createElement('button');
					button.innerHTML = '顯示動畫';
					button.onclick = () => {
						let iframe = document.createElement('iframe');
						iframe.src = `/alg/?type=alg&view=fullscreen&cycleView=disabled${table.setup == "" ? '' : '&setup=' + table.setup.replace(/'/g, '-').replace(/ /g, '_')}&alg=${table.formula.replace(/'/g, '-').replace(/ /g, '_')}`
						iframe.frameBorder = 0;
						arr[i][j][4].append(iframe);
						let div = document.createElement('div');
						div.append(button);
					};
					arr[i][j][0].append(span1);
					arr[i][j][1].append(svg);
					arr[i][j][2].append(a);
					arr[i][j][3].append(span3);
					arr[i][j][4].append(button);
				}
			}
		} else {
			if (typeof tagreg[0] != 'undefined') {
				return;
			}
			let arr = [];
			let main = document.createElement('tbody');
			tagreg[0] = main;
			for (let i = 0; i < height; i++) {
				let tr = document.createElement('tr');
				arr[i] = [];
				let td = document.createElement('td');
				td.style.width = '200px';
				td.className = 'group';
				arr[i][-1] = td;
				tr.append(td);
				for (let j = 0; j < width; j++) {
					let td = document.createElement('td');
					td.style.width = '200px';
					td.className = 'img';
					arr[i][j] = td;
					tr.append(td);
				}
				main.append(tr);
			}
			for (let i = 0; i < height; i++) {
				arr[i][-1].innerHTML = data[i].name;
				arr[i][-1].style.width = '80px';
				for (let j = 0; j < data[i].table.length; j++) {
					let table = data[i].table[j];
					let span1 = document.createElement('span');
					span1.innerHTML = table.id + '-perm';
					let br1 = document.createElement('br');
					let svg = copyxml(style(i, j)).getElementsByTagName('svg')[0];
					let br2 = document.createElement('br');
					let span2 = document.createElement('span');
					span2.innerHTML = table.explanation;
					arr[i][j].append(span1);
					arr[i][j].append(br1);
					arr[i][j].append(svg);
					arr[i][j].append(br2);
					arr[i][j].append(span2);
				}
			}
		}
	}
	function style(i, j) {
		let table = data[i].table[j];
		let id = table.id;
		if (id in reg) {
			return reg[id];
		}
		let svg = text2xml(text).getElementsByTagName('svg')[0];
		let script = table.script;
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
			svg.append(path);
		}
		reg[id] = svg;
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