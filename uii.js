import { Store, Target, Property } from "./shotcard";
const store = new Store();

function getElement(component) {
    if (component) {
        if (component instanceof HTMLElement) {
            return component;
        }
        else {
            if (Array.isArray(component.element)) {
                for (let i = 0; i < component.element.length; ++i) {
                    let el = getElement(component.element[i]);

                    if (el)
                        return el;
                }
                return null;
            }
            else {
                return getElement(component.element);
            }
        }
    }
    else {
        return null;
    }
}
function getParent(component) {
    if (component) {
        if (component instanceof HTMLElement) {
            return component;
        }
        else {
            if (Array.isArray(component.element)) {
                return getParent(component.__parent);
            }
            else {
                return getParent(component.element);
            }
        }
    }
    else {
        return null;
    }
}
function getNextSibling(component, skip) {
    if (component) {
        if (!skip && component instanceof HTMLElement) {
            return component;
        }
        else {
            let s = skip ? component.__nextSibling : component;
            while (s) {
                let el = getElement(s);

                if (el)
                    return el;

                s = s.__nextSibling;
            }
            let p = component.__parent;
            while (p && Array.isArray(p.element)) {
                let r = getNextSibling(p.__nextSibling);

                if (r)
                    return r;
                p = p.__parent;
            }
            /*if (Array.isArray(component.__parent.element)) {
                let r = getNextSibling(component.__parent.__nextSibling);
                return r;
            }*/
        }
    }
    return null;
}
function append(el, ...children) {
    children.forEach(c => {
        if (c instanceof HTMLElement) {
            getParent(el).append(c);
        }
        else {
            if (Array.isArray(c.element)) {
                c.element.forEach(e => append(el, e));
            }
            else if (c.element) {
                append(el, c.element);
            }
        }
    });
}
function insertBefore(el, child, refchild) {
    if (child instanceof HTMLElement) {
        getParent(el).insertBefore(child, getNextSibling(refchild));
    }
    else {
        if (Array.isArray(child.element)) {
            child.element.forEach(c => insertBefore(el, c, refchild));
        }
        else {
            insertBefore(el, child.element, refchild);
        }
    }
}
export function val(value) {
    return value instanceof Function ?
        value() :
        value;
}

function update(component, state) {
    if (component.update instanceof Function) {
        component.update(state);
    } else if (component.element && component.element.update instanceof Function) {
        component.element.update(state);
    }
}
function remove(component) {
    if (component.remove instanceof Function) {
        component.remove();
    }
    else if (Array.isArray(component)) {
        component.forEach(c => remove(c));
    }
    else if (component.element) {
        remove(component.element);
    }
}

function setHooks(context) {
    Object.keys(context).forEach(k => {
        if (k.startsWith("on")) {
            let handler = context[k];
            context[k] = async (...args) => {
                let r = handler(...args);
                while (r instanceof Promise)
                    r = await r;
                store.shot();
                return r;
            }
        }
    });
}

