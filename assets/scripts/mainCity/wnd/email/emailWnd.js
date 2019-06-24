const UIRoot = require('UIRoot');
const windowdefine = require('windowdefine');

cc.Class({
    extends: UIRoot,

    properties:{
        scoll: cc.Node,
        emailItem: cc.Prefab
    },

    onLoad: function(){
        this.winName = windowdefine.WindowType.E_DT_EMAIL_WND;

        this.data = [];
        let itemNode = cc.instantiate(this.emailItem);
        let self = this;
        for (let i = 1; i < 20; i++) {
            this.data.push({
                label: i
            });
        }
        let callback = function(node, index){
            node.active = true;
            node.getChildByName('content').getComponent(cc.Label).string = self.data[index].label;
            node.getChildByName('from').getComponent(cc.Label).string = `来自: ${self.data[index].label} ${new Date().getTime()}`;
        }
        this.scoll.getComponent('scrollEx').setScrollData(this.data, itemNode, callback);
    },

})