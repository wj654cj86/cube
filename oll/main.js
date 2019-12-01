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

window.onload = function () {
	refpiece.setAttribute('xmlns', "http://www.w3.org/2000/svg");
	refpiece.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink");
	generator(function* () {
		oll.file = 'style.svg';
		yield {
			nextfunc: oll.initial,
			cbfunc: function () { }
		};
	});
	svgdone.onclick = function () {
		olldiv.innerHTML = '';
		olldata.script[-1] = svgscript.value;
		olldiv.appendChild(oll.style(0));
	};
	svgp.onclick = function () {
		olldiv.innerHTML = '';
		olldata.script[-1] = svgscript.value = p(svgscript.value);
		olldiv.appendChild(oll.style(0));
	};
	svgn.onclick = function () {
		olldiv.innerHTML = '';
		olldata.script[-1] = svgscript.value = p(p(p(svgscript.value)));
		olldiv.appendChild(oll.style(0));
	};
	svgq.onclick = function () {
		olldiv.innerHTML = '';
		olldata.script[-1] = svgscript.value = q(svgscript.value);
		olldiv.appendChild(oll.style(0));
	};
};