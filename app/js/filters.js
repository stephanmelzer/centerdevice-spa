'use strict';

angular.module('centerdevice.filters', []).
filter('fileSize', function() {
	// taken from http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable#
	var fileSizeFilter = function(fileSizeInBytes) {
		var i = -1;
		var byteUnits = [' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
		do {
			fileSizeInBytes = fileSizeInBytes / 1024;
			i++;
		} while (fileSizeInBytes > 1024);

		// no locale formatted string supported
		return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
	};

	return fileSizeFilter;
});