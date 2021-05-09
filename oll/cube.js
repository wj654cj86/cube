var oll = (() => {
	let width = 10, height = 9;
	let data = [
		{
			name: "頂層十字",
			table: [
				{ id: 43, script: "uuuuurfff", formula: "R' (U' F' U F) R", explanation: "順", description: "　" },
				{ id: 44, script: "uuuluufff", formula: "L (U F U' F') L'", explanation: "鏡", description: "OLL-43鏡像" },
				{ id: 45, script: "bubluruuu", formula: "R' (F' U' F U) R", explanation: "反", description: "OLL-43反向" },
				{ id: 47, script: "bubuurlfr", formula: "R' (F' U' F U) (F' U' F U) R", explanation: "反2次", description: "OLL-45做2次，且R R'抵銷" },
				{ id: 48, script: "bubluulfr", formula: "L (F U F' U') (F U F' U') L'", explanation: "反鏡2次", description: "OLL-48鏡像" },
				{ id: 51, script: "lurlurfuf", formula: "R' (U' F' U F) (U' F' U F) R", explanation: "順2次", description: "OLL-43做2次，且R' R抵銷" }
			]
		},
		{
			name: "頂層轉角",
			table: [
				{ id: 21, script: "bubuuufuf", formula: "R U2 R' U' R U R' U' R U' R'", explanation: "　", description: "　" },
				{ id: 22, script: "lubuuuluf", formula: "R U2' R2' U' R2 U' R2' U2' R", explanation: "　", description: "　" },
				{ id: 23, script: "bubuuuuuu", formula: "R2 D' R U2 R' D R U2 R", explanation: "　", description: "　" },
				{ id: 24, script: "uuuuuulur", formula: "l U R' D R U' R' D' x", explanation: "　", description: "　" },
				{ id: 25, script: "buuuuuuur", formula: "l U' R' D R U R' D' x", explanation: "　", description: "　" },
				{ id: 26, script: "lubuuufuu", formula: "L' U R U' L U R'", explanation: "　", description: "　" },
				{ id: 27, script: "buruuuuuf", formula: "R U' L' U R' U' L", explanation: "　", description: "　" }
			]
		},
		{
			name: "轉邊不轉角",
			table: [
				{ id: 20, script: "ubulurufu", formula: "S R U R' U' R' U' R' U R S'", explanation: "　", description: "　" },
				{ id: 28, script: "uuuuurufu", formula: "r U R' U' M U R U' R'", explanation: "OLL57反", description: "OLL-57反向" },
				{ id: 57, script: "ubuuuuufu", formula: "R U R' U' M' U R U' r'", explanation: "　", description: "　" }
			]
		},
		{
			name: "雙層七步法",
			table: [
				{ id: 8, script: "ubbuurfur", formula: "r' U' R U' R' U2 r", explanation: "順", description: "　" },
				{ id: 7, script: "bbuluuluf", formula: "l U L' U L U2' l'", explanation: "鏡", description: "OLL-8鏡像" },
				{ id: 5, script: "bbrluuluu", formula: "r' U2' R U R' U r", explanation: "反", description: "OLL-8反向" },
				{ id: 6, script: "lbbuuruur", formula: "l U2 L' U' L U' l'", explanation: "反鏡", description: "OLL-5鏡像" },
				{ id: 53, script: "lbrluulur", formula: "r' U' R U' R' U R U' R' U2 r", explanation: "順2次", description: "OLL-8做2次，且U2 r r' U'合併為U" },
				{ id: 54, script: "lbruurlur", formula: "l U L' U L U' L' U L U2' l'", explanation: "鏡2次", description: "OLL-53鏡像" },
				{ id: 18, script: "bbblurufu", formula: "(r' U' R U' R' U2 r) (r U R' U R U2' r')", explanation: "順+轉+鏡", description: "OLL-8 + 不同方向的OLL-7" }
			]
		},
		{
			name: "Pair移動",
			table: [
				{ id: 33, script: "bbuuuuffu", formula: "R U R' U' R' F R F'", explanation: "順", description: "　" },
				{ id: 37, script: "uuruurffu", formula: "F R' F' R U R U' R'", explanation: "反", description: "OLL-37反向" },
				{ id: 32, script: "bbuluufuu", formula: "S (R U R' U' R' F R) f'", explanation: "S+順+S'", description: "S (OLL-33) S'，且F' S'合併為f'" },
				{ id: 31, script: "ubbuuruuf", formula: "S' (L' U' L U L F' L') f", explanation: "S'+鏡+S", description: "OLL-32鏡像" },
				{ id: 40, script: "ubruuuffu", formula: "f (R' F' R U R U' R') S'", explanation: "S+反+S'", description: "OLL-32反向" },
				{ id: 39, script: "lbuuuuuff", formula: "f' (L F L' U' L' U L) S", explanation: "S'+反鏡+S", description: "OLL-40鏡像" },
				{ id: 29, script: "buuuurffu", formula: "S' (R U R' U' R' F R F') U S", explanation: "S'+順+US", description: "S' (OLL-33) US" },
				{ id: 30, script: "uubluuuff", formula: "S (L' U' L U L F' L' F) U' S'", explanation: "S+鏡+U'S'", description: "OLL-29鏡像" }
			]
		},
		{
			name: "十字法組合",
			table: [
				{ id: 4, script: "ubblurffr", formula: "(R' U' F' U F R) y' (R' F' U' F U R)", explanation: "順+轉+反", description: "(OLL-43) y' (OLL-45)" },
				{ id: 3, script: "bbulurlff", formula: "(L U F U' F' L') y (L F U F' U' L')", explanation: "鏡+轉+反", description: "OLL-4鏡像" },
				{ id: 11, script: "bbrluuuuf", formula: "(R' F' U' F U R) y' (R' F' U' F U R)", explanation: "反+轉+反", description: "(OLL-45) y' (OLL-45)" },
				{ id: 12, script: "lbbuurfuu", formula: "(L F U F' U' L') y (L F U F' U' L')", explanation: "反鏡+轉+反", description: "OLL-12鏡像" }
			]
		},
		{
			name: "組合型公式",
			table: [
				{ id: 17, script: "lbuluruff", formula: "(R' U' F' U F R) (R U R' U' R' F R F')", explanation: "十字+OLL33", description: "(OLL-43) (OLL33)" },
				{ id: 19, script: "lbrlurufu", formula: "(F R' F' R U R U' R') (R' F' U' F U R)", explanation: "OLL17反", description: "OLL-17反向" },
				{ id: 38, script: "buuuurufr", formula: "(R U R' U R) U' (R' U' R' F R F')", explanation: "七步+OLL33", description: "(七步) (OLL-33)，且U2 R' R U合併為U'" },
				{ id: 36, script: "uubluulfu", formula: "(L' U' L U' L') U (L U L F' L' F)", explanation: "OLL38鏡", description: "OLL-38鏡像" },
				{ id: 42, script: "ubuuurfuf", formula: "(R' U' R U' R' U2 R) (F R U R' U' F')", explanation: "七步+OLL45", description: "(七步) (OLL-45)" },
				{ id: 41, script: "ubuluufuf", formula: "(L U L' U L U2' L') (F' L' U' L U F)", explanation: "OLL42鏡", description: "OLL-42鏡像" },
				{ id: 52, script: "burlurfur", formula: "(R' U' R U' R') U (F' U F R)", explanation: "七步+十字", description: "(七步) (OLL-43)，且U2 R R' U'合併為U" }
			]
		},
		{
			name: "特殊Pair移動",
			table: [
				{ id: 13, script: "bbruuuuff", formula: "F U R U' R2' F' R U R U' R'", explanation: "　", description: "　" },
				{ id: 14, script: "lbbuuuffu", formula: "F' U' L' U L2 F L' U' L' U L", explanation: "OLL13鏡", description: "OLL-13鏡像" },
				{ id: 9, script: "lubuurffu", formula: "R U R' U' R' F R2 U R' U' F'", explanation: "OLL13反", description: "OLL-13反向" },
				{ id: 10, script: "burluuuff", formula: "L' U' L U L F' L2' U' L U F", explanation: "OLL14反", description: "OLL-14反向" },
				{ id: 34, script: "lbruuuufu", formula: "R U R2' U' R' F R U R U' F'", explanation: "　", description: "　" },
				{ id: 1, script: "lbrlurlfr", formula: "R U2 R' (R' F R F') U2' (R' F R F')", explanation: "　", description: "　" },
				{ id: 2, script: "bbrlurffr", formula: "(F R' F' R) U2 (F R' F' R) R U2' R'", explanation: "OLL1反", description: "OLL-1反向" },
				{ id: 35, script: "ubrluufuu", formula: "R U2 R2' F R F' R U2' R'", explanation: "　", description: "　" },
				{ id: 46, script: "uurluruur", formula: "R' U' R' F R F' U R", explanation: "　", description: "　" },
				{ id: 55, script: "lurlurlur", formula: "R U2 R2' U' R U' R' U2 F R F'", explanation: "　", description: "　" }
			]
		},
		{
			name: "無特定分類",
			table: [
				{ id: 50, script: "lbbluuluf", formula: "r' U r2 U' r2' U' r2 U r'", explanation: "　", description: "　" },
				{ id: 49, script: "bbruurfur", formula: "l U' l2' U l2 U l2' U' l", explanation: "OLL50鏡", description: "OLL-50鏡像" },
				{ id: 15, script: "bbruuulfu", formula: "r' U' r (R' U' R U) r' U r", explanation: "　", description: "　" },
				{ id: 16, script: "lbbuuuufr", formula: "l U l' (L U L' U') l U' l'", explanation: "OLL15鏡", description: "OLL-15鏡像" },
				{ id: 56, script: "lbruuulfr", formula: "r' U' r (U' R' U R) (U' R' U R) r' U r", explanation: "OLL15反2次", description: "OLL-15反向2次，且r' U r r' U' r抵銷" }
			]
		},
		{
			name: "轉換",
			table: [
				{ id: 58, script: "lbbluuluf", formula: " ", explanation: "　", description: "　" }
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
			let temp = copyxml(style(0, 0)).getElementsByTagName('svg')[0];
			let svg = text2xml(defs);
			temp.append(svg.getElementsByTagName('defs')[0]);
			iconurl = await promise(svgtopngurl, temp);
		}
		iconlink.setAttribute('href', iconurl);
	}
	async function initial(file, defsfile) {
		if (text == '') {
			text = await promise(openfile, file || 'oll/style.svg');
			defs = await promise(openfile, defsfile || 'oll/defs.svg');
			let svg = text2xml(defs);
			refpiece.append(svg.getElementsByTagName('defs')[0]);
		}
	}
	function build(formula) {
		if (formula == 1) {
			if (typeof tagreg[1] != 'undefined') {
				return;
			}
			let tbody = document.createElement('tbody');
			tagreg[1] = tbody;
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			td.className = 'warn';
			td.colSpan = '4';
			td.innerHTML = '目前只有Firefox可以同時顯示所有動畫，其他瀏覽器顯示多個動畫可能會當機。';
			tr.append(td);
			tbody.append(tr);
			for (let i = 0; i < height; i++) {
				let tr = document.createElement('tr');
				let td = document.createElement('td');
				td.className = 'group';
				td.colSpan = '4';
				td.innerHTML = data[i].name;
				tr.append(td);
				tbody.append(tr);
				for (let j = 0; j < data[i].table.length; j++) {
					let table = data[i].table[j];

					let tr = document.createElement('tr');
					let tr2 = document.createElement('tr');
					tbody.append(tr);
					tbody.append(tr2);

					let td = document.createElement('td');
					td.className = 'name';
					td.rowSpan = '2';
					td.innerHTML = 'OLL-' + table.id;

					let td2 = document.createElement('td');
					td2.className = 'img';
					td2.rowSpan = '2';
					let svg = copyxml(style(i, j)).getElementsByTagName('svg')[0];
					td2.append(svg);

					let td3 = document.createElement('td');
					td3.className = 'formula';
					let a = document.createElement('a');
					a.href = '/alg/?type=alg&stage=OLL&alg=' + table.formula.replace(/'/g, '-').replace(/ /g, '_');
					a.innerHTML = table.formula;
					a.target = '_blank';
					td3.append(a);

					let td4 = document.createElement('td');
					td4.className = 'description';
					td4.innerHTML = table.description;

					let td5 = document.createElement('td');
					td5.className = 'alg';
					td5.rowSpan = '2';
					let button = document.createElement('button');
					button.innerHTML = '顯示動畫';
					button.onclick = () => {
						let iframe = document.createElement('iframe');
						iframe.src = '/alg/?type=alg&stage=OLL&view=fullscreen&cycleView=disabled&alg=' + table.formula.replace(/'/g, '-').replace(/ /g, '_');
						td5.append(iframe);
						let div = document.createElement('div');
						div.append(button);
					};
					td5.append(button);

					tr.append(td);
					tr.append(td2);
					tr.append(td5);
					tr.append(td3);
					tr2.append(td4);
				}
			}
		} else {
			if (typeof tagreg[0] != 'undefined') {
				return;
			}
			let tbody = document.createElement('tbody');
			tagreg[0] = tbody;
			for (let i = 0; i < height; i++) {
				let tr = document.createElement('tr');
				tbody.append(tr);
				let td = document.createElement('td');
				td.className = 'group';
				td.innerHTML = data[i].name;
				tr.append(td);
				for (let j = 0; j < data[i].table.length; j++) {
					let table = data[i].table[j];

					let td = document.createElement('td');
					td.className = 'img';
					tr.append(td);

					let span1 = document.createElement('span');
					span1.innerHTML = 'OLL-' + table.id;
					let br1 = document.createElement('br');
					let svg = copyxml(style(i, j)).getElementsByTagName('svg')[0];
					let br2 = document.createElement('br');
					let span2 = document.createElement('span');
					span2.innerHTML = table.explanation;

					td.append(span1);
					td.append(br1);
					td.append(svg);
					td.append(br2);
					td.append(span2);
				}
				for (let j = data[i].table.length; j < width; j++) {
					let td = document.createElement('td');
					td.className = 'img';
					tr.append(td);
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
		let face = [[], [], []];
		let edge = [[], [], [], []];
		face[1][1] = 1;
		switch (script[0]) {
			case 'B':
			case 'b':
				face[0][0] = 0;
				edge[0][0] = 0;
				edge[2][0] = 1;
				break;
			case 'L':
			case 'l':
				face[0][0] = 0;
				edge[0][0] = 1;
				edge[2][0] = 0;
				break;
			default:
				face[0][0] = 1;
				edge[0][0] = 1;
				edge[2][0] = 1;
				break;
		}
		switch (script[2]) {
			case 'B':
			case 'b':
				face[0][2] = 0;
				edge[0][2] = 0;
				edge[3][0] = 1;
				break;
			case 'R':
			case 'r':
				face[0][2] = 0;
				edge[0][2] = 1;
				edge[3][0] = 0;
				break;
			default:
				face[0][2] = 1;
				edge[0][2] = 1;
				edge[3][0] = 1;
				break;
		}
		switch (script[6]) {
			case 'F':
			case 'f':
				face[2][0] = 0;
				edge[1][0] = 0;
				edge[2][2] = 1;
				break;
			case 'L':
			case 'l':
				face[2][0] = 0;
				edge[1][0] = 1;
				edge[2][2] = 0;
				break;
			default:
				face[2][0] = 1;
				edge[1][0] = 1;
				edge[2][2] = 1;
				break;
		}
		switch (script[8]) {
			case 'F':
			case 'f':
				face[2][2] = 0;
				edge[1][2] = 0;
				edge[3][2] = 1;
				break;
			case 'R':
			case 'r':
				face[2][2] = 0;
				edge[1][2] = 1;
				edge[3][2] = 0;
				break;
			default:
				face[2][2] = 1;
				edge[1][2] = 1;
				edge[3][2] = 1;
				break;
		}
		switch (script[1]) {
			case 'B':
			case 'b':
				face[0][1] = 0;
				edge[0][1] = 0;
				break;
			default:
				face[0][1] = 1;
				edge[0][1] = 1;
				break;
		}
		switch (script[3]) {
			case 'L':
			case 'l':
				face[1][0] = 0;
				edge[2][1] = 0;
				break;
			default:
				face[1][0] = 1;
				edge[2][1] = 1;
				break;
		}
		switch (script[5]) {
			case 'R':
			case 'r':
				face[1][2] = 0;
				edge[3][1] = 0;
				break;
			default:
				face[1][2] = 1;
				edge[3][1] = 1;
				break;
		}
		switch (script[7]) {
			case 'F':
			case 'f':
				face[2][1] = 0;
				edge[1][1] = 0;
				break;
			default:
				face[2][1] = 1;
				edge[1][1] = 1;
				break;
		}
		let usearr = svg.getElementsByTagName('use');
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				usearr[i * 3 + j].setAttribute('fill', face[i][j] ? '#ff0' : '#fff');
			}
		}
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 3; j++) {
				usearr[9 + i * 3 + j].setAttribute('opacity', 1 - edge[i][j]);
			}
		}

		reg[id] = svg;
		return reg[id];
	}
	return {
		get data() {
			return data;
		},
		get reg() {
			return reg;
		},
		get tagreg() {
			return tagreg;
		},
		icon: icon,
		initial: initial,
		build: build,
		style: style
	};
})();