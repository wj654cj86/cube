function paddingLeft(str, lenght) {
	str += '';
	if (str.length >= lenght)
		return str;
	else
		return paddingLeft("0" + str, lenght);
}

function setCookie(cname, cvalue) {
	var d;
	var expires = '';
	d = new Date();
	d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
	expires = "expires=" + d.toUTCString() + ";";
	document.cookie = cname + "=" + cvalue + ";" + expires + "path=" + location.pathname;
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function url2array() {
	var arr = [];
	var strUrl = location.search;
	if (strUrl.indexOf('?') != -1) {
		var allData = strUrl.split("?")[1].split("&");
		for (var i = 0; i < allData.length; i++) {
			var data = allData[i].split("=");
			arr[data[0]] = decodeURIComponent(data[1]);
		}
	}
	return arr;
}

function array2url(arr) {
	var allData = [];
	for (var i in arr) {
		allData.push(i + '=' + encodeURIComponent(arr[i]));
	}
	var strUrl = allData.length != 0 ? ('?' + allData.join('&')) : '';
	var url = location.href.split('?')[0];
	window.history.pushState({}, 0, url + strUrl + location.hash);
}

function openfile(url, callback) {
	if (typeof callback == "undefined") {
		callback = function (str) { };
	}
	let oReq = new XMLHttpRequest();
	oReq.addEventListener("load", function () {
		if (oReq.status != 404) {
			callback(this.responseText);
		} else {
			callback('{}');
		}
	});
	oReq.addEventListener("error", function () {
		callback('{}');
	});
	oReq.open("GET", url);
	oReq.send();
}
function openfiletotext(url, callback) {
	let oReq = new XMLHttpRequest();
	oReq.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			callback(oReq.responseText);
		}
	};
	oReq.open("GET", url, true);
	oReq.send();
}
function text2xml(text) {
	let parser = new DOMParser();
	return parser.parseFromString(text, "text/xml");
}

function xml2text(xml) {
	let xsl = new XMLSerializer();
	return xsl.serializeToString(xml);
}

function generator(genfunc) {
	var g = genfunc();

	function next() {
		let res = g.next();
		if (!res.done) {
			if (typeof res.value.argsfront != 'object') res.value.argsfront = [];
			if (typeof res.value.argsback != 'object') res.value.argsback = [];
			res.value.nextfunc(...res.value.argsfront, function (...args) {
				res.value.cbfunc(...args);
				next();
			}, ...res.value.argsback);
		}
	}
	next();
}

function getimgsize(imgsrc, callback) {
	let a = new Image();
	a.onload = function () {
		callback(a.naturalWidth, a.naturalHeight);
	};
	a.onerror = function () {
		callback(-1, -1);
	};
	a.src = imgsrc;
}
function loadsound(src, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', src);
	xhr.responseType = "blob";
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			let blob = this.response;
			callback(URL.createObjectURL(blob));
		}
	}
}

function svgtoimg(svg, callback) {
	let svgstring = xml2text(svg);
	let img = new Image();
	let blob = new Blob([svgstring], { type: 'image/svg+xml' });
	let url = URL.createObjectURL(blob);
	img.onload = function () {
		callback();
	};
	img.src = url;
	return img;
}

function svgtopngurl(svg, callback) {
	let img = svgtoimg(svg, function () {
		let c = document.createElement("canvas");
		c.setAttribute('width', img.naturalWidth);
		c.setAttribute('height', img.naturalHeight);
		let ctx = c.getContext("2d");
		ctx.drawImage(img, img.naturalWidth, img.naturalHeight);
		c.toBlob(function (blob) {
			let url = URL.createObjectURL(blob);
			callback(url);
		});
	});
}