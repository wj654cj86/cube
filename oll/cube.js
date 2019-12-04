var olldata = {
	h: 9,
	w: 8,
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
		[17, 19, 36, 38, 42, 41, 52],
		[34, 49, 50, 1, 2, 35, 46, 55],
		[13, 14, 9, 10, 15, 16, 56]
	],
	script: [
		'lbrlurlfr', 'bbrlurffr', 'bbulurlff', 'ubblurffr', 'bbrluuluu', //1~5
		'lbbuuruur', 'bbuluuluf', 'ubbuurfur', 'lubluuufr', 'buruurlfu',
		'bbrluuuuf', 'lbbuurfuu', 'bbruuuuff', 'lbbuuuffu', 'bbruuulfu', //11~15
		'lbbuuuufr', 'lbuluruff', 'bbblurufu', 'lbrlurufu', 'ubulurufu',
		'bubuuufuf', 'lubuuuluf', 'bubuuuuuu', 'uuuuuulur', 'buuuuuuur', //21~25
		'lubuuufuu', 'buruuuuuf', 'uuuuurufu', 'buuuurffu', 'uubluuuff',
		'ubbuuruuf', 'bbuluufuu', 'bbuuuuffu', 'lbruuuufu', 'ubrluufuu', //31~35
		'ubruurfuu', 'uuruurffu', 'lbuluuuuf', 'lbuuuuuff', 'ubruuuffu',
		'ubuluufuf', 'ubuuurfuf', 'uuuuurfff', 'uuuluufff', 'bubluruuu', //41~45
		'uurluruur', 'bubuurlfr', 'bubluulfr', 'bbbluulur', 'bbbuurlur',
		'lurlurfuf', 'burlurfur', 'lbrluulur', 'lbruurlur', 'lurlurlur', //51~55
		'lbruuulfr', 'ubuuuuufu'
	],
	explanation: [
		['順', '鏡', '反', '反2次', '反鏡2次', '順2次'],
		['　', '　', '　', '　', '　', '　', '　'],
		['　', 'OLL57反', '　'],
		['順', '鏡', '反', '反鏡', '順2次', '鏡2次', '順+轉+鏡'],
		['順', '反', 'S+順+S\'', 'S\'+鏡+S', 'S+反+S\'', 'S\'+反鏡+S', 'S\'+順+US', 'S+鏡+U\'S\''],
		['順+轉+反', '鏡+轉+反', '反+轉+反', '反鏡+轉+反'],
		['十字+OLL33', 'OLL17反', '七步+OLL33', 'OLL36鏡', '七步+OLL45', 'OLL42鏡', '七步+十字'],
		['　', '　', 'OLL49鏡', '　', 'OLL1反', '　', '　', '　'],
		['　', 'OLL13鏡', 'OLL13反', 'OLL14反', '　', 'OLL15鏡', 'OLL15反2次']
	]
};

var oll = {
	text: {},
	reg: {},
	file: 'oll/style.svg',
	icon: function (callback) {
		let temp = copyxml(oll.style(43)).getElementsByTagName('svg')[0];
		let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
		defs.appendChild(copyxml(refpiece).getElementsByTagName('svg')[0]);
		temp.appendChild(defs);
		svgtopngurl(temp, function (url) {
			let lk = document.createElement('link');
			lk.setAttribute('rel', 'icon');
			lk.setAttribute('href', url);
			document.getElementsByTagName("head")[0].appendChild(lk);
			callback();
		});
	},
	initial: function (callback) {
		openfiletotext(oll.file, function (text) {
			oll.text = text;
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

			let puzzlefront = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			puzzlefront.setAttribute('id', 'puzzlefront');
			puzzlefront.setAttribute('d', 'M7,30h-14');
			puzzlefront.setAttribute('stroke', '#000');
			puzzlefront.setAttribute('stroke-width', '2');
			refpiece.appendChild(puzzlefront);

			let puzzleleft = document.createElementNS('http://www.w3.org/2000/svg', 'use');
			puzzleleft.setAttribute('id', 'puzzleleft');
			puzzleleft.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#puzzlefront');
			puzzleleft.setAttribute('transform', 'rotate(90)');
			refpiece.appendChild(puzzleleft);

			let puzzleback = document.createElementNS('http://www.w3.org/2000/svg', 'use');
			puzzleback.setAttribute('id', 'puzzleback');
			puzzleback.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#puzzlefront');
			puzzleback.setAttribute('transform', 'rotate(180)');
			refpiece.appendChild(puzzleback);

			let puzzleright = document.createElementNS('http://www.w3.org/2000/svg', 'use');
			puzzleright.setAttribute('id', 'puzzleright');
			puzzleright.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#puzzlefront');
			puzzleright.setAttribute('transform', 'rotate(270)');
			refpiece.appendChild(puzzleright);

			callback();
		});
	},
	build: function () {
		let table = document.createElement('table');
		for (let i = 0; i < olldata.h; i++) {
			let tr = document.createElement('tr');
			oll.arr[i] = [];
			for (let j = -1; j < olldata.w; j++) {
				let td = document.createElement('td');
				oll.arr[i][j] = td;
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		olldiv.appendChild(table);

		for (let i = 0; i < olldata.h; i++) {
			if (typeof olldata.id[i] != 'undefined') {
				oll.arr[i][-1].innerHTML = olldata.name[i];
				oll.arr[i][-1].style.width = '20px';
				for (let j = 0; j < olldata.w; j++) {
					if (typeof olldata.id[i][j] != 'undefined') {
						let span1 = document.createElement('span');
						span1.innerHTML = 'OLL ' + olldata.id[i][j];
						let br1 = document.createElement('br');
						let svg = oll.style(olldata.id[i][j]);
						let br2 = document.createElement('br');
						let span2 = document.createElement('span');
						span2.innerHTML = olldata.explanation[i][j];

						oll.arr[i][j].appendChild(span1);
						oll.arr[i][j].appendChild(br1);
						oll.arr[i][j].appendChild(svg);
						oll.arr[i][j].appendChild(br2);
						oll.arr[i][j].appendChild(span2);
					}
				}
			}
		}
	},
	style: function (id) {
		if (id in oll.reg) {
			return oll.reg[id];
		}
		let svg = text2xml(oll.text);
		let script = olldata.script[id - 1];
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

		oll.reg[id] = svg.getElementsByTagName('svg')[0];
		return oll.reg[id];
	},
	arr: []
};