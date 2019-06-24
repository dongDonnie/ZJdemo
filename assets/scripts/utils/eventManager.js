var eventManager = {};
var listenerList = {};
eventManager.addEventListener =  function(event, fun, target){
    if (event == null) {
        cc.error('invalid eventName');
        return;
    }
    if (fun == null){
        cc.error('invalid fun');
        return;
    }
    if (target == null){
        cc.error('invalid  target');
        return;
    }
    var obj = listenerList[event];
    if (obj == null) {
        listenerList[event] = [];
        listenerList[event].push({ target, fun });
    }
    else {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].target.uuid == target.uuid) {
                return;
            }
        }
        listenerList[event].push({ target, fun });
    }
};

eventManager.removeListener =  function(event, target){
    if (event == null || target == null) {
        cc.error('invalid param');
        return;
    }
    var obj = listenerList[event];
    if (obj != null) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].target.uuid == target.uuid) {
                listenerList[event].splice(i, 1);
                i--;
            }
        }
        if (listenerList[event].length == 0) {
            delete listenerList[event];
        }
    }
},

eventManager.dispatchEvent =  function(event, args){
    if (event == null) {
        cc.error('invalid param');
        return;
    }
    var obj = listenerList[event];
    if (obj != null) {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].fun != null && obj[i].target != null) {
                obj[i].fun.call(obj[i].target, args);
            }
        }
    }
},

eventManager.removeListenerWithTarget =  function(target){
    if (target == null) {
        cc.error('invalid param');
        return;
    }
    for (let key in listenerList) {
        let objArray = listenerList[key];
        for (let i = 0; i < objArray.length; i++) {
            let obj = objArray[i];
            if (obj.target.uuid == target.uuid) {
                objArray.splice(i, 1);
                break;
            }
        }
        if (objArray.length == 0) {
            delete listenerList[key];
        }
    }
},

module.exports = eventManager;