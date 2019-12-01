var geturl = url2array();
window.onload = function () {
	refpiece.setAttribute('xmlns', "http://www.w3.org/2000/svg");
	refpiece.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");
	if (typeof geturl['fbclid'] != 'undefined') {
		delete geturl['fbclid'];
		array2url(geturl);
	}
	let page = 'oll';
	if (typeof geturl['page'] != 'undefined') {
		if (geturl['page'].toLowerCase() == 'pll') {
			page = 'pll';
		}
	}
	generator(function* () {
		if (page == 'oll') {
			document.title = 'OLL分類';
			yield {
				nextfunc: oll.initial,
				cbfunc: function () { }
			};
			yield {
				nextfunc: oll.build,
				cbfunc: function () { }
			};
		} else {
			document.title = 'PLL分類';
			yield {
				nextfunc: pll.initial,
				cbfunc: function () { }
			};
			yield {
				nextfunc: pll.build,
				cbfunc: function () { }
			};
		}
	});
};