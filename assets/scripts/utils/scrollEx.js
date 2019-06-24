cc.Class({
    extends: cc.Component,

    editor:{
        menu: '重载组件/ScollEx'
    },

    properties: {
        _initSize: 0,
        _bufferZone: 0,
        _index: 0,
        _content: null,
        _count: 0,
        _colCount: 1,
        _rowCount: 1,

        _gapX: 10,
        _gapY: 10,
        _topGap: 10,
        _leftGap: 10,
        _rightGap: 10,
        _bottomGap: 10,
        _loadOver: false,
    },

    onLoad: function () {
        this.scrollView = this.getComponent(cc.ScrollView);
        this.scrollView.enabled = false;
        this._canScroll = false;
        this._content = this.scrollView.content;
        if (this.scrollView.vertical) {
            this._content.anchorX = 0.5;
            this._content.anchorY = 1;
            this._content.x = 0;
        } else {
            this._content.anchorX = 0;
            this._content.anchorY = 0.5;
            this._content.y = 0;
        }
        this._loadOver = true;
    },

    setColOrRowNum(num) {
        this._colCount = this._rowCount = num;
    },

    setGap: function (gapX = 10, gapY = 10, topGap = 10, leftGap = 10, rightGap = 10, bottomGap = 10) {
        this._gapX = gapX;
        this._gapY = gapY;
        this._topGap = topGap;
        this._leftGap = leftGap;
        this._rightGap = rightGap;
        this._bottomGap = bottomGap;
    },

    setPlayAni: function (callback) {
        this._playAni = callback;
    },

    putPoolNode: function () {
        var poolSize = this.modelPool.size();
        if (poolSize < this._count) {
            for (let i = poolSize; i < this._count; i++) {
                let model = cc.instantiate(this._model);
                this.modelPool.put(model);
            }
        } else {

        }
    },

    setScrollData: function (data, model, refreashItem, fromIndex = 0) {
        let self = this;
        this._model = model;
        this._count = data.length;
        this._refreashItem = refreashItem;
        this._fromIndex = fromIndex;
        setTimeout(() => {
            self.initScroll();
        }, 100);
    },

    initScroll: function () {
        let self = this;
        this._content.removeAllChildren();
        var tModelWidth = this._model.width + this._gapX;
        var tModelHeight = this._model.height + this._gapY;
        let fromIndex = this._fromIndex;
        // this.putPoolNode();

        !this._playAni && (this.scrollView.enabled = true, this._canScroll = true);
        if (this.scrollView.vertical) {
            this._content.height = Math.ceil(this._count / this._colCount) * tModelHeight - this._gapY + this._topGap + this._bottomGap;
            this._content.width = this._colCount * tModelWidth - this._gapX + this._leftGap + this._rightGap;
            this._bufferZone = this.node.height + tModelHeight * 1;
            this._initSize = this._colCount * (Math.floor(this.node.height / tModelHeight) + 4);
            fromIndex = fromIndex < 0 ? 0 : fromIndex;
            var num = fromIndex % this._colCount;
            var oriFromIndex = fromIndex - num;
            fromIndex = fromIndex - num - this._colCount;
            fromIndex = fromIndex < 0 ? 0 : fromIndex;
            this._index = fromIndex;
            this._initSize = this._initSize + fromIndex > this._count ? this._count : this._initSize;
            for (let i = fromIndex; i < this._initSize + fromIndex; i++) {
                var item = cc.instantiate(this._model);
                item.parent = this._content;
                item.y = -(item.height / 2 + Math.floor(i / this._colCount) * (tModelHeight) + this._topGap);
                item.x = (i % this._colCount) * tModelWidth + item.width / 2 - this._content.width / 2 + this._leftGap;
                item.zIndex = this._index;
                this._curItemIndex = this._index;
                this._index++;
                this._refreashItem(item, i);
                this._playAni && this._playAni(item, i, function () {
                    if (i >= self._initSize + fromIndex - 1) {
                        self.scrollView.enabled = true;
                        self._canScroll = true;
                    }
                });
            }
            this._content.y = this.node.height / 2 + Math.floor(oriFromIndex / this._colCount) * tModelHeight;
            this._lastContentY = this._content.y;

            this.scrollView.node.width = this._content.width + this._gapX * 2;
            this.scrollView.node.getChildByName('view').width = this._content.width + this._gapX * 2;
        } else {
            this._content.width = Math.ceil(this._count / this._rowCount) * tModelWidth - this._gapX + this._leftGap + this._rightGap;
            this._content.height = this._rowCount * tModelHeight - this._gapY + this._topGap + this._bottomGap;
            this._bufferZone = this.node.width + tModelWidth * 4;
            this._initSize = this._rowCount * (Math.floor(this.node.width / tModelWidth) + 4);
            var num = fromIndex % this._rowCount;
            var oriFromIndex = fromIndex - num;
            fromIndex = fromIndex - num - this._rowCount;
            fromIndex = fromIndex < 0 ? 0 : fromIndex;
            this._index = fromIndex;
            this._initSize = this._initSize + fromIndex > this._count ? this._count : this._initSize;
            for (let i = fromIndex; i < this._initSize + fromIndex; i++) {
                var item = cc.instantiate(this._model);
                item.parent = this._content;
                item.x = Math.floor(i / this._rowCount) * tModelWidth + item.width / 2 + this._leftGap;
                item.y = this._content.height / 2 - ((i % this._rowCount) * tModelHeight + item.height / 2 + this._topGap);
                item.zIndex = this._index;
                this._curItemIndex = this._index;
                this._index++;
                this._refreashItem(item, this._curItemIndex);
                this._playAni && this._playAni(item, i, function () {
                    if (i >= self._initSize + fromIndex - 1) {
                        self.scrollView.enabled = true;
                        self._canScroll = true;
                    }
                });
            }
            this._content.x = Math.floor(oriFromIndex / this._colCount) * tModelHeight - this.node.width / 2;
            this._lastContentX = this._content.x;

            this.scrollView.node.height = this._content.height + this._gapY * 2;
            this.scrollView.node.getChildByName('view').height = this._content.height + this._gapY * 2;
        }
        this._offsetToTop = 0;
    },

    update: function () {
        if (!this._loadOver) return;
        if (this.scrollView.vertical) {
            if (this._lastContentY == this._content.y) return;
            let isUp = this._lastContentY < this._content.y;
            this._lastContentY = this._content.y;
            if (isUp) {
                for (var j = 0; j < this._content.childrenCount; j++) {
                    var item = this._content.children[j];
                    var tModelWidth = item.width + this._gapX;
                    var tModelHeight = item.height + this._gapY;
                    var viewPos = this.getPositionInView(item);
                    if (viewPos.y > this._bufferZone / 2 && this._index < this._count) {
                        item.y = -(item.height / 2 + Math.floor(this._index / this._colCount) * tModelHeight + this._topGap);
                        item.x = (this._index % this._colCount) * tModelWidth + item.width / 2 - this._content.width / 2 + this._leftGap;
                        item.zIndex = this._index;
                        this._curItemIndex = this._index;
                        this._refreashItem(item, this._curItemIndex);
                        this._index++;
                        this._offsetToTop++;
                    }
                }
            } else {
                for (var k = 0; k < this._content.childrenCount; k++) {
                    var item = this._content.children[k];
                    var tModelWidth = item.width + this._gapX;
                    var tModelHeight = item.height + this._gapY;
                    var viewPos = this.getPositionInView(item);
                    if (viewPos.y < -this._bufferZone / 2 && this._index > this._initSize) {
                        this._index--;
                        this._curItemIndex = this._index - this._initSize;
                        item.y = -(item.height / 2 + Math.floor(this._curItemIndex / this._colCount) * tModelHeight + this._topGap);
                        item.x = (this._index % this._colCount) * tModelWidth + item.width / 2 - this._content.width / 2 + this._leftGap;
                        item.zIndex = this._curItemIndex;
                        this._refreashItem(item, this._curItemIndex);
                        this._offsetToTop--;
                    }
                }
            }
        } else {
            if (this._lastContentX == this._content.x) return;
            let isLeft = this._lastContentX > this._content.x;
            this._lastContentX = this._content.x;
            if (isLeft) {
                for (var j = 0; j < this._content.childrenCount; j++) {
                    var item = this._content.children[j];
                    var tModelWidth = item.width + this._gapX;
                    var tModelHeight = item.height + this._gapY;
                    var viewPos = this.getPositionInView(item);
                    if (viewPos.x < -this._bufferZone / 2 && this._index < this._count) {
                        item.y = this._content.height / 2 - ((this._index % this._rowCount) * tModelHeight + item.height / 2 + this._topGap);
                        item.x = Math.floor(this._index / this._rowCount) * tModelWidth + item.width / 2 + this._leftGap;
                        item.zIndex = this._index;
                        this._refreashItem(item, this._index);
                        this._index++;
                        this._offsetToTop++;
                    }
                }
            } else {
                for (var k = 0; k < this._content.childrenCount; k++) {
                    var item = this._content.children[k];
                    var tModelWidth = item.width + this._gapX;
                    var tModelHeight = item.height + this._gapY;
                    var viewPos = this.getPositionInView(item);
                    if (viewPos.x > this._bufferZone / 2 && this._index > this._initSize) {
                        this._index--;
                        item.y = this._content.height / 2 - ((this._index % this._rowCount) * tModelHeight + item.height / 2 + this._topGap);
                        item.x = Math.floor((this._index - this._initSize) / this._rowCount) * tModelWidth + item.width / 2 + this._leftGap;
                        item.zIndex = this._index - this._initSize;
                        this._refreashItem(item, this._index - this._initSize);
                        this._offsetToTop--;
                    }
                }
            }
        }
    },

    moveToOffset: function (index, time = 0) {
        if (this._count <= 0) return;
        if (index < 1 && index > 0) {
            index = index * this._count;
        }
        if (this.scrollView.vertical) {
            let offsetY = (this._model.height + this._gapY) * Math.floor(index / this._colCount);
            this.scrollView.scrollToOffset(cc.v2(0, offsetY), time);
        } else {
            let offsetX = (this._model.width + this._gapX) * Math.floor(index / this._rowCount);
            this.scrollView.scrollToOffset(cc.v2(offsetX, 0), time);
        }
    },

    reFreashScroll: function (data) {
        this._count = data.length;
        this._playAni = null;
        this._fromIndex = this._index - this._initSize + this._colCount;
        this.initScroll();
        // if (this.scrollView.vertical) {
        //     index = Math.floor(index / this._colCount);
        //     this._curItemIndex <= this._initSize ? index -= 1 : '';

        //     let offsetY = (this._model.height + this._gapY) * (1 + index);
        //     this.scrollView.scrollToOffset(cc.v2(0, offsetY), 0.03);
        // } else {
        //     index = Math.floor(index / this._rowCount);
        //     index = index < 2 ? index - 2 : index;
        //     let offsetX = (this._model.width + this._gapX) * (0 + index);
        //     this.scrollView.scrollToOffset(cc.v2(offsetX, 0), 0.03);
        // }
    },

    getPositionInView(item) {
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },
});