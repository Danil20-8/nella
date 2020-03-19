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
export function useRouteHandler(routeHandler) {
    handlers[routeHandler.routeKey] = routeHandler;
}
export function dropRouteHandler(routeHandler) {
    delete handlers[routeHandler.routeKey];
}
let foreignState = null;
/**
 * @type {{ handler, enterState }[]}
 */
let trail = [];
let trailHead = -1;

/**
 * @type { ({ type: "pop", anchor: number, location: { pathname: string. search: string, hash: string}, state: { key: number, index: number, anchor: number, enterState: any } | { type: "push", state: any, url: string, handler: { onenter: (state) => void, onpushEnter: (state) => void, onpopEnter: (state) => void, onexit: () => void, onpushExit: () => void, onpopExit: () => void } })[] }
 */
let queue = [];

class NRouter {
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
        if (anchor !== undefined && anchor.valueOf() !== undefined)
            history.go(anchor.valueOf() - trailHead - 1);
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
 * @param { { state: any, url: string, handler: { routeKey: string, onenter: (state) => void, onpushEnter: (state) => void, onpopEnter: (state) => void, onexit: () => void, onpushExit: () => void, onpopExit: () => void } } }
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
    } else if (foreignState !== null) {
        let handler = handlers[foreignState.routeKey];
        pushExit(handler);
        foreignState = null;
    }

    let enterState = cloneState(state);
    trail[++trailHead] = { handler, enterState };
    trail.length = trailHead + 1;

    history.pushState(
        {
            sessionId,
            anchor: trailHead,
            enterState,
            routeKey: handler.routeKey && handler.routeKey.valueOf()
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

    let foreign = state && state.sessionId !== sessionId;

    let anchor = !foreign && state && isDefined(state.anchor) ? state.anchor : -1;
    let direction = anchor - trailHead;

    if (foreignState !== null) {
        let handler = handlers[foreignState.routeKey];
        if (foreign) {
            let direction = foreignState.sessionId === state.sessionId ?
                state.anchor - foreignState.anchor :
                state.sessionId - foreignState.sessionId;

            if (direction > 0) {
                pushExit(handler, foreignState.enterState);
            }
            else if (direction < 0) {
                popExit(handler);
            }
            foreignState = null;

            let newHandler = handlers[state.routeKey];
            if (newHandler) {
                if (direction > 0) {
                    pushEnter(newHandler, state.enterState);
                }
                else if (direction < 0) {
                    popEnter(newHandler, state.enterState);
                }
                foreignState = state;
            }
        }
        else {
            pushExit(handler);
            foreignState = null;
        }
    }

    if (direction > 0) {
        for (let i = trailHead; i < anchor; ++i) {
            if (i > -1) {
                let { handler } = trail[i];
                pushExit(handler);
            }
            if (i < trail.length - 1) {
                let { handler, enterState } = trail[i + 1];
                pushEnter(handler, enterState, i + 1);
            }
        }
    }
    else if (direction < 0) {
        for (let i = trailHead; i > anchor; --i) {
            {
                let { handler } = trail[i];
                popExit(handler);
            }
            if (i > 0) {
                let { handler, enterState } = trail[i - 1];
                popEnter(handler, enterState, i - 1);
            }
        }
    }

    trailHead = anchor;

    if (foreign && foreignState === null && state.routeKey) {
        let handler = handlers[state.routeKey];
        if (handler) {
            foreignState = state;
            popEnter(handler, state.enterState, -1);
        }
    }
}

function pushEnter(handler, enterState, anchor) {
    if (isDefined(handler.onenter))
        handler.onenter(enterState, anchor);
    else if (isDefined(handler.onpushEnter))
        handler.onpushEnter(enterState, anchor);
}
function popEnter(handler, enterState, anchor) {
    if (isDefined(handler.onenter))
        handler.onenter(enterState, anchor);
    else if (isDefined(handler.onpopEnter))
        handler.onpopEnter(enterState, anchor);
}
function pushExit(handler) {
    if (isDefined(handler.onexit))
        handler.onexit();
    else if (isDefined(handler.onpushExit))
        handler.onpushExit();
}
function popExit(handler) {
    if (isDefined(handler.onexit))
        handler.onexit();
    else if (isDefined(handler.onpopExit))
        handler.onpopExit();
}

export class NRoute {
    constructor(routeKey) {
        this.anchor = null;
        this.routeKey = routeKey;

        if (this.routeKey)
            useRouteHandler(this);
    }

    onpushEnter(state, anchor) {
        this.handleEnter(state);
        this.handlePopEnter(state);

        this.anchor = anchor;
    }
    onpopEnter(state, anchor) {
        this.handleEnter(state);
        this.handlePopEnter(state);

        this.anchor = anchor;
    }

    onpushExit() {
        this.handleExit();
        this.handlePushExit();
    }
    onpopExit() {
        this.handleExit();
        this.handlePopExit();
    }

    pushState(state, url) {
        router.pushState(state, url, this);
    }
    popState() {
        router.popState(this.anchor);
    }

    handleEnter(state) { }
    handlePushEnter(state) { }
    handlePopEnter(state) { }
    handleExit() { }
    handlePushExit() { }
    handlePopExit() { }
}