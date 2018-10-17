exports.add = function (a,b) {
	if (!!a && !!b) {
		a = parseInt(a);
		b = parseInt(b);
		if (!isNaN(a) && !isNaN(b)) {
			return a + b;
		}
		else
			return 'Wrong!'
	}
	else
		return 'Error!';
}