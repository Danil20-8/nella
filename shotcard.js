/**
 * 
 * @param {Property} property 
 */
function getProxyFunction(property) {
    if (Array.isArray(property.__sourceContainer.source)) {
        switch (property.__propName) {
            case "pop":
                return function (...args) {
                    let r = property.__sourceContainer.source[property.__propName](...args.map(a => a.valueOf()));
                    property.__sourceProperty.__reloadArray();
                    return r;

                }
            case "push":
                return function (...items) {
                    let source = property.__sourceContainer.source;
                    source.push(...items);
                    let sourceProperty = property.__sourceProperty;
                    for (let i = source.length - items.length; i < source.length; ++i) {
                        let p = sourceProperty.__properties[i];
                        if (!p) {
                            p = new Property(property.__store, source, i, sourceProperty);
                            sourceProperty.__properties[i] = p;
                        } else {
                            p.__setValue(source[i]);
                        }
                    }
                    property.__sourceProperty.__reloadArray();
                    return property.__sourceContainer.source.length;
                }
            case "unshift":
                return function (...items) {
                    property.__sourceProperty.__proxy.splice(0, 0, ...items);

                    return property.__sourceContainer.source.length;
                }
            case "shift":
                return function () {
                    let r = property.__sourceContainer.source[0];
                    property.__sourceProperty.__proxy.splice(0, 1);
                    return r;
                }
            case "splice":
                return function (start, deleteCount, ...items) {
                    property.__sourceContainer.source.splice(start, deleteCount, ...(items.map(i => i.valueOf())));
                    let values = property.__sourceContainer.source;

                    let replaceBound = start + Math.min(deleteCount, items.length);
                    let target = property.__sourceProperty;
                    let targetContainer = target.__sourceContainer.source[target.__propName];
                    for (let i = start; i < replaceBound; ++i) {
                        target.__properties[i].__setValue(values[i]);
                    }
                    if (deleteCount < items.length) {
                        let lowerBound = start + items.length - deleteCount;
                        let upperBound = lowerBound;
                        for (; ; ++upperBound) {
                            let p = target.__properties[upperBound];
                            if (!p) {
                                break;
                            }
                        }
                        for (let i = upperBound - 1; i >= lowerBound; --i) {
                            let p = target.__properties[i];
                            p.__propName = i + items.length - deleteCount;
                            target.__properties[p.__propName] = p;
                        }
                        for (let i = replaceBound; i <= lowerBound; ++i) {
                            target.__properties[i] = new Property(target.__store, target.__sourceContainer.source, i, target);
                        }

                        target.__reloadArray();
                    }
                    else if (deleteCount > items.length) {
                        let lowerBound = start + deleteCount - items.length;
                        let upperBound = lowerBound;
                        for (; ; ++upperBound) {
                            let p = target.__properties[upperBound];
                            if (!p) {
                                break;
                            }
                        }

                        if (lowerBound - deleteCount < targetContainer.length) {
                            let removed = [];
                            for (let i = replaceBound; i < lowerBound; ++i) {
                                removed.push(target.__properties[i]);
                            }
                            for (let i = lowerBound; i < upperBound; ++i) {
                                let p = target.__properties[i];
                                p.__propName = i + items.length - deleteCount;
                                target.__properties[p.__propName] = p;
                            }
                            for (let i = 0; i < removed.length; ++i) {
                                let p = removed[i];
                                p.__propName = upperBound - 1 + start - replaceBound + i;
                                target.__properties[p.__propName] = p;
                            }
                        }
                        target.__reloadArray();
                    }
                }
            case "sort":
                return function ([compareFunction]) {
                    Object.values(property.__sourceProperty)
                        .filter(p => Number.isInteger(p.__propName))
                        .map(p => {
                            return {
                                prop: p,
                                value: p.__proxy.valueOf()
                            }
                        }).sort(function (l, r) {
                            if (compareFunction) {
                                return compareFunction(l.value, r.value);
                            } else {
                                if (l.value > r.value) {
                                    return 1;
                                }
                                if (l.value < r.value) {
                                    return -1;
                                }
                                return 0;
                            }
                        }).forEach((p, index) => {
                            let oldProp = property.__sourceProperty.__properties[index];
                            if (p.prop !== oldProp) {
                                oldProp.__propName = p.prop.__propName;
                                p.prop.__propName = index;
                                p.__sourceProperty.__properties[index] = p.prop;
                                p.__sourceProperty.__properties[oldProp.__propName] = oldProp;
                                p.__sourceProperty.__sourceContainer.source[oldProp.__propName] = p.__sourceProperty.__sourceContainer.source[index];
                                p.__sourceProperty.__sourceContainer.source[index] = p.value;
                            }
                        });

                    property.__sourceProperty.__reload();
                    return property.__sourceProperty.__proxy;
                }
            case "slice":
                return function (begin, end) {
                    if (end === undefined)
                        end = property.__sourceContainer.source.length;
                    else
                        end = Math.min(property.__sourceContainer.source.length, end);

                    let r = [];
                    for (let i = begin; i < end; ++i) {
                        r.push(property.__sourceProperty.__proxy[i]);
                    }
                    return r;
                }
            case "forEach":
            case "map":
                return function (action) {
                    return property.__sourceContainer.source[property.__propName](
                        (_, i, arr) => {
                            let e = property.__sourceProperty.__proxy[i];
                            let r = action(e, i, arr);
                            return action(e, i, arr);
                        }
                    )
                }
            case "concat":
                return function (...items) {
                    let r = [];
                    property.__sourceProperty.__proxy.forEach(e => {
                        r.push(e);
                    });
                    items.forEach(i => {
                        if (Array.isArray(i)) {
                            i.forEach(e => r.push(e));
                        } else {
                            r.push(i);
                        }
                    });
                    return r;
                }
            case "flat":
                return function (depth) {
                    if (!depth)
                        depth = 1;

                    let r = [];

                    property.__sourceProperty.__proxy.forEach(i => {
                        if (Array.isArray && depth - 1 > -1)
                            i.flat(depth - 1).forEach(e => r.push(e));
                        else
                            r.push(i);
                    });
                    return r;
                }
            case "filter":
                return function (predicate) {
                    let r = [];
                    property.__sourceProperty.__proxy.forEach(e => {
                        if (predicate(e))
                            r.push(e);
                    });
                    return r;
                }
            case "reverse":
                return function () {
                    let r = [];
                    property.__sourceProperty.__proxy.forEach(e => {
                        if (predicate(e))
                            r.unshift(e);
                    });
                    return r;
                }
        }
    }
    if (Array.isArray(property.__sourceContainer.source) || !(property.__sourceContainer.source instanceof Object))
        return function (...args) {
            return property.__sourceContainer.source[property.__propName].call(
                property.__sourceContainer.source,
                ...(args).map(a => a && a.valueOf()));
        }
    else
        return function (...args) {
            return property.__sourceContainer.source[property.__propName].call(
                property.__sourceProperty.__proxy,
                ...(args));
        }
}

