var geturl = url2array();
var notshow = document.createElement('table');
window.onload = async function () {
	await oll.initial();
	await pll.initial();
	let iconvue = new Vue({
		el: '#iconlink',
		data: {
			url: (() => {
				if (geturl.page != 'pll') {
					return oll.icon;
				} else {
					return pll.icon;
				}
			})()
		}
	});
	let showvue = new Vue({
		el: '#show',
		data: {
			table: { oll: oll.list, pll: pll.list },
			geturl: geturl,
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

	let loadpagevue = new Vue({
		el: '#loadpage',
		methods: {
			name: (i) => {
				return (Math.floor((i - 1) / 2) == 0 ? 'OLL' : 'PLL') + ((i - 1) % 2 == 0 ? '記憶表' : '公式表');
			},
			changepage: (i) => {
				let page = (Math.floor((i - 1) / 2) == 0 ? 'oll' : 'pll');
				let formula = (i - 1) % 2;
				if (page == 'oll') {
					delete geturl.page;
					iconvue.url = oll.icon;
				} else {
					geturl.page = 'pll';
					iconvue.url = pll.icon;
				}
				if (formula == 0) {
					delete geturl.formula;
				} else {
					geturl.formula = '1';
				}
				showvue.count++;
				array2url(geturl);
			}
		}
	});
};
