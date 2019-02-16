'use strict';
var QBZZ = window.QBZZ || {};
QBZZ.helper = QBZZ.helper || {};
(function (window, $) {
    QBZZ.helper.timeHelper = {
        
        timeAddYear: function (dateTime, year) {
            if(!dateTime)return "";
            var dateTime = new Date(dateTime.replace(/-/g, '/'));
            dateTime.setDate(dateTime.getDate() - 1);
            dateTime.setFullYear(dateTime.getFullYear() + parseInt(year));
            var year = parseInt(dateTime.getFullYear());
            var month = parseInt(dateTime.getMonth())+1;
            var day = parseInt(dateTime.getDate());
            var nextTime = [year, month, day];
            for(var i = 0; i < nextTime.length; i++) {
                var time = parseInt(nextTime[i]);
                nextTime[i] = time >= 10 ? time : '0' + nextTime[i];
            }
            return nextTime.join('-');
        },
        timeAddMonth: function (dateTime, month) {
        	if(month==undefined){
        		month=12;
        	}
            if(!dateTime)return "";
            var dateTime = new Date(dateTime.replace(/-/g, '/'));
            dateTime.setDate(dateTime.getDate() - 1);
            dateTime.setMonth(dateTime.getMonth()+ parseInt(month));
            var year = parseInt(dateTime.getFullYear());
            var month = parseInt(dateTime.getMonth())+1;
            var day = parseInt(dateTime.getDate());
            var nextTime = [year, month, day];
            for(var i = 0; i < nextTime.length; i++) {
                var time = parseInt(nextTime[i]);
                nextTime[i] = time >= 10 ? time : '0' + nextTime[i];
            }
            return nextTime.join('-');
        }
    }
})(window, jQuery);