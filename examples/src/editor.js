import { val, useHtmljs, Context } from "../../oldIndex";
import "./editor.css";
import useSandboxComponent from "./editor/sandbox";
import useCssEditor from "./editor/css";
import useTopEditorComponent from "./editor/top";
import useSideEditorComponent from "./editor/side";
import useEditorComponent from "./editor/editor";

let items = [];
let root = null
let activeItem = null;
let appData = {};

class DataContext{
    constructor() {
        
    }
}

class AppContext extends Context {
    constructor(...args) {
        super(...args);

        this.data = new DataContext();
    }

    update() {
        update();

        super.update();
    }
}

let htmljs = new AppContext();


let { mount, body, div, span, inputText, list, button, switchComponent, p, a, iframe, label, select, } = htmljs;

function addAppData(key, value, type, referer) {
    let d = appData[key] = {
        type: type,
        stringValue: type === "string" ? value : 0,
        numberValue: type === "number" ? value : 0,
        listType: "string",
        listValue: type === "list" ? value : [],

        refs: []
    };
    if (referer)
        d.refs.push(referer);
}
function addAppDataReferer(key, referer) {
    appData[key].refs.push(referer);
}
function removeAppDataReferer(key, referer) {
    let d = appData[key];
    d.refs.splice(d.refs.indexOf(referer), 1);
}
function renameAppData(key, newKey) {
    let d = appData[key];
    delete appData[key];
    appData[newKey] = d;
    d.refs.forEach(r => r.dynValue = newKey);
}
function setAppData(key, value) {
    let d = appData[key];
    switch (d.type) {
        case "string":
            d.stringValue = value;
            break;
        case "number":
            d.numberValue = parseFloat(value);
            break;
        case "list":
            d.listValue = value;
            break;
    }
}
function getAppDataValue(key) {
    let d = appData[key];
    if (!d)
        return null;
    switch (d.type) {
        case "string":
            return d.stringValue;
        case "number":
            return d.numberValue;
        case "list":
            return d.listValue;
    }
}

let sandbox = {
    element: null,
    context: {

    }
};

let editorComponent = useEditorComponent(new Context());

mount(document.body, editorComponent({
    items: [],
    activeItem: null,
    appData: {},
    sandbox: {
        element: null,
        context: {

        }
    },
    editorItemContext: function (context) {
        let t = {};
        Object.keys(context.elData).forEach(k => {
            t[k] = () => {
                let d = context.elData[k];
                switch (d.bind) {
                    case "const":
                        return d.constValue;
                    case "dynamic":
                        return sandbox.context[d.dynValue];
                }
            }
        });
        let ev = {};
        Object.keys(context.events).forEach(k => {
            let e = context.events[k];
            ev[k] = () => {
                switch (e.type) {
                    case "setState":
                        Object.assign(sandbox.context, e.state);
                        break;
                    case "function":
                        window[e.function]();
                        break;
                }
            }
        });
        return {
            ...context,
            ...t,
            ...ev,
            style: () => {
                let style = val(t.style);
                return style + (context === activeItem ? ";box-shadow: 0 0 7px yellow;" : null)
                    + "min-width: 12px; min-height: 12px; border: dashed 1px gray";
            },
            onclick: (e) => {
                if (!e.ctrlKey) {
                    if (activeItem !== context) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    this.selectItem(context);
                }
                if (e.ctrlKey && ev.onclick)
                    ev.onclick(e);
            }
        }
    },
    selectItem: function (item) {
        if (this.activeItem != item) {
            this.activeItem = item;
        }
    },
    defaultElContext: function (context, allowChildren, dynamic) {
        let elData = {};
        let d = this.defaultElData(context);
        Object.keys(d).forEach(k => {
            elData[k] = {
                bind: "const",
                constValue: d[k],
                dynValue: "",
                type: Array.isArray(d[k]) ? "list" : "string"
            };
        });
        return {
            allowChildren: !dynamic && allowChildren,
            dynamic: dynamic,
            data: [],
            createElement: (e) => e.el(e.context),
            elData: elData,
            events: !dynamic ? this.defaultEvents() : {}
        };
    },
    defaultElData: function (context) {
        return {

            ...context
        };
    },
    defaultEvents() {
        return {
            onclick: {
                type: null,
                state: {},
                function: ""
            }
        }
    }

}));