class PropertySource {
    /**
     * 
     * @param {Property} property 
     */
    constructor(property) {
        return new Proxy(Object.assign(
            getProxyFunction(property),
            {
                toString: function () {
                    return this.valueOf().toString();
                },
                valueOf: function () {
                    let track = property.__store.__track;
                    if (track.length > 0) {
                        property.__addTarget(track[track.length - 1]);
                    }

                    let v = property.__propName === undefined ?
                        property.__sourceContainer.source :
                        property.__sourceContainer.source[property.__propName];

                    if (v === undefined)
                        return v;
                    return v.valueOf();
                },
            }), new PropertyProxyHandler(property));
    }
}

export class Property {
    /**
     * 
     * @param {Store} store 
     * @param {*} sourceStore 
     * @param {string|number} propName 
     * @param {Property | undefined} sourceProperty
     */
    constructor(store, sourceStore, propName, sourceProperty) {
        this.__store = store;
        this.__sourceContainer = { source: sourceStore };
        this.__sourceProperty = sourceProperty;

        this.__properties = {};
        if (propName === "0") throw new Error("!!!!");
        this.__propName = propName;
        /**@type {TargetAction[]} */
        this.__targets = [];
        this.__loaded = false;

        this.__proxy = new PropertySource(this);
    }

    /**@param {TargetAction} targetAction*/
    __addTarget(targetAction) {
        if (this.__targets.indexOf(targetAction) < 0) {
            targetAction.properties.push(this);
            this.__targets.push(targetAction);
        }
    }
    __reloadArray() {
        this.__reload();
        Object.values(this.__properties)
            .forEach(p => {
                if (!Number.isInteger(p.__propName))
                    p.__reload();
            });
    }
    __reload() {
        if (!this.__loaded) {
            this.__store.__load(this);
            this.__loaded = true;
        }
    }
    __shot() {
        this.__loaded = false;
    }
    /**@param {TargetAction} targetAction*/
    __removeTarget(targetAction) {
        this.__targets.splice(this.__targets.indexOf(targetAction), 1);
    }

    __setStore(store) {
        this.__sourceContainer.source = store;

        Object.values(this.__properties).forEach(p => {
            p.__setStore(store[this.__propName]);
        })
        this.__reload();
    }
    __setValue(value) {
        this.__sourceContainer.source[this.__propName] = value;

        Object.values(this.__properties).forEach(p => {
            p.__setStore(value);
        })
        this.__reload();
    }
}

