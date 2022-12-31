import oll from './oll/cube.js';
import pll from './pll/cube.js';
let geturl = url2obj();
let notshow = document.createElement('table');

function showtable(page, formula) {
	notshow.append(oll.tagreg[0]);
	notshow.append(oll.tagreg[1]);
	notshow.append(pll.tagreg[0]);
	notshow.append(pll.tagreg[1]);
	show.append((page == 'oll' ? oll : pll).tagreg[formula]);
}
function createbutton(page, formula) {
	let button = document.createElement('button');
	button.innerHTML = page.toUpperCase() + (formula ? '公式表' : '記憶表');
	button.onclick = async () => {
		document.title = page.toUpperCase() + (formula ? '公式表' : '記憶表');
		if (page == 'oll') {
			delete geturl.page;
			oll.icon();
			oll.build(formula);
		} else {
			geturl.page = 'pll';
			pll.icon();
			pll.build(formula);
		}

		if (formula == 0) {
			delete geturl.formula;
		} else {
			geturl.formula = '1';
		}
		showtable(page, formula);
		obj2url(geturl);
	};

	let obj = {};
	if (page != 'oll') {
		obj.page = 'pll';
	}
	if (formula != 0) {
		obj.formula = 1;
	}
	let a = document.createElement('a');
	a.href = location.href.split('?')[0] + obj2get(obj);
	let event = new MouseEvent('click', {
		'button': 1
	});
	button.onmousedown = async (e) => {
		if (e.button == 1) {
			a.dispatchEvent(event);
			return;
		}
	};
	return button;
}
function createtd(page, formula) {
	let td = document.createElement('td');
	td.append(createbutton(page, formula));
	return td;
}
function createtr() {
	let tr = document.createElement('tr');
	tr.append(createtd('oll', 0));
	tr.append(createtd('oll', 1));
	tr.append(createtd('pll', 0));
	tr.append(createtd('pll', 1));
	return tr;
}

loadpage.append(createtr());

if (geturl.fbclid !== undefined) {
	delete geturl.fbclid;
	obj2url(geturl);
}

let page = geturl.page?.toLowerCase() == 'pll' ? 'pll' : 'oll';
let formula = geturl.formula == '1' ? 1 : 0;

document.title = page.toUpperCase() + (formula ? '公式表' : '記憶表');
if (page == 'oll') {
	oll.icon();
	oll.build(formula);
} else {
	pll.icon();
	pll.build(formula);
}
showtable(page, formula);
