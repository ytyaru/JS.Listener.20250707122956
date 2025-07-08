(function(){//HTML要素に_listeners/litten/unlistenを追加する。
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
        } else {
            if (el._listeners[i].listeners.includes(listener)) {return} // 重複登録防止
            el._listeners[i].listeners.push(listener);
            el.addEventListener(name, listener, useCapture);
        }
    }
    // 条件に一致したリスナーを削除する
    static DELETE(el, name, handler, useCapture) {// elは必須。name/handler/useCaptureは任意(null/undefinedなら全件対象)
        if (!('_listeners' in el)){return}
        const targets = el._listeners.filter(l=>(name ? name===l.name : true) && ('boolean'===typeof useCapture ? useCapture===l.useCapture : true) && (handler ? l.listeners.includes(handler) : true));
        // ハンドラ[一|全]件削除
        const remove = handler
            ? ((t)=>{
                console.log(t)
                const i = t.listeners.indexOf(handler);
                el.removeEventListener(t.name, t.listeners[i], t.useCapture);
                t.listeners.splice(i, 1);
            })
            : ((t)=>{
                t.listeners.map(l=>el.removeEventListener(t.name, l, t.useCapture));
                t.listeners.length = 0;
            });
        targets.map(t=>remove(t));
        // リスナ削除(ハンドラ0件のリスナ削除)
        el._listeners = el._listeners.filter(l=>0!==l.listeners.length);
    }
    static remove(el, name, listener, useCapture, notSplice=false) {
        if (!('_listeners' in el)) {return}
        const i = this.#getIdx(el, name, useCapture);
        if (-1<i) {
            const I = el._listeners[i].listeners.findIndex(l=>l===listener);
            if (-1<I) {
                el._listeners[i].listeners.splice(I, 1);
                el.removeEventListener(name, listener, useCapture);
                if (0===el._listeners[i].listeners.length) {return notSplice ? [i,I] : el._listeners.splice(i, 1);}
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
            listeners.length = 0;
        }
        el._listeners.length = 0;
    }
    static removeName(el, N) {
        for(let i=0; i<el._listeners.length; i++) {
            const {name, listeners, useCapture} = el._listeners[i];
            if (N===name) {
                for (let I=0; I<listeners.length; I++) {
                    el.removeEventListener(name, listeners[I], useCapture);
                }
                listeners.length = 0;
            }
        }
        el._listeners = el._listeners.filter(l=>0!==l.listeners.length);
    }
    static removeNameUseCapture(el, N, U) {
        for(let i=0; i<el._listeners.length; i++) {
            const {name, listeners, useCapture} = el._listeners[i];
            if (N===name && U===useCapture) {
                const Hs = [...listeners];
                for (let I=0; I<listeners.length; I++) {
                    el.removeEventListener(name, listeners[I], useCapture);
                    Hs.splice(I, 1);
                }
                el._listeners[i].listeners = Hs;
            }
        }
        el._listeners = el._listeners.filter(l=>0!==l.listeners.length);
    }
    static removeNameListener(el, N, L) {
        for(let i=0; i<el._listeners.length; i++) {
            const {name, listeners, useCapture} = el._listeners[i];
            if (N===name) {
                const Hs = [...listeners];
                for (let I=0; I<listeners.length; I++) {
                    if (L===listeners[I]) {
                        el.removeEventListener(name, listeners[I], useCapture);
                        Hs.splice(I, 1);
                    }
                }
                el._listeners[i].listeners = Hs;
            }
        }
        el._listeners = el._listeners.filter(l=>0!==l.listeners.length);
    }
    static #getIdx(el, name, useCapture) {return el._listeners.findIndex(l=>name===l.name && useCapture===l.useCapture)}
}
HTMLElement.prototype.listen = function(name, listener, useCapture=false) {
    Listener.add(this, name, listener, useCapture);
}
HTMLElement.prototype.unlisten = function(name, listener, useCapture) {//自身をunlistenする
    Listener.DELETE(this, name, listener, useCapture);
    /*
    if (name && listener && 'boolean'===typeof useCapture) {Listener.remove(this, name, listener, useCapture);}
    else if (name && listener) {Listener.removeNameListener(this, name, listener)}
    else if (name && 'boolean'===typeof useCapture) {Listener.removeNameUseCapture(this, name, useCapture)}
    else if (name) {Listener.removeName(this, name)}
    else {Listener.removeAll(this)}
    */
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
    if (this.parentNode) {this.parentNode.removeChild(this)}
    else {this.unlisten(); this._remove();}
}
})();