class PropertyProxyHandler {
    /**
     * 
     * @param {Property} target 
     */
    constructor(target) {
        this.__target = target;
    }
    /**
     * 
     * @param {Property} target 
     * @param {string|number} prop 
     */
    get(_, prop) {
        try {
            if (prop === Symbol.toPrimitive) {
                return this.__target.__sourceContainer.source[this.__target.__propName][prop];
            }

            /**@type {Property} */
            let property = this.__target.__properties[prop];
            if (property === undefined) {
                let propStore = this.__target.__propName !== undefined ?
                    this.__target.__sourceContainer.source[this.__target.__propName] :
                    this.__target.__sourceContainer.source;

                if (!isNaN(prop)) {
                    prop = Number.parseInt(prop);
                }
                this.__target.__properties[prop] = property = new Property(this.__target.__store, propStore, prop, this.__target);
            }
            else if (property instanceof Function) {
                return _[prop];
            }
            let track = property.__store.__track;
            if (track.length > 0) {
                property.__addTarget(track[track.length - 1]);
            }

            return property.__proxy;
        }
        catch (e) {
            if (!e.propertyStack) {
                e = {
                    error: e,
                    toString: function () {
                        return this.error + "\n" + "store." + this.propertyStack.map(p => p.__propName).reverse().join(".");
                    },
                    propertyStack: []
                };
            }

            e.propertyStack.push(this.__target);
            throw e;
        }
    }
    /**
     * 
     * @param {Property} target 
     * @param {} prop 
     */
    set(_, prop, value) {
        /**@type {Property} */
        let property = this.__target.__properties[prop];

        if (property !== undefined) {
            property.__setValue(value/* && value.valueOf()*/);
        } else {
            (this.__target.__propName ?
                this.__target.__sourceContainer.source[this.__target.__propName] :
                this.__target.__sourceContainer.source)
            [prop] = value/* && value.valueOf()*/;
        }

        if (Array.isArray(this.__target.__sourceContainer.source[this.__target.__propName]))
            this.__target.__reload();

        return true;
    }

    /*apply(_, thisArg, args) {
        return this.__target.__sourceContainer.source[this.__target.__propName](...args);
    }*/
}
const propertyProxyHandler = new PropertyProxyHandler();

class TargetAction {
    /**
     * 
     * @param {Store} store 
     * @param {(() => any) | Proxy} tracking 
     * @param {(any) => any} postaction 
     * @param {boolean} continuousTracking 
     */
    constructor(store, tracking, postaction, continuousTracking) {
        this.store = store;
        this.tracking = tracking;
        this.postaction = postaction;
        this.continuousTraking = continuousTracking;
        this.tracked = false;
        /**@type {Property[]} */
        this.properties = [];
    }

    shot() {
        if (!this.tracked) {
            this.__track();
        }
        else if (this.continuousTraking) {
            this.untrack();
            this.__track();
        } else {
            let r = this.tracking.valueOf() instanceof Function ?
                this.tracking() :
                this.tracking;
            if (this.postaction)
                this.postaction(r);
        }
    }
    __track() {
        this.store.__startTrack(this);
        let r = this.tracking.valueOf() instanceof Function ?
            this.tracking() :
            this.tracking;
        r && r.valueOf();
        this.store.__stopTrack(this);
        if (this.postaction)
            this.postaction(r);
        this.tracked = true;
    }
    untrack() {
        this.properties.forEach(p => p.__removeTarget(this));
        this.properties.length = 0;
        this.tracked = false;
    }
}
export class Target {
    /**
     * 
     * @param {Store} store
     * @param {((() => void)| {tracking, postaction, continuousTracking})[]} actions 
     */
    constructor(store, actions) {
        this.store = store;
        /**@type {TargetAction[]} */
        this.actions = actions.map(a => {
            return a instanceof Function ?
                new TargetAction(
                    store,
                    a,
                    null,
                    false
                ) :
                new TargetAction(
                    store,
                    a.tracking,
                    a.postaction,
                    a.continuousTracking
                );
        });
    }

    track() {
        this.actions.forEach(a => a.shot());
    }
    untrack() {
        this.actions.forEach(a => a.untrack());
    }
}

let storeKeyIncrement = 0;
export class Store {
    constructor() {
        /**@type {TargetAction[]} */
        this.__track = [];
        /**@type {Property[]} */
        this.__loaded = [];
    }

    /**@param {TargetAction} target*/
    __startTrack(target) {
        if (!target.__storeKey) {
            target.__storeKey = ++storeKeyIncrement;
        }
        this.__track.push(target);
    }
    /**@param {TargetAction} target*/
    __stopTrack(target) {
        if (this.__track[this.__track.length - 1] === target)
            this.__track.length -= 1;
        else
            throw new Error("bad tracking flow: you should stop tracking in reverse order of start tracking. async tracking is not supported yet!");
        //this.__track.splice(this.__track.indexOf(target), 1);
    }
    __load(property) {
        this.__loaded.push(property);
    }
    track(target, action) {
        let t = { target, action };
        this.__startTrack(t);
        let r = action.track();
        this.__stopTrack(t);
        if (action.action)
            action.action(r);
    }
    shot() {
        let start = Date.now();
        let shoted = {};
        try {
            this.__loaded.forEach(p => {
                p.__targets.forEach(t => {
                    if (!shoted[t.__storeKey]) {
                        t.shot();
                        shoted[t.__storeKey] = true;
                    }
                });
                p.__shot();
            });
        }
        catch (e) {
            if (e.propertyStack) {
                console.error(e.error, e.propertyStack);
            }
            else {
                console.error(e);
            }
        }
        this.__loaded.splice(0, this.__loaded.length);

        console.log(`updated ${Object.keys(shoted).length} targets for ${Date.now() - start} ms`);
    }
}