export class Component {
    /**
     * 
     * @param {*} html 
     * @param {*} context 
     * @param {(Component | (() => Component))[]} children 
     */
    constructor(html, context, children) {
        this.context = context;
        this.awake();

        this.children = children || this.component(context);
        if (!Array.isArray(this.children)) {
            this.children = [this.children];
        }
        for (let i = 0; i < this.children.length; ++i) {
            let c = this.children[i];

            if (Array.isArray(c)) {
                this.children.splice(i, 1, ...c);
                --i;
            }
            else if (c instanceof Function) {
                c = c(context);
                if (c)
                    this.children[i] = new Component(null, context, c);
                else {
                    this.children.splice(i, 1);
                    --i;
                }
            }
            else if (!(c instanceof Component)) {
                this.children.splice(i, 1);
                --i;
            }
        }

        if (html) {
            if (html instanceof HTMLElement) {
                this.element = html;
                append(this.element, ...this.children);
            }
            else {
                this.element = document.createElement(html);
                append(this.element, ...this.children);
            }

            let actions = []
            let contextKeys = Object.keys(this.context);
            for (let i = 0; i < contextKeys.length; ++i) {
                let k = contextKeys[i];
                if (k.startsWith("on")) {
                    this.element[k] = this.context[k];
                }
                else if (!k.startsWith("_")) {
                    if (this.element[k] !== undefined) {
                        if (this.context[k].valueOf() instanceof Function) {
                            actions.push(() => this.element[k] = this.context[k]().valueOf());
                        }
                        else {
                            actions.push(() => this.element[k] = this.context[k].valueOf());
                        }
                    }
                }
            }

            this.__store = new Target(store, actions);

            this.__applyHtmlContext();

        } else {
            this.element = this.children;
        }

        for (let i = 0; i < this.children.length; ++i) {
            let c = this.children[i];

            if (c instanceof Component) {
                c.__parent = this;
                c.__nextSibling = this.children[i + 1];
            }
        }
    }
    /**
     * @returns { Component[] }
     */
    component(context) {
        return [];
    }
    __reset() {
        this.children.forEach(c => c.__reset());
        if (Array.isArray(this.element)) {
            this.element.forEach(e => e.__reset());
        }
        if (this.element instanceof Component)
            this.element.__reset();

        this.__started = false;

        this.awake();

        this.__applyHtmlContext();
    }
    awake() {

    }
    __start() {
        this.__started = true;

        return this.start();
    }
    start() {
    }
    __stop() {
        this.children.forEach(c => c.__stop());
        if (Array.isArray(this.element)) {
            this.element.forEach(e => e.__stop());
        }

        this.stop();
        this.__started = false;
        if (this.element instanceof HTMLElement) {
            this.__store.untrack();
        }
    }
    stop() {
    }
    async update() {
        if (!this.__started) {
            await this.__start();
        }
        try {
            this.__applyHtmlContext();

            this.children.forEach(c => update(c));
        }
        catch (e) {
            if (!e.componentStack)
                e.componentStack = [];
            e.componentStack.push(this);
            throw e;
        }
    }
    __applyHtmlContext() {
        if (this.element instanceof HTMLElement) {
            this.__store.track();
        }
    }
    remove() {
        if (this.__started)
            this.__stop();

        remove(this.element);
    }
}
function component(name, context, ...children) {
    return new Component(name, context, children);
}
class PoolProxy {
    constructor(valueContainer) {
        this.valueContainer = valueContainer;
        return new Proxy(Object.assign(valueContainer,
            {
                toString: function () { return valueContainer.value.toString(); },
                valueOf: function () { return valueContainer.value.valueOf(); }
            }), this)
    }

    get(_, prop) {
        switch (prop) {
            case "valueOf":
            case "toString":
                return _[prop];
        }
        
        return this.valueContainer.value[prop];
    }
}
class ComponentPool {
    /**
     * 
     * @param {(pool: { context: any }) => Component} component 

     */
    constructor(component) {
        this.__pool = [];
        this.__component = component;
    }
    /**
     * 
     * @param {Component} element 
     */
    push(element) {
        if (element.__pool) {
            this.__pool.push(element);
        }
    }
    pop(context) {
        let element = this.__pool.pop();
        if (element) {
            element.__pool.valueContainer.value = context;
            element.__reset();
            return element;
        }
        else {
            let valueContainer = {
                value: context
            };

            let pool = {
                valueContainer,
                proxy: new PoolProxy(valueContainer)
            };

            element = new Component(null, pool, this.__component(pool.proxy));
            element.__pool = pool;
            element.__remove = element.remove;
            element.remove = () => {
                element.__remove();
                this.push(element);
            };
            return element;
        }
    }
}
/**
 * 
 * @param {*} context 
 * @param  {...(Component| (() => Component))} children 
 */
export function div(context, ...children) {
    setHooks(context);
    return component("div", context, ...children)
}
export function span(context, ...children) {
    setHooks(context);
    return component("span", context, ...children);
}
export function input(context, type) {
    setHooks(context);
    return component("input", Object.assign(context, { type: type }));
}
export function inputText(context) {
    setHooks(context);
    return input(context, "text");
}
export function inputSubmit(context) {
    setHooks(context);
    return input(context, "submit");
}
export function checkbox(context) {
    setHooks(context);
    return input(context, "checkbox");
}
export function radio(context) {
    setHooks(context);
    return input(context, "radio");
}
export function label(context, ...children) {
    setHooks(context);
    return component("label", context, ...children);
}
export function a(context, ...children) {
    setHooks(context);
    return component("a", context, ...children);
}

export function p(context, ...children) {
    setHooks(context);
    return component("p", context, ...children);
}
export function button(context) {
    setHooks(context);
    return component("button", context);
}

