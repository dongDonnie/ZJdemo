const commonTool = require('commonTool');
const windowdefine = require('windowdefine');

var soundmgr = {};

var currentBGM = null;
var currentEffect = null;
var bgmVolume = 0;
var effectVolume = 0.5;

soundmgr.stopBGM = function(){
    if(currentBGM != null){
        cc.audioEngine.stop(currentBGM);
        currentBGM = null;
    }
};

soundmgr.pauseBGM = function() {
    if (currentBGM != null) {
        cc.audioEngine.pause(currentBGM);
    }
};

soundmgr.resumeBGM = function() {
    if (currentBGM != null) {
        cc.audioEngine.resume(currentBGM);
    }
};

soundmgr.playBGM = function(name, loop, callback){
    loop = typeof loop !== 'undefined' ? loop : true;
    soundmgr.stopBGM();
    playAudio('BGM', name, loop, bgmVolume, callback);
};

soundmgr.playEffect = function(name,callback){
    playAudio('EFFECT', name, false, effectVolume, callback);
};

soundmgr.setAudioVolume = function(type, volume){
    if(type == 'BGM'){
        bgmVolume = typeof volume !== 'undefined' ? volume : bgmVolume;
        if (currentBGM != null) {
            cc.audioEngine.setVolume(currentBGM, bgmVolume);
        }
    }else {
        effectVolume = typeof volume !== 'undefined' ? volume : effectVolume;
        if (currentEffect != null) {
            cc.audioEngine.setVolume(currentEffect, effectVolume);
        }
    }
};

soundmgr.getAudioVolume =  function(){
    return { 
        bgmVolume: bgmVolume,
        effectVolume: effectVolume
    };
};

var playAudio = function(type, path, loop, volume, callback) {
    if (path == '') {
        return;
    }
    commonTool.loadRes(windowdefine.ResType.audio, path, function (clip) {
        if (clip != null) {
            play(type, clip, loop, volume, callback);
        }
    });
};

var play = function(type, clip, loop, volume, callback) {
    let audioIndex = cc.audioEngine.play(clip, loop, volume);
    cc.audioEngine.setFinishCallback(audioIndex, function () {
        if (!!callback) {
            callback();
        }
    });
    if (type == 'BGM') {
        currentBGM = audioIndex;
    } else if (type == 'EFFECT') {
        currentEffect = audioIndex;
    }
};

module.exports = soundmgr;