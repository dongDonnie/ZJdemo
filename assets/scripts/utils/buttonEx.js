const globalvar = require('globalvar');

let audio = cc.Enum({
    confirm: 0,
    cancel: 1,
    closed: 2,
    back: 3,
    pop: 4,
    open: 5,
    check: 6,
    switch: 7,
    none: 8,
});

let audioNames = {
    0: 'audioChips/effect/button_click',
    1: 'audioChips/effect/button_click',
    2: 'audioChips/effect/button_close',
    3: '',
    4: '',
    5: '',
    6: '',
    7: '',
    8: '',
};

let colorType = cc.Enum({
    White: 0,
    Green: 1,
    Blue: 2,
    Purple: 3,
    Orange: 4,
    Red: 5,
    LightBlue: 6,
    LightYellow: 7,
});

var buttonEx = cc.Class({
    extends: cc.Button,
    editor: {
        menu: '重载组件/ButtonEx'
    },

    properties: {
        audioType: {
            default: audio.confirm,
            type: audio,
        },
        fontColor: {
            default: colorType.White,
            type: colorType,
            notify: function () {
                this.setColor();
            }
        },
        textLabel: {
            default: '确定',
            notify: function () {
                this.setLable();
            }
        },
        _fontSize: 30,
        fontSize: {
            get: function () {
                return this._fontSize;
            },
            set: function (value) {
                this._fontSize = value;
                this.changeFontSize();
            }
        },
        _showShadow: true,
        showShadow: {
            get: function () {
                return this._showShadow;
            },
            set: function (value) {
                this._showShadow = !!value;
                this.showFontShadow();
            },
            animatable: true,
        },
        btnState: {
            default: true,
            visible: false,
        },
    },

    onLoad: function () {
        this.node.on('touchstart', this.onTouchStart, this);
        this.node.on('touchend', this.onTouchEnd, this);
        this.node.on('touchcancel', this.onTouchCancel, this);

        // this.canLongPress = false;
        // this.interval = 0.1;
        // this.repeat = cc.macro.REPEAT_FOREVER;
        // this.delay = 0.5;
    },

    setLongPressData: function (interval, repeat, delay) {
        this.interval = interval;
        this.repeat = repeat;
        this.delay = delay;
    },

    onTouchStart: function (event) {
        // let self = this;
        // this._pressEvent = function () {
        //     let clickEvent = self.node.getComponent(cc.Button).clickEvents[0];
        //     let handler = clickEvent.handler;
        //     let target = clickEvent.target;
        //     let customData = clickEvent.customEventData;
        //     let comp = clickEvent._componentName;
        //     target.getComponent(comp)[handler](event, customData);
        // }
        // if (this.canLongPress) {
        //     this._pressEvent();
        //     this.unschedule(this._pressEvent);
        //     this.schedule(this._pressEvent, this.interval, this.repeat, this.delay);
        // }
        this.playAudio();
    },
    onTouchEnd: function (event) {
        // if (this.canLongPress) {
        //     this.node.getComponent(cc.Button)._pressed = false;
        //     this.unschedule(this._pressEvent);
        // }
    },
    onTouchCancel: function (event) {
        // if (this.canLongPress) {
        //     this.node.getComponent(cc.Button)._pressed = false;
        //     this.unschedule(this._pressEvent);
        // }
    },

    setEventState: function (open) {
        this.btnState = typeof open !== 'undefine' ? open : true;
    },

    playAudio: function () {
        let name = audioNames[this.audioType];
        if (name != '') {
            globalvar.soundmanager.playEffect(name);
        }
    },

    getColor: function (index) {
        switch (index) {
            case 0:
                return new cc.color(255, 255, 255);
            case 1:
                return new cc.color(125, 255, 94);
            case 2:
                return new cc.color(17, 203, 255);
            case 3:
                return new cc.color(236, 82, 255);
            case 4:
                return new cc.color(251, 209, 60);
            case 5:
                return new cc.color(255, 73, 43);
            case 6:
                return new cc.color(203, 252, 255);
            case 7:
                return new cc.color(255, 249, 214);
            default:
                return new cc.color(255, 255, 255);
        }
    },

    setColor: function () {
        if (!!this.node.getChildByName("labelName")) {
            this.node.getChildByName("labelName").color = this.getColor(this.fontColor);
        }
    },

    setLable: function () {
        if (!!this.node.getChildByName("labelName")) {
            this.node.getChildByName("labelName").getComponent(cc.Label).string = this.textLabel;
        }
        if (!!this.node.getChildByName("labelShadow")) {
            this.node.getChildByName("labelShadow").getComponent(cc.Label).string = this.textLabel;
        }
    },

    setText: function (text) {
        if (typeof text !== 'undefined') {
            this.textLabel = text;
        }
    },

    setEnabled: function (enabled) {
        enabled = typeof enabled !== 'undefined' ? enabled : true;
        this.node.getComponent(cc.Button).interactable = enabled;
    },

    changeFontSize: function () {
        if (!!this.node.getChildByName("labelName")) {
            let labelName = this.node.getChildByName("labelName").getComponent(cc.Label);
            labelName.fontSize = this._fontSize;
            labelName.lineHeight = this._fontSize;
        }
        if (!!this.node.getChildByName("labelShadow")) {
            let labelShadow = this.node.getChildByName("labelShadow").getComponent(cc.Label);
            labelShadow.fontSize = this._fontSize;
            labelShadow.lineHeight = this._fontSize;
        }
    },

    showFontShadow: function () {
        if (!!this.node.getChildByName("labelShadow")) {
            this.node.getChildByName("labelShadow").active = this._showShadow;
        }
    },
})



cc.Class.Attr.setClassAttr(buttonEx, 'target', 'visible', false);
cc.Class.Attr.setClassAttr(buttonEx, 'normalColor', 'visible', function () {
    return this.transition == cc.Button.Transition.COLOR;
});

cc.Class.Attr.setClassAttr(buttonEx, 'pressedColor', 'visible', function () {
    return this.transition == cc.Button.Transition.COLOR;
});
cc.Class.Attr.setClassAttr(buttonEx, 'hoverColor', 'visible', function () {
    return this.transition == cc.Button.Transition.COLOR;
});
cc.Class.Attr.setClassAttr(buttonEx, 'disabledColor', 'visible', function () {
    return this.transition == cc.Button.Transition.COLOR;
});
cc.Class.Attr.setClassAttr(buttonEx, 'normalSprite', 'visible', function () {
    return this.transition == cc.Button.Transition.SPRITE;
});

cc.Class.Attr.setClassAttr(buttonEx, 'pressedSprite', 'visible', function () {
    return this.transition == cc.Button.Transition.SPRITE;
});
cc.Class.Attr.setClassAttr(buttonEx, 'hoverSprite', 'visible', function () {
    return this.transition == cc.Button.Transition.SPRITE;
});
cc.Class.Attr.setClassAttr(buttonEx, 'disabledSprite', 'visible', function () {
    return this.transition == cc.Button.Transition.SPRITE;
});

cc.Class.Attr.setClassAttr(buttonEx, 'duration', 'visible', function () {
    return this.transition == cc.Button.Transition.SCALE || this.transition == cc.Button.Transition.COLOR;
});
cc.Class.Attr.setClassAttr(buttonEx, 'zoomScale', 'visible', function () {
    return this.transition == cc.Button.Transition.SCALE;
});
