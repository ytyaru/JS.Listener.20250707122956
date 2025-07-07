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
            /*
        console.log(res)
        p.unlisten();
        console.log(res, 0===p._listeners.length)
        console.log(p._listeners[0].listeners)
        console.log('_listeners' in p,
            Array.isArray(p._listeners) , 1===p._listeners.length,
            Type.isObj(p._listeners[0]),
            name===p._listeners[0].name , listener===p._listeners[0].listeners[0] , useCapture===p._listeners[0].useCapture,
            'listen unlisten'.split(' ').every(n=>n in p))
        return '_listeners' in p
            && Array.isArray(p._listener) && 1===p._listener.length
            && Type.isObj(p._listeners[0])
            && name===p._listeners[0].name && listener===p._listeners[0].listener && useCapture===p._listeners[0].useCapture
            && 'listen unlisten'.split(' ').every(n=>n in p);
            */
        console.log(res , 0===p._listeners.length, p._listeners)
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
    // async listener
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

//    a.t(true);
//    a.f(false);
//    a.e(TypeError, `msg`, ()=>{throw new TypeError(`msg`)});
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

