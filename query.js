var request = require('request');
var AlfredItem = require("alfred-item");

var item = new AlfredItem();

function parseTime(time) {
	var hour = parseInt(time / 3600);
	var minute = parseInt(time % 60);
	return hour + " 小时 " + minute + " 分钟";
}

request.post({
	url: 'http://p.nju.edu.cn/portal_io/getinfo',
}, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var result = JSON.parse(body);
		if (result.reply_code == 0) {
			result = result.userinfo;
			item.addItem(0, "登录成功（´・∀・`）", "", "icon.png");
			item.addItem(1, "学号", result.username, "icon.png");
			item.addItem(2, "姓名", result.fullname, "icon.png");
			item.addItem(3, "接入区域", result.area_name, "icon.png");
			item.addItem(4, "服务类别", result.service_name, "icon.png");
			item.addItem(5, "网费余额", result.balance / 100, "icon.png");
			// item.addItem(6, "当月在线", parseTime(result.total_time), "icon.png");
			return console.log(item);
		} else {
			if (result.reply_code == 2) {
				item.addItem(0, "未获取到在线信息(´゜Д゜｀)", "", "icon.png");
				return console.log(item);
			} else {
				item.addItem(0, "发生了未知错误(ﾟдﾟ)", "", "icon.png");
				return console.log(item);
			}
			
		}
	}
});

