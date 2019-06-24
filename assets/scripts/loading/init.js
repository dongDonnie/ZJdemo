const globalvar = require('globalvar');

cc.Class({
    extends: cc.Component,

    properties:{

    },

    onLoad: function(){
        this.node.getChildByName('loadBg').active = true;
        globalvar.soundmanager.playBGM('audioChips/bgm/main',true,null);

        let jsons = [
            'data/combination1',
            'data/enemy',
            'data/enemy_group',
            'data/equip_data',
            'data/role_data',
            'data/story_one',
            'data/valence',
        ];
        for(let i = 0; i < jsons.length; i++){
            globalvar.commonTool.loadRes(4, jsons[i], null);
        }
    },

    clickToJump: function(){
        cc.director.loadScene('mainCity');
    },

})