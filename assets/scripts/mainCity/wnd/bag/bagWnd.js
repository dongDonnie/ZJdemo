const UIRoot = require('UIRoot');
const windowdefine = require('windowdefine');
const globalvar = require('globalvar');

cc.Class({
    extends: UIRoot,

    properties:{
        tabs: cc.Node,
        panels: cc.Node,
        prefabs: [cc.Prefab],

    },

    onLoad: function(){
        this.winName = windowdefine.WindowType.E_DT_BAG_WND;

        this._tabIndex = 0;

        let self = this;
        globalvar.commonTool.clickOutSide(this.node, this.node.getChildByName('bg'), () => {
            self.close(null, true);
        });

        let data = globalvar.commonTool.getDataBySingleKey('role_data','robot_elemtns_code','H');
        console.log(data);
    },

    animPlayEnd: function(name){
        this._super(name);
        if(name == 'Enter'){
            
        }else{
            this.changeTabs(null, 0);
        }
    },

    changeTabs:  function(event, customData){
        if(this._tabIndex == customData) return;
        this._tabIndex = parseInt(customData);
        for(let i = 0; i < this.panels.childrenCount; i++){
            this.panels.children[i].active = false;
            this.tabs.children[i].getChildByName('sprite').getComponent('spriteEx').index = 0;
            this.tabs.children[i].getChildByName('Label').color = new cc.color(255, 255, 255);
        }
        this.panels.children[this._tabIndex].active = true;
        this.tabs.children[this._tabIndex].getChildByName('sprite').getComponent('spriteEx').index = 1;
        this.tabs.children[this._tabIndex].getChildByName('Label').color = new cc.color(46, 51, 44);
    },

    updateMecha: function(){
        let scollNode = this.panels[0].getChildByName('mecha');
        let scollEx = scollNode.getComponent('scrollEx');
        scollEx.setColOrRowNum(3);
        let itemNode = cc.instantiate(this.prefabs[0]);

        // let 

        scollEx.setScrollData(this.data, itemNode, callback);
    },

})