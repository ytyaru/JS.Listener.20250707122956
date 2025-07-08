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
        const handler = (e)=>console.log(e);
        const useCapture = false;
        p.listen(name, handler);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && handler===p._listeners[0].handlers[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.unlisten();
        return res && 0===p._listeners.length;
    })
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const handler = (e)=>console.log(e);
        const useCapture = false;
        p.listen(name, handler);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && handler===p._listeners[0].handlers[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.remove(); // 標準APIにあるremove()でもunslisten()が呼び出される。
        console.log(p, res, 0===p._listeners.length)
        return res && 0===p._listeners.length;
    })
    // listener: async function
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const handler = async(e)=>console.log(e); // Async
        const useCapture = false;
        p.listen(name, handler);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && handler===p._listeners[0].handlers[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.unlisten();
        console.log(res, 0===p._listeners.length)
        return res && 0===p._listeners.length;
    })
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const handler = async(e)=>console.log(e); // Async
        const useCapture = false;
        p.listen(name, handler);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 1===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && handler===p._listeners[0].handlers[0] && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.remove(); // 標準APIにあるremove()でもunslisten()が呼び出される。
        console.log(p, res, 0===p._listeners.length)
        return res && 0===p._listeners.length;
    })

    // listener: function, useCapture: false & true
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const handlerF = (e)=>console.log(e);
        const listenerT = (e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(name, handlerF, useCaptureF);
        p.listen(name, listenerT, useCaptureT);
        console.log(p._listeners.length);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 2===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture
            && name===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture
            && Array.isArray(p._listeners[0].handlers) && 1===p._listeners[0].handlers.length
            && Array.isArray(p._listeners[1].handlers) && 1===p._listeners[1].handlers.length
            && handlerF===p._listeners[0].handlers[0]
            && listenerT===p._listeners[1].handlers[0]
            && 'listen unlisten'.split(' ').every(n=>n in p);
        p.unlisten();
        console.log(p._listeners.length);
        return res && 0===p._listeners.length;
    })
    // listener: async function, useCapture: false & true
    a.t(()=>{
        const p = document.createElement('p');
        const name = 'click';
        const handlerF = async(e)=>console.log(e);
        const listenerT = async(e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(name, handlerF, useCaptureF);
        p.listen(name, listenerT, useCaptureT);
        console.log(p._listeners.length);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 2===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && name===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture
            && name===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture
            && Array.isArray(p._listeners[0].handlers) && 1===p._listeners[0].handlers.length
            && Array.isArray(p._listeners[1].handlers) && 1===p._listeners[1].handlers.length
            && handlerF===p._listeners[0].handlers[0]
            && listenerT===p._listeners[1].handlers[0]
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
        const handlerF = (e)=>console.log(e);
        const handlerA = async(e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(nameC, handlerF, useCaptureF);
        p.listen(nameC, handlerF, useCaptureT);
        p.listen(nameC, handlerA, useCaptureF);
        p.listen(nameC, handlerA, useCaptureT);
        p.listen(nameI, handlerF, useCaptureF);
        p.listen(nameI, handlerF, useCaptureT);
        p.listen(nameI, handlerA, useCaptureF);
        p.listen(nameI, handlerA, useCaptureT);
        console.log(p._listeners.length);
        const res = '_listeners' in p
            && Array.isArray(p._listeners) && 4===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && nameC===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture && 2===p._listeners[0].handlers.length
            && nameC===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture && 2===p._listeners[1].handlers.length
            && nameI===p._listeners[2].name && useCaptureF===p._listeners[2].useCapture && 2===p._listeners[2].handlers.length
            && nameI===p._listeners[3].name && useCaptureT===p._listeners[3].useCapture && 2===p._listeners[3].handlers.length
            && handlerF===p._listeners[0].handlers[0]
            && handlerA===p._listeners[0].handlers[1]
            && handlerF===p._listeners[1].handlers[0]
            && handlerA===p._listeners[1].handlers[1]
            && handlerF===p._listeners[2].handlers[0]
            && handlerA===p._listeners[2].handlers[1]
            && handlerF===p._listeners[3].handlers[0]
            && handlerA===p._listeners[3].handlers[1];
        p.unlisten();
        console.log(p._listeners.length);
        return res && 0===p._listeners.length;
    })

    // el:p/a, name:click/input, listener: function, useCapture: false & true
    a.t(()=>{
        const p = document.createElement('p');
        const nameC = 'click';
        const nameI = 'input';
        const handlerF = (e)=>console.log(e);
        const handlerA = async(e)=>console.log(e);
        const useCaptureF = false;
        const useCaptureT = true;
        p.listen(nameC, handlerF, useCaptureF);
        p.listen(nameC, handlerF, useCaptureT);
        p.listen(nameC, handlerA, useCaptureF);
        p.listen(nameC, handlerA, useCaptureT);
        p.listen(nameI, handlerF, useCaptureF);
        p.listen(nameI, handlerF, useCaptureT);
        p.listen(nameI, handlerA, useCaptureF);
        p.listen(nameI, handlerA, useCaptureT);
        const a = document.createElement('a');
        a.listen(nameC, handlerF, useCaptureF);
        a.listen(nameC, handlerF, useCaptureT);
        a.listen(nameC, handlerA, useCaptureF);
        a.listen(nameC, handlerA, useCaptureT);
        a.listen(nameI, handlerF, useCaptureF);
        a.listen(nameI, handlerF, useCaptureT);
        a.listen(nameI, handlerA, useCaptureF);
        a.listen(nameI, handlerA, useCaptureT);
        console.log(p._listeners.length);
        const resP = '_listeners' in p
            && Array.isArray(p._listeners) && 4===p._listeners.length
            && Type.isObj(p._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in p._listeners[0])
            && nameC===p._listeners[0].name && useCaptureF===p._listeners[0].useCapture && 2===p._listeners[0].handlers.length
            && nameC===p._listeners[1].name && useCaptureT===p._listeners[1].useCapture && 2===p._listeners[1].handlers.length
            && nameI===p._listeners[2].name && useCaptureF===p._listeners[2].useCapture && 2===p._listeners[2].handlers.length
            && nameI===p._listeners[3].name && useCaptureT===p._listeners[3].useCapture && 2===p._listeners[3].handlers.length
            && handlerF===p._listeners[0].handlers[0]
            && handlerA===p._listeners[0].handlers[1]
            && handlerF===p._listeners[1].handlers[0]
            && handlerA===p._listeners[1].handlers[1]
            && handlerF===p._listeners[2].handlers[0]
            && handlerA===p._listeners[2].handlers[1]
            && handlerF===p._listeners[3].handlers[0]
            && handlerA===p._listeners[3].handlers[1];
        const resA = '_listeners' in a
            && Array.isArray(a._listeners) && 4===a._listeners.length
            && Type.isObj(a._listeners[0])
            && 'name handlers useCapture'.split(' ').every(n=>n in a._listeners[0])
            && nameC===a._listeners[0].name && useCaptureF===a._listeners[0].useCapture && 2===a._listeners[0].handlers.length
            && nameC===a._listeners[1].name && useCaptureT===a._listeners[1].useCapture && 2===a._listeners[1].handlers.length
            && nameI===a._listeners[2].name && useCaptureF===a._listeners[2].useCapture && 2===a._listeners[2].handlers.length
            && nameI===a._listeners[3].name && useCaptureT===a._listeners[3].useCapture && 2===a._listeners[3].handlers.length
            && handlerF===a._listeners[0].handlers[0]
            && handlerA===a._listeners[0].handlers[1]
            && handlerF===a._listeners[1].handlers[0]
            && handlerA===a._listeners[1].handlers[1]
            && handlerF===a._listeners[2].handlers[0]
            && handlerA===a._listeners[2].handlers[1]
            && handlerF===a._listeners[3].handlers[0]
            && handlerA===a._listeners[3].handlers[1];
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
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('input');
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        console.log(p._listeners, 1===p._listeners.length, 'click'===p._listeners[0].name)
        return 1===p._listeners.length && 'click'===p._listeners[0].name;
    });
    // unlisten(name)
    a.t(()=>{
        const p = document.createElement('p');
        p.listen('click', (e)=>{});
        p.listen('input', (e)=>{}, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('input'); // useCapture=false、trueの両方削除
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        console.log(p._listeners, 1===p._listeners.length, 'click'===p._listeners[0].name)
        return 1===p._listeners.length && 'click'===p._listeners[0].name;
    });
    // unlisten(name, useCapture)
    a.t(()=>{
        const p = document.createElement('p');
        p.listen('click', (e)=>{});
        p.listen('input', (e)=>{}, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('input', null, false); // useCapture=falseだけ削除し、trueを残す
        console.log(p._listeners.length);
        console.log(p._listeners);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        return 2===p._listeners.length && 'click'===p._listeners[0].name
            && 'input'===p._listeners[1].name && true===p._listeners[1].useCapture;
    });
    // unlisten(name, listener, useCapture)
    a.t(()=>{
        const p = document.createElement('p');
        const H1 = (e)=>{};
        const H2 = async(e)=>{};
        p.listen('click', H1);
        p.listen('click', H2);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('click', H1, false);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        console.log(p._listeners, 1===p._listeners.length, 'click'===p._listeners[0].name);
        return 1===p._listeners.length &&  1===p._listeners[0].handlers.length && 'click'===p._listeners[0].name && H2===p._listeners[0].handlers[0] && false===p._listeners[0].useCapture;
    });

    // unlisten(name, listener, useCapture) 二つある内の一つだけ消して一つを残す
    a.t(()=>{
        const p = document.createElement('p');
        const hi1 = (e)=>{};
        const hi2 = (e)=>{};
        p.listen('click', (e)=>{});
        p.listen('input', hi1, false);
        p.listen('input', hi2, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('input', hi1, false); // hi2は残す
        console.log(p._listeners.length);
        console.log(p._listeners);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        return 3===p._listeners.length && 'click'===p._listeners[0].name
            && 'input'===p._listeners[1].name && false===p._listeners[1].useCapture
            && 1===p._listeners[1].handlers.length && hi2===p._listeners[1].handlers[0]
            && 'input'===p._listeners[2].name && true===p._listeners[2].useCapture;
    });

    // unlisten(name, listener, useCapture) 二つある内の一つだけ消すのを二回やる
    a.t(()=>{
        const p = document.createElement('p');
        const hi1 = (e)=>{};
        const hi2 = (e)=>{};
        p.listen('click', (e)=>{});
        p.listen('input', hi1, false);
        p.listen('input', hi2, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('input', hi2, false);
        p.unlisten('input', hi1, false);
        console.log(p._listeners.length);
        console.log(p._listeners);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        return 2===p._listeners.length && 'click'===p._listeners[0].name
            && 'input'===p._listeners[1].name && true===p._listeners[1].useCapture;
    });
    // unlisten(name, useCapture) 二つあるが全部消えるか確認。他は全部残るか確認。
    a.t(()=>{
        const p = document.createElement('p');
        const hi1 = (e)=>{};
        const hi2 = (e)=>{};
        p.listen('click', (e)=>{});
        p.listen('input', hi1, false);
        p.listen('input', hi2, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('input', null, false);
        console.log(p._listeners.length);
        console.log(p._listeners);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        return 2===p._listeners.length && 'click'===p._listeners[0].name
            && 'input'===p._listeners[1].name && true===p._listeners[1].useCapture;
    });
    // unlisten(name)
    a.t(()=>{
        const p = document.createElement('p');
        const hi1 = (e)=>{};
        const hi2 = (e)=>{};
        p.listen('click', (e)=>{});
        p.listen('input', hi1, false);
        p.listen('input', hi2, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten('input');
        console.log(p._listeners.length);
        console.log(p._listeners);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        return 1===p._listeners.length && 'click'===p._listeners[0].name;
    });
    // unlisten()
    a.t(()=>{
        const p = document.createElement('p');
        const hi1 = (e)=>{};
        const hi2 = (e)=>{};
        p.listen('click', (e)=>{});
        p.listen('input', hi1, false);
        p.listen('input', hi2, false);
        p.listen('input', (e)=>{}, true);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        p.unlisten();
        console.log(p._listeners.length);
        console.log(p._listeners);
        console.log(p._listeners.length, p._listeners.map(l=>console.log(l.name, l.useCapture, l.handlers.length)));
        return 0===p._listeners.length;
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

