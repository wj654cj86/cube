var oll = (() => {
	let data = {
		h: 9,
		w: 10,
		name: [
			'頂層十字',
			'頂層轉角',
			'轉邊不轉角',
			'雙層七步法',
			'Pair移動',
			'十字法組合',
			'組合型公式',
			'特殊Pair移動',
			'無特定分類'
		],
		id: [
			[43, 44, 45, 47, 48, 51],
			[21, 22, 23, 24, 25, 26, 27],
			[20, 28, 57],
			[8, 7, 5, 6, 53, 54, 18],
			[33, 37, 32, 31, 40, 39, 29, 30],
			[4, 3, 11, 12],
			[17, 19, 38, 36, 42, 41, 52],
			[13, 14, 9, 10, 34, 1, 2, 35, 46, 55],
			[50, 49, 15, 16, 56]
		],
		script: [
			'',
			'lbrlurlfr', 'bbrlurffr', 'bbulurlff', 'ubblurffr', 'bbrluuluu', //1~5
			'lbbuuruur', 'bbuluuluf', 'ubbuurfur', 'lubuurffu', 'burluuuff',
			'bbrluuuuf', 'lbbuurfuu', 'bbruuuuff', 'lbbuuuffu', 'bbruuulfu', //11~15
			'lbbuuuufr', 'lbuluruff', 'bbblurufu', 'lbrlurufu', 'ubulurufu',
			'bubuuufuf', 'lubuuuluf', 'bubuuuuuu', 'uuuuuulur', 'buuuuuuur', //21~25
			'lubuuufuu', 'buruuuuuf', 'uuuuurufu', 'buuuurffu', 'uubluuuff',
			'ubbuuruuf', 'bbuluufuu', 'bbuuuuffu', 'lbruuuufu', 'ubrluufuu', //31~35
			'uubluulfu', 'uuruurffu', 'buuuurufr', 'lbuuuuuff', 'ubruuuffu',
			'ubuluufuf', 'ubuuurfuf', 'uuuuurfff', 'uuuluufff', 'bubluruuu', //41~45
			'uurluruur', 'bubuurlfr', 'bubluulfr', 'bbruurfur', 'lbbluuluf',
			'lurlurfuf', 'burlurfur', 'lbrluulur', 'lbruurlur', 'lurlurlur', //51~55
			'lbruuulfr', 'ubuuuuufu'
		],
		formula: [
			"",
			//1
			"R U2 R' (R' F R F') U2' (R' F R F')",
			"(F R' F' R) U2 (F R' F' R) R U2' R'",
			"(L U F U' F' L') y (L F U F' U' L')",
			"(R' U' F' U F R) y' (R' F' U' F U R)",
			"r' U2' R U R' U r",

			"l U2 L' U' L U' l'",
			"l U L' U L U2' l'",
			"r' U' R U' R' U2 r",
			"R U R' U' R' F R2 U R' U' F'",
			"L' U' L U L F' L2' U' L U F",
			//11
			"(R' F' U' F U R) y' (R' F' U' F U R)",
			"(L F U F' U' L') y (L F U F' U' L')",
			"F U R U' R2' F' R U R U' R'",
			"F' U' L' U L2 F L' U' L' U L",
			"r' U' r (R' U' R U) r' U r",

			"l U l' (L U L' U') l U' l'",
			"(R' U' F' U F R) (R U R' U' R' F R F')",
			"(r' U' R U' R' U2 r) (r U R' U R U2' r')",
			"(F R' F' R U R U' R') (R' F' U' F U R)",
			"S R U R' U' R' U' R' U R S'",
			//21
			"R U2 R' U' R U R' U' R U' R'",
			"R U2 R2 U' R2 U' R2 U2 R",
			"R2 D' R U2 R' D R U2 R",
			"l U R' D R U' R' D' x",
			"l U' R' D R U R' D' x",

			"L' U R U' L U R'",
			"R U' L' U R' U' L",
			"r U R' U' M U R U' R'",
			"S' (R U R' U' R' F R F') U S",
			"S (L' U' L U L F' L' F) U' S'",
			//31
			"S' (L' U' L U L F' L') f",
			"S (R U R' U' R' F R) f'",
			"R U R' U' R' F R F'",
			"R U R2' U' R' F R U R U' F'",
			"R U2 R2' F R F' R U2' R'",

			"(L' U' L U' L') U (L U L F' L' F)",
			"F R' F' R U R U' R'",
			"(R U R' U R) U' (R' U' R' F R F')",
			"f' (L F L' U' L' U L) S",
			"f (R' F' R U R U' R') S'",
			//41
			"(L U L' U L U2' L') (F' L' U' L U F)",
			"(R' U' R U' R' U2 R) (F R U R' U' F')",
			"R' (U' F' U F) R",
			"L (U F U' F') L'",
			"R' (F' U' F U) R",

			"R' U' R' F R F' U R",
			"R' (F' U' F U) (F' U' F U) R",
			"L (F U F' U') (F U F' U') L'",
			"l U' l2' U l2 U l2' U' l",
			"r' U r2 U' r2' U' r2 U r'",
			//51
			"R' (U' F' U F) (U' F' U F) R",
			"(R' U' R U' R') U (F' U F R)",
			"r' U' R U' R' U R U' R' U2 r",
			"l U L' U L U' L' U L U2' l'",
			"R U2 R2' U' R U' R' U2 F R F'",

			"r' U' r (U' R' U R) (U' R' U R) r' U r",
			"R U R' U' M' U R U' r'"
		],
		explanation: [
			["順", "鏡", "反", "反2次", "反鏡2次", "順2次"],
			["　", "　", "　", "　", "　", "　", "　"],
			["　", "OLL57反", "　"],
			["順", "鏡", "反", "反鏡", "順2次", "鏡2次", "順+轉+鏡"],
			["順", "反", "S+順+S'", "S'+鏡+S", "S+反+S'", "S'+反鏡+S", "S'+順+US", "S+鏡+U'S'"],
			["順+轉+反", "鏡+轉+反", "反+轉+反", "反鏡+轉+反"],
			["十字+OLL33", "OLL17反", "七步+OLL33", "OLL38鏡", "七步+OLL45", "OLL42鏡", "七步+十字"],
			["　", "OLL13鏡", "OLL13反", "OLL14反", "　", "　", "OLL1反", "　", "　", "　"],
			["　", "OLL50鏡", "　", "OLL15鏡", "OLL15反2次"]
		],
		description: [
			["　", "OLL-43鏡像", "OLL-43反向", "OLL-45做2次，且R R'抵銷", "OLL-48鏡像", "OLL-43做2次，且R' R抵銷"],
			["　", "　", "　", "　", "　", "　", "　"],
			["　", "OLL-57反向", "　"],
			["　", "OLL-8鏡像", "OLL-8反向", "OLL-5鏡像", "OLL-8做2次，且U2 r r' U'合併為U", "OLL-53鏡像", "OLL-8 + 不同方向的OLL-7"],
			["　", "OLL-37反向", "S (OLL-33) S'，且F' S'合併為f'", "OLL-32鏡像", "OLL-32反向", "OLL-40鏡像", "S' (OLL-33) US", "OLL-29鏡像"],
			["(OLL-43) y' (OLL-45)", "OLL-4鏡像", "(OLL-45) y' (OLL-45)", "OLL-12鏡像"],
			["(OLL-43) (OLL33)", "OLL-17反向", "(七步) (OLL-33)，且U2 R' R U合併為U'", "OLL-38鏡像", "(七步) (OLL-45)", "OLL-42鏡像", "(七步) (OLL-43)，且U2 R R' U'合併為U"],
			["　", "OLL-13鏡像", "OLL-13反向", "OLL-14反向", "　", "　", "OLL-1反向", "　", "　", "　"],
			["　", "OLL-50鏡像", "　", "OLL-15鏡像", "OLL-15反向2次，且r' U r r' U' r抵銷"]
		]
	};
	let text = '';
	let defs = '';
	let reg = {};
	let iconurl = '';
	let tagreg = [];
	async function icon() {
		if (iconurl == '') {
			let temp = copyxml(style(43)).getElementsByTagName('svg')[0];
			let svg = text2xml(defs);
			temp.appendChild(svg.getElementsByTagName('defs')[0]);
			iconurl = await promise(svgtopngurl, temp);
		}
		iconlink.setAttribute('href', iconurl);
	}
	async function initial(file, defsfile) {
		if (text == '') {
			text = await promise(openfile, file || 'oll/style.svg');
			defs = await promise(openfile, defsfile || 'oll/defs.svg');
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
							span1.innerHTML = 'OLL-' + data.id[i][j];
							let svg = copyxml(style(data.id[i][j])).getElementsByTagName('svg')[0];
							let a = document.createElement('a');
							a.href = '/alg/?type=alg&stage=OLL&alg=' + data.formula[data.id[i][j]].replace(/'/g, '-').replace(/ /g, '_');
							a.innerHTML = data.formula[data.id[i][j]];
							a.target = '_blank';
							let span3 = document.createElement('span');
							span3.innerHTML = data.description[i][j];
							let button = document.createElement('button');
							button.innerHTML = '顯示動畫';
							button.onclick = () => {
								let iframe = document.createElement('iframe');
								iframe.src = '/alg/?type=alg&stage=OLL&view=fullscreen&cycleView=disabled&alg=' + data.formula[data.id[i][j]].replace(/'/g, '-').replace(/ /g, '_');
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
				td.className = 'group';
				arr[i][-1] = td;
				tr.appendChild(td);
				for (let j = 0; j < data.w; j++) {
					let td = document.createElement('td');
					td.className = 'img';
					arr[i][j] = td;
					tr.appendChild(td);
				}
				main.appendChild(tr);
			}
			for (let i = 0; i < data.h; i++) {
				if (typeof data.id[i] != 'undefined') {
					arr[i][-1].innerHTML = data.name[i];
					arr[i][-1].style.width = '100px';
					for (let j = 0; j < data.w; j++) {
						if (typeof data.id[i][j] != 'undefined') {
							let span1 = document.createElement('span');
							span1.innerHTML = 'OLL-' + data.id[i][j];
							let br1 = document.createElement('br');
							let svg = copyxml(style(data.id[i][j])).getElementsByTagName('svg')[0];
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
	function style(id) {
		if (id in reg) {
			return reg[id];
		}
		let svg = text2xml(text);
		let script = data.script[id];
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

		reg[id] = svg.getElementsByTagName('svg')[0];
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