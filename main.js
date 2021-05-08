var geturl = url2array();
var notshow = document.createElement('table');
window.onload = async function () {
	refpiece.setAttribute('xmlns', "http://www.w3.org/2000/svg");
	refpiece.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");

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
				await oll.initial();
				await oll.icon();
				oll.build(formula);
			} else {
				geturl.page = 'pll';
				await pll.initial();
				await pll.icon();
				pll.build(formula);
			}

			if (formula == 0) {
				delete geturl.formula;
			} else {
				geturl.formula = '1';
			}
			showtable(page, formula);
			array2url(geturl);
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

	async function initial() {
		if (typeof geturl.fbclid != 'undefined') {
			delete geturl.fbclid;
			array2url(geturl);
		}
		let page = 'oll';
		if (typeof geturl.page != 'undefined') {
			if (geturl.page.toLowerCase() == 'pll') {
				page = 'pll';
			}
		}
		let formula = geturl.formula == '1' ? 1 : 0;
		document.title = page.toUpperCase() + (formula ? '公式表' : '記憶表');
		if (page == 'oll') {
			await oll.initial();
			await oll.icon();
			oll.build(formula);
		} else {
			await pll.initial();
			await pll.icon();
			pll.build(formula);
		}
		showtable(page, formula);
	}

	await initial();

	window.addEventListener("popstate", async () => {
		geturl = url2array();
		await initial();
	});
};