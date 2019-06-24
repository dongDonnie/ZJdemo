
cc.Class({
    extends: cc.Component,

    editor: {
        // menu: 'i18n:MAIN_MENU.component.renderers/SpriteEx',
        menu: '重载组件/SpriteEx',
        requireComponent: cc.Sprite,
    },

    properties: {
        isBlockInputEvent: false,
        spriteList: {
            default: [],
            type: cc.SpriteFrame,
        },
        _index: 0,
        index: {
            get: function () {
                return this._index;
            },
            set: function (value) {
                this._index = value;
                this.setSprite();
            },
        },
    },

    setSprite() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.spriteList[this.index];
    },

    onLoad() {
        if(this.isBlockInputEvent){
            this.node.on("touchstart",(event)=>{event.stopPropagation()});
        }
    },
});