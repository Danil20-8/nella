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

let handlers = {};
let trail = [];
let currentHandler = null;
let currentState = null;
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
        history.back();
    }
    anchorPopState(){}
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
        console.log(i, item, queue.join(", "));
    }
    processing = false;
}
/**
 * @param { { state: any, url: string, handler: { onenter: (state) => void, onpushEnter: (state) => void, onpopEnter: (state) => void, onexit: () => void, onpushExit: () => void, onpopExit: () => void } } }
 */
function processPush({ state, url, handler }) {
    if (currentHandler) {
        if (isDefined(currentHandler.onexit))
            currentHandler.onexit();
        else if (isDefined(currentHandler.onpushExit))
            currentHandler.onpushExit();
    }

    let handlerKey = isDefined(handler.__routerKey) && handler.__routerKey.valueOf();
    if (!handlerKey) {
        handler.__routerKey = handlerKey = (++routerKeyIncrement).toString();
    }

    handlers[handlerKey] = currentHandler = handler;

    let stateIndex = 1;
    let trailAnchor = trail.length;

    if (currentState) {
        stateIndex = currentState.index + 1;
        trailAnchor = currentState.index + 1;
    }
    currentState = {
        key: handlerKey,
        index: stateIndex,
        anchor: trailAnchor,
        enterState: cloneState(state)
    };
    history.pushState(
        currentState,
        "router",
        url);

    router.pathname = location.pathname;
    router.search = location.search;
    router.hash = location.hash;

    if (isDefined(handler.onenter))
        handler.onenter(state, currentState.anchor);
    else if (isDefined(handler.onpushEnter))
        handler.onpushEnter(state, currentState.anchor);
}

/**@param {{anchor: number}} */
function processPop({ anchor, location, state }) {
    router.pathname = location.pathname;
    router.search = location.search;
    router.hash = location.hash;

    let direction = ((state && state.index) || 0) - ((currentState && currentState.index) || 0);

    console.log("direction", direction);
    console.log(state, currentState);

    if (currentHandler) {
        if (isDefined((currentHandler.onexit)))
            currentHandler.onexit();
        else if (direction > 0 && isDefined(currentHandler.onpushExit))
            currentHandler.onpushExit();
        else if (direction < 0 && isDefined(currentHandler.onpopExit))
            currentHandler.onpopExit();
    }

    console.log("clean");
    currentHandler = null;
    currentState = null;

    if (state !== null && state.key) {
        currentHandler = handlers[state.key];
        currentState = state;
        console.log("setting");
        if (currentHandler) {
            if (isDefined(currentHandler.onenter))
                currentHandler.onenter(state.enterState);
            else if (direction > 0 && isDefined(currentHandler.onpushEnter)) {
                currentHandler.onpushEnter(state.enterState);
            }
            else if (direction < 0 && isDefined(currentHandler.onpopEnter)) {
                currentHandler.onpopEnter(state.enterState);
            }
        }
    }
}