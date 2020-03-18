import { updateN, useStore, isDefined } from "../";

function cloneState(source) {
    if (source === null)
        return source;

    let s = source.valueOf();
    if (Array.isArray(s)) {
        return [...s];
    }
    else if (s instanceof Object) {
        let target = {};
        Object.keys(s).forEach(k => {
            let v = source[k];
            if (!(v.valueOf() instanceof Function))
                target[k] = cloneState(v);
        });
        return target;
    } else {
        return s;
    }
}

export function restore(store, state) {
    if (state === null)
        return;

    Object.keys(state).forEach(k => {
        let v = state[k];

        if (Array.isArray(v)) {
            let t = store[k];
            if (!t.valueOf())
                store[k] = v;
            else
                store[k].splice(0, t.valueOf().length, ...v);
        }
        else if (v instanceof Object) {
            let t = store[k]
            if (!t.valueOf()) {
                store[k] = v;
            } else {
                restore(store[k], v);
            }
        }
        else {
            store[k] = v;
        }
    });
}
let sessionId = Date.now();

let handlers = {};
/**
 * @type {{ handler, enterState }[]}
 */
let trail = [];
let trailHead = -1;

let routerKeyIncrement = 0;

/**
 * @type { ({ type: "pop", anchor: number, location: { pathname: string. search: string, hash: string}, state: { key: number, index: number, anchor: number, enterState: any } | { type: "push", state: any, url: string, handler: { onenter: (state) => void, onpushEnter: (state) => void, onpopEnter: (state) => void, onexit: () => void, onpushExit: () => void, onpopExit: () => void } })[] }
 */
let queue = [];

export class NRouter {
    constructor() {
        this.pathname = location.pathname;
        this.search = location.search;
        this.hash = location.hash;
    }
    /**
     * 
     * @param {*} state 
     * @param {string} url
     * @param {{ onenter: (state) => void, onpushEnter: (state) => void, onpopEnter: (state) => void, onexit: () => void, onpushExit: () => void, onpopExit: () => void }} handler 
     */
    pushState(state, url, handler) {
        enqueue({
            type: "push",
            state,
            url,
            handler
        });
        return;
    }
    popState(anchor) {
        if (anchor !== undefined)
            history.go(anchor - trailHead - 1);
        else
            history.back();
    }

}

/**@type {NRouter}*/
export const router = useStore(new NRouter());

window.addEventListener("popstate", function (e) {
    enqueue({
        type: "pop",
        location: {
            pathname: location.pathname,
            search: location.search,
            hash: location.hash
        },
        state: e.state
    });
    updateN();
    return;
});

let processing = false;
function enqueue(item) {
    queue.push(item);
    if (!processing)
        processQueue();
}
function processQueue() {
    processing = true;
    for (let i = 1; queue.length > 0; ++i) {
        let item = queue.shift();
        switch (item.type) {
            case "push":
                processPush(item);
                break;
            case "pop":
                processPop(item);
                break;
        }
    }
    processing = false;
}
/**
 * @param { { state: any, url: string, handler: { onenter: (state) => void, onpushEnter: (state) => void, onpopEnter: (state) => void, onexit: () => void, onpushExit: () => void, onpopExit: () => void } } }
 */
function processPush({ state, url, handler }) {
    if (trailHead > -1) {
        let { handler } = trail[trailHead];

        if (handler) {
            if (isDefined(handler.onexit))
                handler.onexit();
            else if (isDefined(handler.onpushExit))
                handler.onpushExit();
        }
    }

    let handlerKey = isDefined(handler.__routerKey) && handler.__routerKey.valueOf();
    if (!handlerKey) {
        handler.__routerKey = handlerKey = (++routerKeyIncrement).toString();
    }

    handlers[handlerKey] = handler;

    let enterState = cloneState(state);
    trail[++trailHead] = { handler, enterState };
    trail.length = trailHead + 1;

    history.pushState(
        {
            sessionId,
            key: handlerKey,
            anchor: trailHead,
            enterState
        },
        "router",
        url);

    router.pathname = location.pathname;
    router.search = location.search;
    router.hash = location.hash;

    if (isDefined(handler.onenter))
        handler.onenter(state, trailHead);
    else if (isDefined(handler.onpushEnter))
        handler.onpushEnter(state, trailHead);
}

/**@param {{anchor: number}} */
function processPop({ location, state }) {
    router.pathname = location.pathname;
    router.search = location.search;
    router.hash = location.hash;

    let anchor = state.sessionId === sessionId && isDefined(state.anchor) ? state.anchor : -1;
    let direction = anchor - trailHead;

    if (direction > 0) {
        for (let i = trailHead; i < anchor; ++i) {
            if (i > -1) {
                let { handler } = trail[i];
                if (isDefined(handler.onexit))
                    handler.onexit();
                else if (isDefined(handler.onpushExit))
                    handler.onpushExit();
            }
            if (i < trail.length - 1) {
                let { handler, enterState } = trail[i + 1];
                if (isDefined(handler.onenter))
                    handler.onenter(enterState, i + 1);
                else if (isDefined(handler.onpushEnter))
                    handler.onpushEnter(enterState, i + 1);
            }
        }
    }
    else if (direction < 0) {
        for (let i = trailHead; i > anchor; --i) {
            {
                let { handler } = trail[i];
                if (isDefined(handler.onexit))
                    handler.onexit();
                else if (isDefined(handler.onpopExit))
                    handler.onpopExit();
            }
            if (i > 0) {
                let { handler, enterState } = trail[i - 1];
                if (isDefined(handler.onenter))
                    handler.onenter(enterState, i - 1);
                else if (isDefined(handler.onpopEnter))
                    handler.onpopEnter(enterState, i - 1);
            }
        }
    }
    trailHead = anchor;
}