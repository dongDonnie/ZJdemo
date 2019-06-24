const globalvar = require('globalvar');

cc.Class({
    extends: cc.Component,

    properties:{

    },

    onLoad: function(){
        cc.find('Canvas/wndNode/mainCity').active = true;
        globalvar.soundmanager.playBGM('audioChips/bgm/main',true,null);
    },

    clickButtons: function(event, customData){
        switch (customData) {
            case 'setting':
                globalvar.commonView.getSettingWnd();
                break;
            case 'mail':
                globalvar.commonView.getEmailWnd();
                break;
            case 'bag':
                globalvar.commonView.getBagWnd();
                break;
            default:
                break;
        }
    },

})