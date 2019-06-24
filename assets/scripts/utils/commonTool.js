const windowdefine = require('windowdefine');

var commonTool = {};

var resMapping = [{},{},{},{},{}];

commonTool.loadRes =  function(rtype, path, callback){
    if(!!resMapping[rtype][path]){
        callback(resMapping[rtype][path]);
        return;
    };
    if(rtype == windowdefine.ResType.prefab){
        cc.loader.loadRes(path, cc.Prefab, function (err, obj) {
            if (err) {
                cc.error("LoadPrefab err." + path);
                if (!!callback) {
                    callback(null);
                }
                return;
            }
            resMapping[rtype][path] = obj;
            if (!!callback) {
                callback(obj);
            };
        });
    }else if(rtype == windowdefine.ResType.sprite){
        cc.loader.loadRes(path, cc.SpriteFrame, function (err, obj) {
            if (err) {
                cc.error("LoadSpriteFrame err." + path);
                if (!!callback) {
                    callback(null);
                }
                return;
            }
            resMapping[rtype][path] = obj;
            if (!!callback) {
                callback(obj);
            };
        });
    }else if(rtype == windowdefine.ResType.spriteAtlas){
        cc.loader.loadRes(path, cc.SpriteAtlas, function (err, obj) {
            if (err) {
                cc.error("LoadSpriteAtlas err." + path);
                if (!!callback) {
                    callback(null);
                }
                return;
            }
            resMapping[rtype][path] = obj;
            if (!!callback) {
                callback(obj);
            };
        });
    }else if(rtype == windowdefine.ResType.audio){
        cc.loader.loadRes(path, cc.AudioClip, function (err, obj) {
            if (err) {
                cc.error("LoadAudioClip err." + path);
                if (!!callback) {
                    callback(null);
                }
                return;
            }
            resMapping[rtype][path] = obj;
            if (!!callback) {
                callback(obj);
            };
        });
    }else if(rtype == windowdefine.ResType.jsonAsset){
        cc.loader.loadRes(path, cc.JsonAsset, function (err, obj) {
            if (err) {
                cc.error("LoadPrefab err." + path);
                if (!!callback) {
                    callback(null);
                }
                return;
            }
            resMapping[rtype][path] = obj.json;
            if (!!callback) {
                callback(obj);
            };
        });
    }
};

commonTool.loadUrl =  function(rtype, path, callback){
    path = path + "?a=a.png";
    if(!!resMapping[rtype][path]){
        callback(resMapping[rtype][path]);
        return;
    };
    cc.loader.load(path, function (err, frame) {
        if (err) {
            cc.error("LoadURLSpriteFrame err." + url);
            if (!!callback) {
                callback(null);
            }
            return;
        }
        resMapping[rtype][path] = frame;
        if (!!callback) {
            callback(frame);
        };
    });
};

commonTool.preLoadAllPrefab = function (url, progressCallback, completeCallback) {
    cc.loader.loadResDir(url, cc.Prefab, function(num, total, item){
        progressCallback && progressCallback(num, total);
    }, function(err, prefabs, urls){
        if(!!err){
            cc.error("LoadPrefab err." + url);
        }
        for(let i = 0, len = urls.length; i < len; i++){
            resMapping[windowdefine.ResType.prefab][urls[i]] = prefabs[i];
        }
        completeCallback && completeCallback();
    })
};

commonTool.clickOutSide = function(touchNode, keyNode, callback){
    touchNode.on('touchstart', (event)=>{
        event.stopPropagation(0);
        let pos = event.getLocation();
        let group = keyNode;
        let np = group.convertToNodeSpace(pos);
        let rect = new cc.Rect(0, 0, group.width, group.height);
        if(!rect.contains(np)){
            callback();
        }
    })
};

commonTool.getJsonByName =  function(name){
    let path = 'data/' + name;
    return resMapping[windowdefine.ResType.jsonAsset][path];
};

commonTool.getDataBySingleKey =  function(name, key, value){
    let path = 'data/' + name;
    let data = resMapping[windowdefine.ResType.jsonAsset][path];
    for(let i = 0; i < data.element.length; i++){
        if(data.element[i][key] == value){
            return data.element[i];
        }
    }
};

module.exports = commonTool;