mount(document.body,
    div({
        className: "editor"
    },
        topComponent({
            pushItem: pushItem,
            defaultElContext: defaultElContext,
            editorItemContext: editorItemContext
        }),
        useSideEditorComponent(htmljs)({
            activeItem
        }),
        div({
            className: "editor-side"
        },
            button({
                innerText: "appData",
                onclick: () => {
                    showAppData = !showAppData;
                    // update();
                }
            }),
            button({
                innerText: "elementData",
                onclick: () => {
                    showElementData = !showElementData;
                    // update();
                }
            }),
            switchComponent({
                items: [{
                    active: () => showAppData,
                    createElement: () => body(
                        list({
                            data: () => Object.keys(appData),
                            createElement: (k) =>
                                div({},
                                    inputText({
                                        value: () => k,
                                        placeholder: "name",
                                        onchange: (e) => {
                                            renameAppData(k, e.target.value);
                                            // update();
                                        }
                                    }),
                                    switchComponent({
                                        items: [{
                                            active: () => appData[k].type === "string" || appData[k].type === "number",
                                            createElement: () => inputText({
                                                value: () => appData[k].type === "string" ?
                                                    appData[k].stringValue :
                                                    appData[k].type === "number" ?
                                                        appData[k].numberValue :
                                                        null,
                                                placeholder: "value",
                                                onchange: (e) => {
                                                    setAppData(k, e.target.value);
                                                    // update();
                                                }
                                            }),
                                        },
                                        {
                                            active: () => appData[k].type === "list",
                                            createElement: () => body(
                                                list({
                                                    data: () => appData[k].listValue,
                                                    createElement: (v) => inputText({
                                                        value: () => appData[k].listType === "string" ?
                                                            v.stringValue :
                                                            appData[k].listType === "number" ?
                                                                v.numberValue :
                                                                null,
                                                        onchange: (e) => {
                                                            switch (appData[k].listType) {
                                                                case "string":
                                                                    v.stringValue = e.target.value;
                                                                    break;
                                                                case "number":
                                                                    v.numberValue = parseFloat(e.target.value)
                                                                    break;
                                                            }
                                                            // update();
                                                        }
                                                    })
                                                }),
                                                select({
                                                    options: ["string", "number"],
                                                    value: () => appData[k].listType,
                                                    onchange: (e) => {
                                                        appData[k].listType = e.target.value;
                                                        // update();
                                                    }
                                                }),
                                                button({
                                                    innerText: "add to list",
                                                    onclick: () => {
                                                        appData[k].listValue.push({
                                                            stringValue: "",
                                                            numberValue: 0
                                                        });
                                                        // update();
                                                    }
                                                })
                                            )
                                        }
                                        ]
                                    }),
                                    select({
                                        options: ["string", "number", "list"],
                                        value: () => appData[k].type,
                                        onchange: (e) => {
                                            appData[k].type = e.target.value;
                                            // update();
                                        }
                                    }),
                                    switchComponent({
                                        items: [
                                            {
                                                active: () => appData[k].refCount === 0
                                                ,
                                                createElement: () =>
                                                    button({
                                                        innerText: "remove", onclick: () => {
                                                            delete appData[k];
                                                            // update();
                                                        }
                                                    })
                                            },
                                            {
                                                active: () => appData[k].refCount > 0,
                                                createElement: () => label({ innerText: () => `in use for ${appData[k].refCount} times` })
                                            }
                                        ]
                                    }),
                                )
                        }),
                        button({
                            innerText: "add field", onclick: () => {
                                addAppData("", "", "string");
                                // update();
                            }
                        })
                    )
                },
                {
                    active: () => activeItem && showElementData,
                    createElement: () =>
                        body(
                            list({
                                data: () => Object.keys(activeItem.elData),
                                createElement: (key) =>
                                    div({},
                                        label({ innerText: key }),
                                        switchComponent({
                                            items: [
                                                {
                                                    active: () => activeItem.elData[key].bind === "const",
                                                    createElement: () =>
                                                        inputText({
                                                            value: () => activeItem.elData[key].constValue,
                                                            placeholder: "value",
                                                            onchange: (e) => {
                                                                activeItem.elData[key].constValue = e.target.value;
                                                                // update();
                                                            }
                                                        })
                                                },
                                                {
                                                    active: () => activeItem.elData[key].bind === "dynamic",
                                                    createElement: () => body(
                                                        inputText({
                                                            value: () => activeItem.elData[key].dynValue,
                                                            placeholder: "field name",
                                                            onchange: (e) => {
                                                                let elData = activeItem.elData[key];
                                                                if (appData[elData.dynValue])
                                                                    removeAppDataReferer(elData.dynValue, elData)

                                                                let name = e.target.value;
                                                                elData.dynValue = name;
                                                                if (!appData[name])
                                                                    addAppData(name, elData.constValue, "string", elData);
                                                                else
                                                                    addAppDataReferer(name, elData);
                                                                // update();
                                                            }
                                                        }),
                                                        inputText({
                                                            value: () => getAppDataValue(activeItem.elData[key].dynValue),
                                                            onchange: (e) => {
                                                                setAppData(activeItem.elData[key].dynValue, e.target.value);
                                                                // update();
                                                            }
                                                        })
                                                    )
                                                }
                                            ]
                                        }),
                                        select({
                                            options: ["const", "dynamic"],
                                            value: () => activeItem.elData[key].bind,
                                            onchange: (e) => {
                                                let elData = activeItem.elData[key];
                                                if (elData.bind === "dynamic" && elData.dynValue)
                                                    removeAppDataReferer(elData.dynValue, elData);

                                                elData.bind = e.target.value;

                                                if (elData.bind === "dynamic") {
                                                    if (appData[elData.dynValue])
                                                        addAppDataReferer(elData.dynValue, elData);
                                                    else if (elData.dynValue) {
                                                        addAppData(elData.dynValue, elData.constValue, "string", elData);
                                                    }
                                                }
                                                // update();
                                            }
                                        })
                                    )
                            }),
                            list({
                                data: () => Object.keys(activeItem.events),
                                createElement: (k) => div({},
                                    label({
                                        innerText: k
                                    }),
                                    select({
                                        options: ["none", "setState", "function"],
                                        value: () => activeItem.events[k].type,
                                        onchange: (e) => {
                                            activeItem.events[k].type = e.target.value;
                                            // update();
                                        }
                                    }),
                                    switchComponent({
                                        items: [
                                            {
                                                active: () => activeItem.events[k].type === "setState",
                                                createElement: () => body(
                                                    list({
                                                        data: () => Object.keys(activeItem.events[k].state),
                                                        createElement: (sk) => div({},
                                                            select({
                                                                options: () => Object.keys(appData),
                                                                value: () => sk,
                                                                onchange: (e) => {
                                                                    let value = activeItem.events[k].state[sk];
                                                                    delete activeItem.events[k].state[sk];
                                                                    activeItem.events[k].state[e.target.value] = value;
                                                                    // update();
                                                                }
                                                            }),
                                                            inputText({
                                                                value: () => activeItem.events[k].state[sk],
                                                                placeholder: "new value",
                                                                onchange: (e) => {
                                                                    activeItem.events[k].state[sk] = e.target.value;
                                                                    // update();
                                                                }
                                                            })
                                                        )
                                                    }),
                                                    button({
                                                        innerText: "add field",
                                                        onclick: () => {
                                                            let nameIncrement = 0;
                                                            let fieldName = "new field";
                                                            while (activeItem.events[k].state[fieldName] !== undefined) {
                                                                fieldName = fieldName + (++nameIncrement);
                                                            }

                                                            activeItem.events[k].state[fieldName] = "";
                                                            // update();
                                                        }
                                                    })
                                                )
                                            },
                                            {
                                                active: () => activeItem.events[k].type === "function",
                                                createElement: () => body(
                                                    inputText({
                                                        placeholder: "function name",
                                                        value: () => activeItem.events[k].function,
                                                        onchange: (e) => {
                                                            activeItem.events[k].function = e.target.value;
                                                            // update();
                                                        }
                                                    })
                                                )
                                            }
                                        ]
                                    })
                                )
                            })
                        )
                }]
            }, 100),
        ),
        div({
            className: "editor-sandbox"
        },
            iframe({ width: "100%", height: "100%" }, sandboxComponent({
                items: items
            }))
        ),
        div({
            className: "editor-out"
        },
            button({
                innerText: "compile",
                onclick: () => compile()
            })
        )
    )
)

function update() {
    Object.keys(appData).forEach(k => {
        sandbox.context[k] = getAppDataValue(k);
    });
}

function pushItem(name, el, context) {
    let target = items;
    if (activeItem && activeItem.allowChildren) {
        target = activeItem.data;
    }
    else {
        activeItem = context;
    }

    target.push({
        name: name,
        el: el,
        context: context
    });
    // update();
}

function compileItem(item) {
    let c = {};
    Object.keys(item.context.elData).forEach(k => {
        c[k] = item.context.elData[k].toString();
    });
    return `${item.name}(${JSON.stringify(c)}, ${(item.context.data !== undefined ? item.context.data.map(i => compileItem(i)) : "")})`;
}

function compile() {
    console.log(
        `
        let context = {
            ${Object.keys(appData).map(k => `"${k}":"${appData[k]}"`).join(",")}
        };

        let app = component(document.body, {},
            ${items.map(i => compileItem(i))}
            );

        app.update();
    `);
}