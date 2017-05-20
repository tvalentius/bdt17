var fs = require('fs');
var path = require('path');


module.exports = function(dir, ext, callback) {
	fs.readdir(dir, function(err, list) {
		var _ext = '.'+ext;

		if(err) {
			callback(err,null);
		} else {
			var filteredList = [];

			for (var i = 0; i < list.length; i++) {
				if(_ext == path.extname(list[i])) {
					filteredList.push(list[i]);
				} else {
					continue;
				}
			}

			
			callback(null, filteredList);
		}
	});
}
