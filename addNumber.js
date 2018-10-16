exports.add = function (a,b) {
	if (a != null && b != null) {
		a = parseInt(a);
		b = parseInt(b);
		return a + b;
	}
	else
		return 'Error!';
}