export function select(context) {
    setHooks(context);
    let options = context.options;
    delete context.options;
    if (options instanceof Function) {
        let getOptions = options;
        let oldOptions = [];
        options = () => {
            let newOptions = getOptions();
            if (oldOptions === newOptions) {
                return oldOptions;
            }

            for (let i = 0; i < oldOptions.length; ++i) {
                let oldOption = oldOptions[i];
                if (!newOptions.includes(oldOption)) {
                    let oldIndex = newOptions.findIndex((e) => e.value === oldOption.value && e.text === oldOption.text);

                    if (oldIndex > -1) {
                        newOptions[oldIndex] = oldOption;
                    }
                }
            }
        };
    }
    return component("select", context,
        poolList({
            data: options,
            component: (data) => component("option", {
                innerText: () => data.text,
                value: () => data.value,
                selected: () => data.value === val(context.value)
            })
        })
    );
}

export function iframe(context, ...children) {
    setHooks(context);
    let e = component("iframe", context);
    let componentUpdate = e.update.bind(e.update);
    let el = getElement(e);
    let it = setInterval(() => {
        if (el.contentDocument) {
            clearInterval(it);
            let fel = component(el.contentDocument.body, context, ...children);
            e.update = () => {
                //componentUpdate();

                fel.update();
            }
        }
    }, 30);
    return e;
}
export function mount(element, ...children) {
    let c = new Component(element, {}, children);
    c.update();
    return c;
}
/**
 * 
 * @param {{ items: { active: boolean, createElement?: () => Component, component: () => Component }[] }} context 
 * @param {number} limit 
 */
/*export function switchComponent(context, limit = 1) {
    return listComponent({
        data: () => val(context.items).filter(i => val(i.active)).slice(0, limit),
        component: (i) => (i.createElement || i.component)()
    });
}*/
/**
 * 
 * @param  {...{ active: (() => boolean) | boolean, component: () => Component }} items 
 */
export function switchComponent(...items) {
    return list({
        data: () => items.filter(i => val(i.active.valueOf())).slice(0, 1),
        component: (i) => i.component()
    });
}
/**
 * 
 * @param  {...{ active: (() => boolean) | boolean, component: () => Component }} items 
 */
