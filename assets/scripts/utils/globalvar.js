const commonTool = require('commonTool');
const commonView = require('commonView');
const eventManager = require('eventManager');
const soundmanager = require('soundmanager');
const windowMgr = require('windowMgr');

var globalvar = {};

globalvar.commonTool = commonTool;
globalvar.commonView = commonView;
globalvar.eventManager = eventManager;
globalvar.soundmanager = soundmanager;
globalvar.windowMgr = windowMgr;

module.exports = globalvar;