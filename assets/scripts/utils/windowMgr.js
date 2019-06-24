const commonTool = require('commonTool');

var windowMgr = {};

var viewArray = [];
var vectorViewStack = [];
var openLog = true;

windowMgr.pushView = function(path, winName, isFullSceenWnd, callback) {
    let view = findViewInArray(winName);
    let view1 = findViewInStack(winName);
    let node = null;
    let wndNode = cc.find('Canvas/wndNode');
    let maskWnd = wndNode.getChildByName('maskWnd');
    let zIndex = getLastZIndex();
    if(!!view1.node){
        if(view1.index != vectorViewStack.length - 1){
            node = view1.node;
            node.active = true;
            if(isFullSceenWnd){
                maskWnd.active = false;
                node.zIndex = zIndex + 1;
            }else{
                maskWnd.zIndex = zIndex + 1;
                maskWnd.active = true;
                node.zIndex = zIndex + 2;
            }
            node.isFullSceenWnd = isFullSceenWnd;
            vectorViewStack.splice(view1.index, 1);
            vectorViewStack.push(node);
            callback && callback(node);
        }
    } else if (!!view.node) {
        node = view.node;
        node.active = true;
        wndNode.addChild(node);
        if(isFullSceenWnd){
            maskWnd.active = false;
            node.zIndex = zIndex + 1;
        }else{
            maskWnd.zIndex = zIndex + 1;
            maskWnd.active = true;
            node.zIndex = zIndex + 2;
        }
        node.isFullSceenWnd = isFullSceenWnd;
        callback && callback(node);
        vectorViewStack.push(node);
    } else {
        commonTool.loadRes(0, 'prefab/'+ path + winName, function(prefab) {
            if (prefab != null) {
                node = cc.instantiate(prefab);
                viewArray.push(node);
                node.active = true;
                wndNode.addChild(node);
                if(isFullSceenWnd){
                    maskWnd.active = false;
                    node.zIndex = zIndex + 1;
                }else{
                    maskWnd.zIndex = zIndex + 1;
                    maskWnd.active = true;
                    node.zIndex = zIndex + 2;
                }
                node.isFullSceenWnd = isFullSceenWnd;
                callback && callback(node);
                vectorViewStack.push(node);
            } else {
                showLog('PushView: push view failed!');
            }
        });
    }
};

windowMgr.popView = function(winName, callback) {
    let view = findViewInStack(winName);
    if (view.node == null) {
        showLog('PopView: nothing to pop');
        return;
    }
    view.node.removeFromParent(false);
    callback && callback();
    vectorViewStack.splice(view.index, 1);

    let maskWnd = cc.find('Canvas/wndNode/maskWnd');
    let view1 = getLastViewInSstack();
    if(view1 == null) {
        maskWnd.active = false;
    }else{
        if(view1.isFullSceenWnd){
            maskWnd.active = false;
        }else{
            maskWnd.active = true;
            maskWnd.zIndex = view1.zIndex - 1;
        }
    }
};

var findViewInArray = function(winName){
    let nd = null;
    let ind = -1;
    for (let i = 0, len = viewArray.length; i < len; i++) {
        if (viewArray[i].name == winName) {
            nd = viewArray[i];
            ind = i;
            break;
        }
    }
    return { node: nd, index: ind };
};

var findViewInStack = function(winName) {
    let nd = null;
    let ind = -1;
    for (let i = 0, len = vectorViewStack.length; i < len; i++) {
        if (vectorViewStack[i].name == winName) {
            nd = vectorViewStack[i];
            ind = i;
            break;
        }
    }
    return { node: nd, index: ind };
};

var getLastViewInSstack = function(){
    var len = vectorViewStack.length;
    if(len == 0) return null;
    return vectorViewStack[len - 1];
};

var getLastZIndex = function() {
    var len = vectorViewStack.length;
    if (len == 0) return 1;
    return vectorViewStack[len - 1].zIndex;
};

var showLog = function(...args) {
    if (!!openLog) {
        var str = '';
        for (var i = 0; i < args.length; i++) {
            str += args[i];
        }
        console.log(str);
    }
};

module.exports = windowMgr;