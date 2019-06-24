const windowMgr = require('windowMgr');
const windowdefine = require('windowdefine');

const isFullScreen = false;

module.exports = {
    getEmailWnd: function(callback){
        windowMgr.pushView("email/", windowdefine.WindowType.E_DT_EMAIL_WND, isFullScreen, callback);
    },

    getSettingWnd: function(callback){
        windowMgr.pushView("setting/", windowdefine.WindowType.E_DT_SETTING_WND, isFullScreen, callback);
    },

    getBagWnd: function(callback){
        windowMgr.pushView("bag/", windowdefine.WindowType.E_DT_BAG_WND, isFullScreen, callback);
    },
}