var request = require('request');
var username = ;
var password = '';

request.post({
	url: 'http://p.nju.edu.cn/portal_io/login',
	form: {
		username: username,
		password: password
	}
}, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body)
	}
});