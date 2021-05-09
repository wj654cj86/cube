function p(script) {
	script += 'uuuuuu';
	let data = [];
	data[4] = 'u';
	switch (script[0]) {
		case 'B':
		case 'b':
			data[2] = 'r';
			break;
		case 'L':
		case 'l':
			data[2] = 'b';
			break;
		default:
			data[2] = 'u';
			break;
	}
	switch (script[2]) {
		case 'B':
		case 'b':
			data[8] = 'r';
			break;
		case 'R':
		case 'r':
			data[8] = 'f';
			break;
		default:
			data[8] = 'u';
			break;
	}
	switch (script[6]) {
		case 'F':
		case 'f':
			data[0] = 'l';
			break;
		case 'L':
		case 'l':
			data[0] = 'b';
			break;
		default:
			data[0] = 'u';
			break;
	}
	switch (script[8]) {
		case 'F':
		case 'f':
			data[6] = 'l';
			break;
		case 'R':
		case 'r':
			data[6] = 'f';
			break;
		default:
			data[6] = 'u';
			break;
	}
	switch (script[1]) {
		case 'B':
		case 'b':
			data[5] = 'r';
			break;
		default:
			data[5] = 'u';
			break;
	}
	switch (script[3]) {
		case 'L':
		case 'l':
			data[1] = 'b';
			break;
		default:
			data[1] = 'u';
			break;
	}
	switch (script[5]) {
		case 'R':
		case 'r':
			data[7] = 'f';
			break;
		default:
			data[7] = 'u';
			break;
	}
	switch (script[7]) {
		case 'F':
		case 'f':
			data[3] = 'l';
			break;
		default:
			data[3] = 'u';
			break;
	}
	return data.join('');
}
function q(script) {
	script += 'uuuuuu';
	let data = [];
	data[4] = 'u';
	data[1] = script[1];
	data[7] = script[7];
	switch (script[0]) {
		case 'B':
		case 'b':
			data[2] = 'b';
			break;
		case 'L':
		case 'l':
			data[2] = 'r';
			break;
		default:
			data[2] = 'u';
			break;
	}
	switch (script[2]) {
		case 'B':
		case 'b':
			data[0] = 'b';
			break;
		case 'R':
		case 'r':
			data[0] = 'l';
			break;
		default:
			data[0] = 'u';
			break;
	}
	switch (script[6]) {
		case 'F':
		case 'f':
			data[8] = 'f';
			break;
		case 'L':
		case 'l':
			data[8] = 'r';
			break;
		default:
			data[8] = 'u';
			break;
	}
	switch (script[8]) {
		case 'F':
		case 'f':
			data[6] = 'f';
			break;
		case 'R':
		case 'r':
			data[6] = 'l';
			break;
		default:
			data[6] = 'u';
			break;
	}
	switch (script[3]) {
		case 'L':
		case 'l':
			data[5] = 'r';
			break;
		default:
			data[5] = 'u';
			break;
	}
	switch (script[5]) {
		case 'R':
		case 'r':
			data[3] = 'l';
			break;
		default:
			data[3] = 'u';
			break;
	}
	return data.join('');
}

window.onload = async function () {
	await oll.initial('style.svg');
	let iconvue = new Vue({
		el: '#iconlink',
		data: {
			url: oll.icon
		}
	});
	let showvue = new Vue({
		el: '#show',
		data: {
			table: { oll: oll.list },
			geturl: {},
			count: 0
		}, methods: {
			page() {
				return this.geturl.page == 'pll' ? 'pll' : 'oll';
			},
			rttb(i, j) {
				if (typeof i == 'undefined') {
					return this.table[this.page()];
				} else if (typeof j == 'undefined') {
					return this.table[this.page()].data[i];
				} else {
					return this.table[this.page()].data[i].table[j];
				}
			},
			tdwidth() {
				return typeof this.rttb().size.tdwidth == 'undefined' ? '100px' : (this.rttb().size.tdwidth + 'px');
			},
			algname(id) {
				return this.page() == 'oll' ? ('OLL-' + id) : (id + '-perm');
			},
			alg(formula) {
				return formula.replace(/'/g, '-').replace(/ /g, '_')
			}
		}
	});

	svgdone.onclick = function () {
		oll.list.data[9].table[0].script = svgscript.value;
		delete oll.list.data[9].table[0].src;
		oll.style(9, 0);
		showvue.count++;
	};
	svgp.onclick = function () {
		oll.list.data[9].table[0].script = svgscript.value = p(svgscript.value);
		delete oll.list.data[9].table[0].src;
		oll.style(9, 0);
		showvue.count++;
	};
	svgn.onclick = function () {
		oll.list.data[9].table[0].script = svgscript.value = p(p(p(svgscript.value)));
		delete oll.list.data[9].table[0].src;
		oll.style(9, 0);
		showvue.count++;
	};
	svgq.onclick = function () {
		oll.list.data[9].table[0].script = svgscript.value = q(svgscript.value);
		delete oll.list.data[9].table[0].src;
		oll.style(9, 0);
		showvue.count++;
	};
};