export function poolSwitch(...items) {
    return switchComponent(
        ...items.map(i => { return { active: i.active, component: usePoolComponent(i.component) }; })
    )
}
let __listComponentKeyIncrement = 0;
class ListComponent extends Component {
    /**
     * 
     * @param {{ data: any[], createElement?: (data: any) => Component, component: (data: any) => Component }} context 
     */
    constructor(context) {
        let children = [];
        super(null, context, children);

        if (!context.component)
            context.component = context.createElement;

        this.oldData = [];
        this.elements = children;
        this.dict = {};

        this.__store = new Target(store,
            [
                () => this.__updateList(
                    context.data.valueOf() instanceof Function ?
                        context.data().valueOf() :
                        context.data.valueOf())
            ]);

        this.__store.track();
    }
    __insertAt(index, element) {
        if (this.__started) {
            if (index < this.elements.length) {
                insertBefore(this.__parent, element, this.elements[index]);
            }
            else {
                insertBefore(this.__parent, element, getNextSibling(this, true));
            }
        }
    }
    update() {
        this.__store.track();

        super.update();
    }
    __updateList(data) {
        let replaced = {};
        let inserted = {};

        for (let i = 0; i < data.length; ++i) {
            let nd = data[i];
            let od = this.oldData[i];

            let doObj = nd instanceof Object;

            if (doObj && nd == od)
                continue;

            let key = doObj ?
                nd["__key"] || (nd["__key"] = ++__listComponentKeyIncrement) :
                nd;

            let element = this.dict[key];

            if (!element) {
                element = new Component(null, nd, this.context.component(nd));
                element.__parent = this;

                if (doObj) {
                    this.dict[key] = element;
                }
                else {
                    let d = this.dict[key];
                    if (d) {
                        d.push(element);
                    }
                    else {
                        this.dict[key] = [element];
                    }

                    let it = inserted[key];
                    if (it)
                        it.push(element);
                    else
                        inserted[key] = [element];
                }
            }
            else {
                if (!doObj) {
                    let it = inserted[key];
                    if (it && it.length >= element.length) {
                        let el = new Component(null, nd, this.context.component(nd));
                        element.__parent = this;

                        element.push(el);
                        element = el;

                        let it = inserted[key];
                        if (it)
                            it.push(element);
                        else
                            inserted[key] = [element];
                    } else {
                        let e = element.shift();
                        element.push(e);
                        element = e;

                        let it = inserted[key];
                        if (it)
                            it.push(element);
                        else
                            inserted[key] = [element];

                        if (nd == od)
                            continue;
                    }
                }

                let t = replaced[key];
                if (t) {
                    if (!doObj) {
                        t.splice(t.indexOf(element), 1);
                    }
                    else {
                        delete replaced[key];
                    }
                }

                if (doObj) {
                    inserted[key] = element;
                }
            }

            let oldElement = this.elements[i];

            let insertIndex = i + 1;
            for (; insertIndex < this.elements.length; ++insertIndex) {
                let nthd = this.oldData[insertIndex];

                if (doObj) {
                    if (inserted[nthd["__key"]])
                        continue;
                    else
                        break;
                }
                else {
                    let it = inserted[nthd];
                    if (it) {
                        let nthel = this.elements[insertIndex];
                        if (it.indexOf(nthel) > -1)
                            continue;
                    }
                    break;
                }
            }

            this.__insertAt(insertIndex, element);
            //insertBefore(this.__parent, element, this.elements[insertIndex]);

            /*if (insertIndex < this.elements.length) {
                insertBefore(this.__parent, element, this.elements[insertIndex]);
            }
            else {
                //console.log(insertIndex, nd, this, getNextSibling(this, true));

                insertBefore(this.__parent, element, getNextSibling(this, true));
            }*/

            if (insertIndex - 1 > 0)
                this.elements[insertIndex - 2].__nextSibling = element;

            if (oldElement) {
                if (doObj) {
                    if (!inserted[od["__key"]])
                        replaced[od["__key"]] = oldElement;
                }
                else {
                    let it = inserted[od];
                    if (!it || it.indexOf(oldElement) < 0) {
                        let t = replaced[od];
                        if (t)
                            t.push(oldElement);
                        else
                            replaced[od] = [oldElement];
                    }
                }
            }
            this.elements[i] = element;
            this.oldData[i] = nd;
        }

        Object.keys(replaced)
            .forEach(k => {
                let t = replaced[k];
                let d = this.dict[k];
                if (Array.isArray(t)) {
                    t.forEach(e => {
                        remove(e);
                        d.splice(d.indexOf(e), 1);
                    }
                    );

                    if (d.length === 0) {
                        delete this.dict[k];
                    }
                }
                else {
                    remove(t);

                    delete this.dict[k];
                }
            });

        if (this.oldData.length > data.length) {
            for (let i = data.length; i < this.oldData.length; ++i) {
                let el = this.elements[i];
                let od = this.oldData[i];

                let doObj = od instanceof Object
                let k = doObj ?
                    od["__key"] :
                    od;

                if (doObj && inserted[od["__key"]])
                    continue;
                else {
                    let it = inserted[od];
                    if (it && it.indexOf(el) > -1) {
                        continue;
                    }
                }


                if (doObj) {
                    delete this.dict[k];
                }
                else {
                    let d = this.dict[k];
                    d.splice(d.indexOf(el), 1);
                    if (d.length === 0) {
                        delete this.dict[k];
                    }
                }
                remove(el);
            }
            this.elements.splice(data.length, this.elements.length);
            this.oldData.splice(data.length, this.oldData.length);

            if (this.elements.length > 0)
                this.elements[this.elements.length - 1].__nextSibling = null;
        }
    }
}
/**
 * 
 * @param {{ data: T[], createElement?: (data: T) => Component, component: (data: T) => (Component | Component[]) }} context 
 */
export function list(context) {
    return new ListComponent(context);
}
/**
 * 
 * @param {{ data: T[], component: (pool: { context: T }) => Component}} context 
 */
export function poolList(context) {
    let pool = new ComponentPool(context.component);
    return list({
        data: context.data,
        component: (data) => pool.pop(data)
    });
}
/**
 * 
 * @param {() => Component} component 
 */
export function usePoolComponent(component) {
    let pool = new ComponentPool(component);
    return () => pool.pop();
}

export class UiiTarget extends Target {
    /**
     * 
     * @param {(() => void)[]} actions 
     */
    constructor(actions) {
        super(store, actions);
    }
}

export function useStore(data){
    return new Property(store, data).__proxy;
}

export function updateUii() {
    store.shot();
}