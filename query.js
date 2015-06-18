var request = require('request');
var AlfredItem = require("alfred-item");

var item = new AlfredItem();

function parseTime(time) {
	var hour = parseInt(time / 3600);
	var minute = parseInt(time % 60);
	return hour + " 小时 " + minute + " 分钟";
}

request.post({
	url: 'http://p.nju.edu.cn/portal_io/proxy/userinfo',
}, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var result = JSON.parse(body);
		if (result.reply_code == 3010101) {
			result = result.results;
			item.addItem(0, "学号", result.username, "icon.png")
			item.addItem(1, "姓名", result.fullname, "icon.png")
			item.addItem(2, "接入区域", result.area_name, "icon.png");
			item.addItem(3, "服务类别", result.service_name, "icon.png");
			item.addItem(4, "网费余额", result.payamount, "icon.png");
			item.addItem(5, "当月在线", parseTime(result.total_time), "icon.png");
			return console.log(item);
		}
	}
});

