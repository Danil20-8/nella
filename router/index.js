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
/**@type {{ routeKey: string, enterState }[]} */
let activeHandlersStack = [];

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
        if (anchor !== undefined && anchor !== null && anchor.valueOf() !== undefined && anchor.valueOf() !== null)
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
            routeKey: handler.routeKey && handler.routeKey.valueOf(),
            activeHandlers: activeHandlersStack
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
            trailHead = i + 1;
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
            trailHead = i - 1;
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

function pushActiveHandler(routeKey, enterState) {
    let index = activeHandlersStack.findIndex(h => h.routeKey === routeKey);
    if (index > -1) {
        activeHandlersStack.splice(index, 1);
    }
    activeHandlersStack.push({ routeKey, enterState });
}
function popActiveHandler(routeKey) {
    let index = activeHandlersStack.findIndex(h => h.routeKey === routeKey);
    if (index > -1) {
        activeHandlersStack.splice(index, 1);
    }
}

async function pushEnter(handler, enterState, anchor) {
    let hasEnter = false;
    let entered = false;

    if (hasEnter |= isDefined(handler.onenter))
        entered |= await handler.onenter(enterState, anchor);
    if (hasEnter |= isDefined(handler.onpushEnter))
        entered |= await handler.onpushEnter(enterState, anchor);

    if (hasEnter && entered && handler.routeKey) {
        pushActiveHandler(handler.routeKey, enterState);
    }

}
async function popEnter(handler, enterState, anchor) {
    let hasEnter = false;
    let entered = false;

    if (hasEnter |= isDefined(handler.onenter))
        entered |= await handler.onenter(enterState, anchor);
    if (hasEnter |= isDefined(handler.onpopEnter))
        entered |= await handler.onpopEnter(enterState, anchor);

    if (hasEnter && entered && handler.routeKey) {
        pushActiveHandler(handler.routeKey, enterState);
    }
}
async function pushExit(handler) {
    let hasExit = false;
    let exited = false;

    if (hasExit |= isDefined(handler.onexit))
        exited |= await handler.onexit();
    if (hasExit |= isDefined(handler.onpushExit))
        exited |= await handler.onpushExit();

    if (hasExit && exited && handler.routeKey) {
        popActiveHandler(handler.routeKey);
    }
}
async function popExit(handler) {
    let hasExit = false;
    let exited = false;

    if (hasExit |= isDefined(handler.onexit))
        exited |= await handler.onexit();
    if (hasExit |= isDefined(handler.onpopExit))
        exited |= await handler.onpopExit();

    if (hasExit && exited && handler.routeKey) {
        popActiveHandler(handler.routeKey);
    }
}

let routeKeyIncrement = 0;
export class NRoute {
    constructor(routeKey) {
        this.anchor = null;
        this.routeKey = routeKey || (++routeKeyIncrement).toString();

        this.state = useStore({
            within: false
        });

        if (this.routeKey)
            useRouteHandler(this);
    }
    get within() { return this.state.within; }
    set within(value) { this.state.within = value; }

    async onpushEnter(state, anchor) {
        let r = false;
        r |= await this.handleEnter(state) !== false;
        r |= await this.handlePushEnter(state) !== false;

        this.anchor = anchor;

        return this.within |= r;
    }
    async onpopEnter(state, anchor) {
        let r = false;
        r |= await this.handleEnter(state) !== false;
        r |= await this.handlePopEnter(state) !== false;

        this.anchor = anchor;

        return this.within |= (r || r === undefined);
    }

    async onpushExit() {
        let r = false;
        r |= await this.handleExit() !== false;
        r |= await this.handlePushExit() !== false;

        return !(this.within &= !r);
    }
    async onpopExit() {
        let r = false;
        r |= await this.handleExit() !== false;
        r |= await this.handlePopExit() !== false;

        return !(this.within &= !r);
    }

    pushState(state, url) {
        router.pushState(state, url, this);
    }
    popState() {
        router.popState(this.anchor);
    }

    match() { return false; };

    async handleEnter(state) { return false; }
    async handlePushEnter(state) { return false; }
    async handlePopEnter(state) { return false }
    async handleExit() { return false; }
    async handlePushExit() { return false }
    async handlePopExit() { return false; }
}

export async function reloadRoute() {
    if (trailHead > -1) {
        let handler = trail[trailHead];
        await updateN(
            pushEnter(handler.handler, handler.enterState, trailHead)
        );

        return;
    }

    let state = history.state;
    if (state) {
        for (let activeHandler of state.activeHandlers) {
            let { routeKey, enterState } = activeHandler;
            let handler = handlers[routeKey];
            if (handler) {
                pushActiveHandler(handler.routeKey, enterState);
                trail[++trailHead] = { handler, enterState };
                await updateN(
                    pushEnter(handler, enterState, trailHead)
                );
            }
        }
        if (state.routeKey) {
            let handler = handlers[state.routeKey];
            if (handler) {
                trail[++trailHead] = { handler, enterState: state.enterState };
                await updateN(
                    pushEnter(handler, state.enterState, trailHead)
                );
            }
        }
        return;
    }

    for (let k in handlers) {
        let handler = handlers[k];
        if (isDefined(handler.match)) {
            let r = handler.match();
            if (r) {
                trail[trailHead = 0] = { handler, enterState: r };
                await updateN(
                    pushEnter(handler, r, trailHead)
                );

                return;
            }
        }
    }
}