(function(){//HTML要素に_listeners/litten/unlistenを追加する。
console.log(HTMLElement.prototype)
function isEl(v) {return v instanceof HTMLElement}
function isStr(v) {return 'string'===typeof v || v instanceof String}
function isFn(v) {return 'function'===typeof v && !v.toString().match(/^class /)}
function isAFn(v) {return (v instanceof (async function () {}.constructor))}
function isListener(v) {return isFn(v) || isAFn(v)}
function isBln(v){return 'boolean'===typeof v}
class Listener {//同一識別子でaddListenerできるのは一回(一関数)だけ！（標準APIだといくらでも追加できる）
    static add(el, name, listener, useCapture=false) {// element, name, listener, options/useCapture
        if (!isEl(el)) {throw new TypeError('対象要素（HTMLElement）が必要です。')}
        if (!isStr(name)) {throw new TypeError('第一引数はイベント名（String）であるべきです。')}
        if (!isListener(listener)) {throw new TypeError('第二引数はイベントハンドラ（Function/AsyncFunction）であるべきです。')}
        if (!isBln(useCapture)) {throw new TypeError('第三引数はuseCapture（Boolean）であるべきです。')}
        const data = [el, name, listener, useCapture];
        if (!('_listeners' in el)) {
            el._listeners = []
            el.removeAllEventListener = function() {
                this._listeners.map(l=>Listener.remove(this, ...l));
            }
        }
        if (0===el._listeners.filter(l=>name===l.name && listener===l.listener && useCapture===l.useCapture).length) {
            el._listeners.push({name:name, listener:listener, useCapture:useCapture});
            el.addEventListener(name, listener, useCapture);
        }
    }
    static remove(el, name, listener, useCapture) {
        if (!('_listeners' in el)) {return}
        const i = el._listeners.findIndex(l=>name===l.name && listener===l.listener && useCapture===l.useCapture);
        if (-1<i) {
            el._listeners.splice(i, 1);
            el.removeEventListener(name, listener, useCapture);
        }
    }
}
HTMLElement.prototype.listen = function(name, listener, useCapture=false) {
    Listener.add(this, name, listener, useCapture);
}
HTMLElement.prototype.unlisten = function(name, listener, useCapture=false) {
    if (name) {Listener.remove(this, name, listener, useCapture);}
    else {
        console.log(this._listeners.length)
        for(let i=0; i<this._listeners.length; i++) {
            console.log(this._listeners[i]);
            const {name, listener, useCapture} = this._listeners[i];
            Listener.remove(this, name, listener, useCapture);
        }
    }
}
HTMLElement.prototype._remove = HTMLElement.prototype.remove;
HTMLElement.prototype.remove = function(name, listener, useCapture=false) {this.unlisten(); this._remove();}
})();
