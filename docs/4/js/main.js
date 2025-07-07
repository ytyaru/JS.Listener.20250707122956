window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded!!');
    const author = 'ytyaru';
    van.add(document.querySelector('main'), 
        van.tags.h1(van.tags.a({href:`https://github.com/${author}/JS.Listener.20250707122956/`}, 'Listener')),
        van.tags.p('addEventListener/removeEventListener管理'),
//        van.tags.p('addEventListener/removeEventListenerManagement'),
    );
    van.add(document.querySelector('footer'),  new Footer('ytyaru', '../').make());

    const a = new Assertion();
    a.t(()=>{
        const p = document.createElement('p');
        return !('_listeners' in p) && 'listen unlisten'.split(' ').every(n=>n in p);
    });
    // listener: function
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const listener = (e)=>console.log(e);
        const useCapture = false;
        p.listen(name, listener);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && listener===p._listeners[0].listeners[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.unlisten();
        return res && 0===p._listeners.length;
    })
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const listener = (e)=>console.log(e);
        const useCapture = false;
        p.listen(name, listener);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && listener===p._listeners[0].listeners[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.remove(); // 標準APIにあるremove()でもunslisten()が呼び出される。
        console.log(p, res, 0===p._listeners.length)
        return res && 0===p._listeners.length;
    })
    // listener: async function
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const listener = async(e)=>console.log(e); // Async
        const useCapture = false;
        p.listen(name, listener);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && listener===p._listeners[0].listeners[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.unlisten();
        console.log(res, 0===p._listeners.length)
        return res && 0===p._listeners.length;
    })
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const listener = async(e)=>console.log(e); // Async
        const useCapture = false;
        p.listen(name, listener);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && listener===p._listeners[0].listeners[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.remove(); // 標準APIにあるremove()でもunslisten()が呼び出される。
        console.log(p, res, 0===p._listeners.length)
        return res && 0===p._listeners.length;
    })

    // listener: function, useCapture: false & true
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const listenerF = (e)=>console.log(e);
        const listenerT = (e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(name, listenerF, useCaptureF);
        p.listen(name, listenerT, useCaptureT);
        console.log(p._listeners.length);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 2===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture
            && name===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture
            && Array.isArray(p._listeners[0].listeners) && 1===p._listeners[0].listeners.length
            && Array.isArray(p._listeners[1].listeners) && 1===p._listeners[1].listeners.length
            && listenerF===p._listeners[0].listeners[0]
            && listenerT===p._listeners[1].listeners[0]
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.unlisten();
        console.log(p._listeners.length);
        return res && 0===p._listeners.length;
    })
    // listener: async function, useCapture: false & true
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const listenerF = async(e)=>console.log(e);
        const listenerT = async(e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(name, listenerF, useCaptureF);
        p.listen(name, listenerT, useCaptureT);
        console.log(p._listeners.length);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 2===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture
            && name===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture
            && Array.isArray(p._listeners[0].listeners) && 1===p._listeners[0].listeners.length
            && Array.isArray(p._listeners[1].listeners) && 1===p._listeners[1].listeners.length
            && listenerF===p._listeners[0].listeners[0]
            && listenerT===p._listeners[1].listeners[0]
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.unlisten();
        console.log(p._listeners.length);
        return res && 0===p._listeners.length;
    })

    // name:click/input, listener: function, useCapture: false & true
    a.t(()=>{
        const p = document.createElement('p');
        const nameC = 'click';
        const nameI = 'input';
        const listenerF = (e)=>console.log(e);
        const listenerA = async(e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(nameC, listenerF, useCaptureF);
        p.listen(nameC, listenerF, useCaptureT);
        p.listen(nameC, listenerA, useCaptureF);
        p.listen(nameC, listenerA, useCaptureT);
        p.listen(nameI, listenerF, useCaptureF);
        p.listen(nameI, listenerF, useCaptureT);
        p.listen(nameI, listenerA, useCaptureF);
        p.listen(nameI, listenerA, useCaptureT);
        console.log(p._listeners.length);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 4===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && nameC===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture && 2===p._listeners[0].listeners.length
            && nameC===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture && 2===p._listeners[1].listeners.length
            && nameI===p._listeners[2].name && useCaptureF===p._listeners[2].useCapture && 2===p._listeners[2].listeners.length
            && nameI===p._listeners[3].name && useCaptureT===p._listeners[3].useCapture && 2===p._listeners[3].listeners.length
            && listenerF===p._listeners[0].listeners[0]
            && listenerA===p._listeners[0].listeners[1]
            && listenerF===p._listeners[1].listeners[0]
            && listenerA===p._listeners[1].listeners[1]
            && listenerF===p._listeners[2].listeners[0]
            && listenerA===p._listeners[2].listeners[1]
            && listenerF===p._listeners[3].listeners[0]
            && listenerA===p._listeners[3].listeners[1];
        p.unlisten();
        console.log(p._listeners.length);
        return res && 0===p._listeners.length;
    })

    // el:p/a, name:click/input, listener: function, useCapture: false & true
    a.t(()=>{
        const p = document.createElement('p');
        const nameC = 'click';
        const nameI = 'input';
        const listenerF = (e)=>console.log(e);
        const listenerA = async(e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(nameC, listenerF, useCaptureF);
        p.listen(nameC, listenerF, useCaptureT);
        p.listen(nameC, listenerA, useCaptureF);
        p.listen(nameC, listenerA, useCaptureT);
        p.listen(nameI, listenerF, useCaptureF);
        p.listen(nameI, listenerF, useCaptureT);
        p.listen(nameI, listenerA, useCaptureF);
        p.listen(nameI, listenerA, useCaptureT);
        const a = document.createElement('a');
        a.listen(nameC, listenerF, useCaptureF);
        a.listen(nameC, listenerF, useCaptureT);
        a.listen(nameC, listenerA, useCaptureF);
        a.listen(nameC, listenerA, useCaptureT);
        a.listen(nameI, listenerF, useCaptureF);
        a.listen(nameI, listenerF, useCaptureT);
        a.listen(nameI, listenerA, useCaptureF);
        a.listen(nameI, listenerA, useCaptureT);
        console.log(p._listeners.length);
        const resP = '_listeners' in p
            && Array.isArray(p._listeners) && 4===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in p._listeners[0])
            && nameC===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture && 2===p._listeners[0].listeners.length
            && nameC===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture && 2===p._listeners[1].listeners.length
            && nameI===p._listeners[2].name && useCaptureF===p._listeners[2].useCapture && 2===p._listeners[2].listeners.length
            && nameI===p._listeners[3].name && useCaptureT===p._listeners[3].useCapture && 2===p._listeners[3].listeners.length
            && listenerF===p._listeners[0].listeners[0]
            && listenerA===p._listeners[0].listeners[1]
            && listenerF===p._listeners[1].listeners[0]
            && listenerA===p._listeners[1].listeners[1]
            && listenerF===p._listeners[2].listeners[0]
            && listenerA===p._listeners[2].listeners[1]
            && listenerF===p._listeners[3].listeners[0]
            && listenerA===p._listeners[3].listeners[1];
        const resA = '_listeners' in a
            && Array.isArray(a._listeners) && 4===a._listeners.length
            && Type.isObj(a._listeners[0])
            && 'name listeners useCapture'.split(' ').every(n=>n in a._listeners[0])
            && nameC===a._listeners[0].name && useCaptureF===a._listeners[0].useCapture && 2===a._listeners[0].listeners.length
            && nameC===a._listeners[1].name && useCaptureT===a._listeners[1].useCapture && 2===a._listeners[1].listeners.length
            && nameI===a._listeners[2].name && useCaptureF===a._listeners[2].useCapture && 2===a._listeners[2].listeners.length
            && nameI===a._listeners[3].name && useCaptureT===a._listeners[3].useCapture && 2===a._listeners[3].listeners.length
            && listenerF===a._listeners[0].listeners[0]
            && listenerA===a._listeners[0].listeners[1]
            && listenerF===a._listeners[1].listeners[0]
            && listenerA===a._listeners[1].listeners[1]
            && listenerF===a._listeners[2].listeners[0]
            && listenerA===a._listeners[2].listeners[1]
            && listenerF===a._listeners[3].listeners[0]
            && listenerA===a._listeners[3].listeners[1];
        p.unlisten();
        const res2 = 0===p._listeners.length && 4===a._listeners.length
        a.unlisten();
        return resP && resA && res2 && 0===p._listeners.length && 0===a._listeners.length;
    })
    // 階層が深い子孫要素も削除されること。
    a.t(()=>{
        const p = document.createElement('p');
        const a = document.createElement('a');
        const b = document.createElement('b');
        p.listen('click', (e)=>{});
        a.listen('click', (e)=>{});
        b.listen('click', (e)=>{});
        a.append(b);
        p.append(a);
        p.remove();
        console.log(0===p._listeners.length , 0===a._listeners.length , 0===b._listeners.length)
        return 0===p._listeners.length && 0===a._listeners.length && 0===b._listeners.length
    });
    a.t(()=>{
        const p = document.createElement('p');
        const a = document.createElement('a');
        const b = document.createElement('b');
        const i = document.createElement('i');
        p.listen('click', (e)=>{});
        a.listen('click', (e)=>{});
        b.listen('click', (e)=>{});
        i.listen('click', (e)=>{});
        a.append(b, i);
        p.append(a);
        p.remove();
        console.log(0===p._listeners.length , 0===a._listeners.length , 0===b._listeners.length)
        return 0===p._listeners.length && 0===a._listeners.length && 0===b._listeners.length && 0===i._listeners.length;
    });

    // 複数のうち単体のみ削除
    a.t(()=>{
        const p = document.createElement('p');
        p.listen('click', (e)=>{});
        p.listen('input', (e)=>{});
        p.unlisten('input');
        console.log(p._listeners, 1===p._listeners.length, 'click'===p._listeners[0].name)
        return 1===p._listeners.length && 'click'===p._listeners[0].name;
    });
    // unlisten(name)
    a.t(()=>{
        const p = document.createElement('p');
        p.listen('click', (e)=>{});
        p.listen('input', (e)=>{}, false);
        p.listen('input', (e)=>{}, true);
        p.unlisten('input'); // useCapture=false、trueの両方削除
        console.log(p._listeners, 1===p._listeners.length, 'click'===p._listeners[0].name)
        return 1===p._listeners.length && 'click'===p._listeners[0].name;
    });
    // unlisten(name, useCapture)
    a.t(()=>{
        const p = document.createElement('p');
        p.listen('click', (e)=>{});
        p.listen('input', (e)=>{}, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length);
        p.unlisten('input', null, false); // useCapture=falseだけ削除し、trueを残す
        console.log(p._listeners.length);
        console.log(p._listeners);
        return 2===p._listeners.length && 'click'===p._listeners[0].name
            && 'input'===p._listeners[0].name && true===p._listeners[0].useCapture;
    });





    a.e(TypeError, '第一引数はイベント名（String）であるべきです。', ()=>{
        const p = document.createElement('p');
        p.listen();
    });
    a.e(TypeError, '第二引数はイベントハンドラ（Function/AsyncFunction）であるべきです。', ()=>{
        const p = document.createElement('p');
        p.listen('click');
    });
    a.e(TypeError, '第三引数はuseCapture（Boolean）であるべきです。', ()=>{
        const p = document.createElement('p');
        console.log(async(e)=>console.log(''))
        console.log((async(e)=>console.log('')).constructor)
        console.log(((async(e)=>console.log('')) instanceof ((async(e)=>console.log('')).constructor)))
        p.listen('click', async(e)=>console.log(''), null);
    });
    a.fin();
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

