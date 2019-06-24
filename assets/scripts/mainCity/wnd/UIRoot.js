const globalvar = require('globalvar');

let aniType = cc.Enum({
    Scale: 0,
    Fade: 1,
});
cc.Class({
    extends: cc.Component,

    properties:{
        animName: {
            default: aniType.Scale,
            type: aniType
        }
    },

    onLoad: function(){

    },

    start: function(){
        
    },

    onEnable: function(){
        this.playAnimation(1);
    },

    onDisable: function(){
        this.playAnimation(0);
    },

    onDestroy: function(){
        
    },

    close: function(event, playAudio){
        this.playAnimation(0);
        if(!!playAudio){
            globalvar.soundmanager.playEffect('audioChips/effect/button_close');
        }
    },

    playAnimation: function(type){
        let aniname = "Scale";
        if(this.animName == aniType.Scale){
            aniname = "Scale";
        }else if(this.animName == aniType.Fade){
            aniname = "Fade";
        }
        if(type == 0){
            this.getComponent(cc.Animation).play(aniname+'Escape');
        }else if(type == 1){
            this.getComponent(cc.Animation).play(aniname+'Enter');
        }
    },

    animPlayEnd: function(type){
        if(type == 'Escape'){
            globalvar.windowMgr.popView(this.winName);
        }
    },

})