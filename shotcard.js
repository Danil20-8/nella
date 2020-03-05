function handleResult(r, callback) {
    if (r instanceof Promise)
        return r.then(v => {
            callback();
            return v;
        });
    else {
        callback();
        return r;
    }
}
/**
 * 
 * @param {Property} property 
 */
function getProxyFunction(property) {
    switch (property.__propName) {
        case "shift":
        case "pop":
        case "unshift":
            return function (...args) {
                let r = property.__sourceContainer.source[property.__propName](...args.map(a => a.valueOf()));
                property.__sourceProperty.__reloadArray();
                return r;

            }
        case "push":
            return function (...items) {
                property.__sourceContainer.source.push(...items);
                for (let i = property.__sourceContainer.source.length - items.length; i < property.__sourceContainer.source.length; ++i) {
                    let p = property.__sourceProperty[i];
                    if (!p) {
                        p = new Property(property.__store, property.__sourceContainer.source, i, property.__sourceProperty);
                        property.__sourceProperty.__properties[i] = p;
                    } else {
                        p.__setValue(property.__sourceContainer.source[i]);
                    }
                }
                property.__sourceProperty.__reloadArray();
                return property.__sourceContainer.source.length;
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
                            p.__propName = upperBound + start - replaceBound + i;
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
                    end = property.__sourceContainer.source.length - 1;
                else
                    end = Math.min(property.__sourceContainer.source.length - 1, end);

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
        default:
            return function (...args) {
                return property.__sourceContainer.source[property.__propName].call(
                    Array.isArray(property.__sourceContainer.source) ?
                        property.__sourceContainer.source :
                        property.__sourceProperty.__proxy,
                    ...(args).map(a => a.valueOf()));
            }
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
                    if (property.__store.__track.length > 0) {
                        property.__store.__track.forEach(t => property.__addTarget(t));
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
        this.__targets = [];
        this.__loaded = false;

        this.__proxy = new PropertySource(this);
    }

    __addTarget({ target, action }) {
        target.properties.push(this);
        this.__targets.push(action);
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

    __removeTarget(action) {
        this.__targets.splice(this.__targets.indexOf(action), 1);
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
            if (this.__target.__store.__track.length > 0) {
                this.__target.__store.__track.forEach(t => property.__addTarget(t));
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
        let property = this.__target.__properties[prop];

        if (property !== undefined) {
            property.__setValue(value.valueOf());
        } else {
            (this.__target.__propName ?
                this.__target.__sourceContainer.source[this.__target.__propName] :
                this.__target.__sourceContainer.source)
            [prop] = value.valueOf();
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

class TargetAction{
    constructor(preaction, postaction, continious) {
        
    }
}
export class Target {
    /**
     * 
     * @param {Store} store
     * @param {((() => void))[]} actions 
     */
    constructor(store, actions) {
        this.store = store;
        this.actions = actions.map(a => {
            return {
                tracked: false,
                action: a instanceof Function ?
                    {
                        track: a,
                        action: null
                    } :
                    {
                        track: a.track.valueOf() instanceof Function ?
                            a.track :
                            () => a.track.valueOf(),
                        action: a.action
                    }

            };
        });
        this.properties = [];
    }

    track() {
        this.actions.forEach(a => {
            if (!a.tracked) {
                this.store.track(this, a.action);
                a.tracked = true;
            } else {
                let r = a.action.track();
                if (a.action.action)
                    a.action.action(r);
            }
        });
    }
    untrack() {
        this.actions.forEach(a => {
            if (a.tracked) {
                this.properties.forEach(p => p.__removeTarget(a.action));
                a.tracked = false;
            }
        });
        this.properties.splice(0, this.properties.length);
    }
}

let storeKeyIncrement = 0;
export class Store {
    constructor() {
        this.__track = [];
        this.__loaded = [];
    }

    __startTrack(target) {
        this.__track.push(target);
    }
    __stopTrack(target) {
        this.__track.splice(this.__track.indexOf(target), 1);
    }
    __load(property) {
        this.__loaded.push(property);
    }
    track(target, action) {
        if (!action.__storeKey) {
            action.__storeKey = ++storeKeyIncrement;
        }
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
                        let r = t.track();
                        if (t.action)
                            t.action(r);
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

        console.log("update time", Date.now() - start);
    }
}
/*
let store = new Store();
let data = new Property(store, {
    person: {
        name: "steave",
        contacts: {
            email: "pochta.com",
            phone: "1"
        }
    },
    b: false,
    n: 0,
    langs: ["ru", "en"],
    professions: []
}).__proxy;

function useEl(context) {
    let store = context.store;

    return function el(data) {
        let target = new Target(store,
        [
            () => console.log(`name: ${data.person.name}`),
            () => console.log(`email: ${data.person.contacts.email} phone: ${data.person.contacts.phone}`),
            () => console.log(`i speak in ${data.langs.length} langs: ${data.langs.join(" and ")}`),
            () => console.log(`last profession: ${(data.professions[data.professions.length - 1].valueOf() || "-").toString()}`)
        ]
        );
        target.track();
        return target;
    }
}

let el = useEl({ store: store });



let target = el(data);

let start = Date.now();

console.log(Date.now() - start);


console.log("----rename");
data.person.name = "bob";
store.shot();

console.log("----reperson");
data.person = {
    name: "bill",
    contacts: {
        email: "---",
        phone: "12"
    }
};
store.shot();

console.log("----relang 0");
data.langs[0] = "it";
store.shot();

console.log("----relang");
data.langs = ["sp", "br", "gr"];
store.shot();

console.log("----push lang");
data.langs.push("en");
store.shot();

console.log("----push profession");
data.professions.push("cook");
store.shot();

console.log("----");
target.track();
*/