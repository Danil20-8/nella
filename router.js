import { updateUii } from "./uii";

let handlers = {};
let currentHandler = null;

let fallbackHandler = function () { };

window.addEventListener("popstate", function (e) {
    if (currentHandler) {
        if (currentHandler.onexit) {
            currentHandler.onexit();
            currentHandler = null;

            pushState(null, null, {
                onenter: () => {
                    this.history.back();
                }
            });
            return;
        }
    }

    if (e.state !== null && e.state.key) {

        currentHandler = handlers[e.state.key];
        if (currentHandler) {
            if (currentHandler.onenter) {
                currentHandler.onenter(e.state.enterState);
                updateUii();
            }

            return;
        }
    }

    fallbackHandler(e.state);
    updateUii();
});

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

let routerKeyIncrement = 0;
/**
 * 
 * @param {*} state 
 * @param {*} url 
 * @param {{ onenter: (state) => void, onexit: () => void }} handler 
 */
export function pushState(state, url, handler) {
    if (!handler.__routerKey) {
        handler.__routerKey = (++routerKeyIncrement).toString();
    }
    if (currentHandler && currentHandler.onexit)
        currentHandler.onexit();
    handlers[handler.__routerKey] = currentHandler = handler;
    history.pushState({
        key: handler.__routerKey,
        enterState: cloneState(state)
    },
        "router",
        url);
    if (handler.onenter)
        handler.onenter(state);
}
export function popState() {
    history.back();
}

export function useFallbackBackHandler(handler) {
    fallbackHandler = handler;
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