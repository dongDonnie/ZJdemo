const UIRoot = require('UIRoot');
const windowdefine = require('windowdefine');
const globalvar = require('globalvar');

cc.Class({
    extends: UIRoot,

    properties:{
        bgmProgress:cc.Sprite,
        effectProgress:cc.Sprite,
    },

    onLoad: function(){
        this.winName = windowdefine.WindowType.E_DT_SETTING_WND;
        var bgmVolume = globalvar.soundmanager.getAudioVolume().bgmVolume;
        var effectVolume = globalvar.soundmanager.getAudioVolume().effectVolume;
        this.bgmProgress.fillRange = bgmVolume;
        this.node.getChildByName('bgm').getComponent(cc.Slider).progress = bgmVolume;
        this.effectProgress.fillRange = effectVolume;
        this.node.getChildByName('effect').getComponent(cc.Slider).progress = effectVolume;
    },

    animPlayEnd(name){
        this._super(name);
        if(name == 'Escape'){

        }else if(name == 'Enter'){

        }
    },

    setProgress(event, customData){
        if(customData == 'BGM'){
            this.bgmProgress.fillRange = event.progress;
        }else{
            this.effectProgress.fillRange = event.progress;
        }
        globalvar.soundmanager.setAudioVolume(customData, event.progress);
    }
})