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
});

let processing = false;
function enqueue(item) {
    queue.push(item);
    if (!processing)
        updateN(
            processQueue()
        );
}
async function processQueue() {
    processing = true;
    for (let i = 1; queue.length > 0; ++i) {
        let item = queue.shift();
        switch (item.type) {
            case "push":
                await processPush(item);
                break;
            case "pop":
                await processPop(item);
                break;
        }
    }
    processing = false;
}
/**
 * @param { { state: any, url: string, handler: { routeKey: string, onenter: (state) => void, onpushEnter: (state) => void, onpopEnter: (state) => void, onexit: () => void, onpushExit: () => void, onpopExit: () => void } } }
 */
async function processPush({ state, url, handler }) {
    if (trailHead > -1) {
        let { handler } = trail[trailHead];

        if (handler) {
            await pushExit(handler);
        }
    } else if (foreignState !== null) {
        let handler = handlers[foreignState.routeKey];
        await pushExit(handler);
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

    await pushEnter(handler, state, trailHead);
}

/**@param {{anchor: number}} */
async function processPop({ location, state }) {
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
                await pushExit(handler, foreignState.enterState);
            }
            else if (direction < 0) {
                await popExit(handler);
            }
            foreignState = null;

            let newHandler = handlers[state.routeKey];
            if (newHandler) {
                if (direction > 0) {
                    await pushEnter(newHandler, state.enterState);
                }
                else if (direction < 0) {
                    await popEnter(newHandler, state.enterState);
                }
                foreignState = state;
            }
        }
        else {
            await pushExit(handler);
            foreignState = null;
        }
    }

    if (direction > 0) {
        for (let i = trailHead; i < anchor; ++i) {
            if (i > -1) {
                let { handler } = trail[i];
                await pushExit(handler);
            }
            if (i < trail.length - 1) {
                let { handler, enterState } = trail[i + 1];
                await pushEnter(handler, enterState, i + 1);
            }
        }
    }
    else if (direction < 0) {
        for (let i = trailHead; i > anchor; --i) {
            {
                let { handler } = trail[i];
                await popExit(handler);
            }
            if (i > 0) {
                let { handler, enterState } = trail[i - 1];
                await popEnter(handler, enterState, i - 1);
            }
        }
    }

    trailHead = anchor;

    if (foreign && foreignState === null && state.routeKey) {
        let handler = handlers[state.routeKey];
        if (handler) {
            foreignState = state;
            await popEnter(handler, state.enterState, -1);
        }
    }
}

async function pushEnter(handler, enterState, anchor) {
    if (isDefined(handler.onenter))
        await handler.onenter(enterState, anchor);
    if (isDefined(handler.onpushEnter))
        await handler.onpushEnter(enterState, anchor);
}
async function popEnter(handler, enterState, anchor) {
    if (isDefined(handler.onenter))
        await handler.onenter(enterState, anchor);
    if (isDefined(handler.onpopEnter))
        await handler.onpopEnter(enterState, anchor);
}
async function pushExit(handler) {
    if (isDefined(handler.onexit))
        await handler.onexit();
    if (isDefined(handler.onpushExit))
        await handler.onpushExit();
}
async function popExit(handler) {
    if (isDefined(handler.onexit))
        await handler.onexit();
    if (isDefined(handler.onpopExit))
        await handler.onpopExit();
}

let routeKeyIncrement = 0;
export class NRoute {
    constructor(routeKey) {
        this.anchor = null;
        this.routeKey = routeKey || (++routeKeyIncrement).toString();

        if (this.routeKey)
            useRouteHandler(this);
    }

    async onreload(state, anchor) {
        if (isDefined(anchor))
            await this.handleEnter(state);
        else
            await this.handleReload();

        this.anchor = anchor;
    }

    async onpushEnter(state, anchor) {
        await this.handleEnter(state);
        await this.handlePopEnter(state);

        this.anchor = anchor;
    }
    async onpopEnter(state, anchor) {
        await this.handleEnter(state);
        await this.handlePopEnter(state);

        this.anchor = anchor;
    }

    async onpushExit() {
        await this.handleExit();
        await this.handlePushExit();
    }
    async onpopExit() {
        await this.handleExit();
        await this.handlePopExit();
    }

    pushState(state, url) {
        router.pushState(state, url, this);
    }
    popState() {
        router.popState(this.anchor);
    }

    match() { return false; };

    async handleEnter(state) { }
    async handlePushEnter(state) { }
    async handlePopEnter(state) { }
    async handleExit() { }
    async handlePushExit() { }
    async handlePopExit() { }
}

export function reloadRoute() {
    if (trailHead > -1) {
        let handler = trail[trailHead];
        return updateN(
            pushEnter(handler.handler, handler.enterState, trailHead)
        );
    }

    for (let k in handlers) {
        let handler = handlers[k];
        if (isDefined(handler.match)) {
            let r = handler.match();
            if (r) {
                trail[trailHead = 0] = { handler, enterState: r };
                return updateN(
                    pushEnter(handler, r, trailHead)
                );
            }
        }
    }

    let state = history.state;

    if (state && state.routeKey) {
        let handler = handlers[state.routeKey];
        if (handler) {
            trail[trailHead = 0] = { handler, enterState: state.enterState };
            return updateN(
                pushEnter(handler, state.enterState, trailHead)
            );
        }
        return;
    }
}