exports.add = function (a,b) {
	if (!!a && !!b) { // check a and b are not null
		a = parseInt(a);
		b = parseInt(b);
		if (!isNaN(a) && !isNaN(b)) { // check a and b are numbers
			return a + b;
		}
		else
			return 'Wrong!'
	}
	else
		return 'Error!';
}