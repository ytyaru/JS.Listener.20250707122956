(function(){//HTML要素に_listeners/litten/unlistenを追加する。
console.log(HTMLElement.prototype)
function isEl(v) {return v instanceof HTMLElement}
function isStr(v) {return 'string'===typeof v || v instanceof String}
function isFn(v) {return 'function'===typeof v && !v.toString().match(/^class /)}
function isAFn(v) {return (v instanceof (async function () {}.constructor))}
function isListener(v) {return isFn(v) || isAFn(v)}
function isBln(v){return 'boolean'===typeof v}
class Listener {
    static add(el, name, listener, useCapture=false) {// element, name, listener, options/useCapture
        if (!isEl(el)) {throw new TypeError('対象要素（HTMLElement）が必要です。')}
        if (!isStr(name)) {throw new TypeError('第一引数はイベント名（String）であるべきです。')}
        if (!isListener(listener)) {throw new TypeError('第二引数はイベントハンドラ（Function/AsyncFunction）であるべきです。')}
        if (!isBln(useCapture)) {throw new TypeError('第三引数はuseCapture（Boolean）であるべきです。')}
        if (!('_listeners' in el)) {
            el._listeners = []
            el.removeAllEventListener = function() {
                this._listeners.map(l=>Listener.remove(this, ...l));
            }
        }
        const i = this.#getIdx(el, name, useCapture);
        if (-1===i) {
            el._listeners.push({name:name, useCapture:useCapture, listeners:[listener]});
            el.addEventListener(name, listener, useCapture);
            console.log('ADD:', el._listeners)
        } else {
            if (el._listeners[i].listeners.includes(listener)) {return} // 重複登録防止
            el._listeners[i].listeners.push(listener);
            el.addEventListener(name, listener, useCapture);
        }
    }
    static remove(el, name, listener, useCapture, notSplice=false) {
        if (!('_listeners' in el)) {return}
        const i = this.#getIdx(el, name, useCapture);
        if (-1<i) {
            const I = el._listeners[i].listeners.findIndex(l=>l===listener);
            if (-1<I) {
                el._listeners[i].listeners.splice(I, 1);
                el.removeEventListener(name, listener, useCapture);
                if (0===el._listeners[i].listeners.length) {el._listeners.splice(i, 1);}
            }
        }
    }
    static removeAll(el) {
        if (!('_listeners' in el)) {return}
        for(let i=0; i<el._listeners.length; i++) {
            const {name, listeners, useCapture} = el._listeners[i];
            for (let I=0; I<listeners.length; I++) {
                this.remove(el, name, listeners[I], useCapture, true);
            }
        }
        el._listeners.length = 0;
    }
    static removeName(el, N) {
        for(let i=0; i<el._listeners.length; i++) {
            //const {N, L, U} = el._listeners[i];
            const {name, listeners, useCapture} = el._listeners[i];
            if (N===name) {
                for (let I=0; I<listeners.length; I++) {
                    this.remove(el, name, listeners[I], useCapture, true);
                }
                if (0===listeners.length) {el._listeners.splice(i, 1)}
            }
        }
    }
    static removeNameUseCapture(el, N, U) {
        for(let i=0; i<el._listeners.length; i++) {
                console.log(el._listeners[i])
            const {name, listeners, useCapture} = el._listeners[i];
//                console.log(N, U, name, useCapture)
            if (N===name && U===useCapture) {
                console.log(N, U)
                for (let I=0; I<listeners.length; I++) {
                    this.remove(el, name, listeners[I], useCapture, true);
                }
                if (0===listeners.length) {el._listeners.splice(i, 1)}
            }
        }
    }
    static removeNameListener(el, name, listener) {
        for(let i=0; i<el._listeners.length; i++) {
            const {name, listeners, useCapture} = el._listeners[i];
            //const {N, L, U} = el._listeners[i];
            if (N===name) {
                for (let I=0; I<listeners.length; I++) {
                    if (listener===L[I]) {
                    this.remove(el, name, listeners[I], useCapture, true);
                    }
                }
                if (0===L.length) {el._listeners.splice(i, 1)}
            }
        }
    }
    static #getIdx(el, name, useCapture) {return el._listeners.findIndex(l=>name===l.name && useCapture===l.useCapture)}
}
HTMLElement.prototype.listen = function(name, listener, useCapture=false) {
    Listener.add(this, name, listener, useCapture);
}
HTMLElement.prototype.unlisten = function(name, listener, useCapture) {//自身をunlistenする
    if (name && listener && useCapture) {Listener.remove(this, name, listener, useCapture);}
    else if (name && listener) {Listener.removeNameListener(this, name, listener)}
    else if (name && 'boolean'===typeof useCapture) {Listener.removeNameUseCapture(this, name, useCapture)}
    else if (name) {Listener.removeName(this, name)}
    else {Listener.removeAll(this)}
}
// 要素を削除するときunlistenする
HTMLElement.prototype._removeChild = HTMLElement.prototype.removeChild;
HTMLElement.prototype.removeChild = function(child) {//指定した子要素nodeを削除する
    if ([...this.children].some(c=>c===child) && !child.firstChild) {//childが子要素であり、かつ孫がない
        child.unlisten();         // 孫は削除されない！
        this._removeChild(child); // 孫は削除されない！
    }
}
//自身と子孫を削除する
HTMLElement.prototype._remove = HTMLElement.prototype.remove;
HTMLElement.prototype.remove = function() {//自身と子孫をremoveする
    while (this.firstChild) {this.firstChild.remove(this.firstChild)}
    console.log(this, this.parentNode)
    if (this.parentNode) {this.parentNode.removeChild(this)}
    else {this.unlisten(); this._remove();}
}
})();
