import { Context } from "../../../index";
/**
 * 
 * @param {Context} htmljs 
 * @param {Context} parentHtmljs 
 */
export default function useSideEditorComponent(htmljs, parentHtmljs = null) {
    let { } = parentHtmljs || htmljs;
    return function (context) {
        let showAppData = true;
        let showElementData = true;

        let { appData, addAppData, setAppData, addAppDataReferer, removeAppDataReferer, renameAppData } = context;

        return htmljs.component(
            div({
                className: "editor-side"
            },
                button({
                    innerText: "appData",
                    onclick: () => {
                        showAppData = !showAppData;

                    }
                }),
                button({
                    innerText: "elementData",
                    onclick: () => {
                        showElementData = !showElementData;

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

                                                            }
                                                        })
                                                    }),
                                                    select({
                                                        options: ["string", "number"],
                                                        value: () => appData[k].listType,
                                                        onchange: (e) => {
                                                            appData[k].listType = e.target.value;

                                                        }
                                                    }),
                                                    button({
                                                        innerText: "add to list",
                                                        onclick: () => {
                                                            appData[k].listValue.push({
                                                                stringValue: "",
                                                                numberValue: 0
                                                            });

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

                                }
                            })
                        )
                    },
                    {
                        active: () => context.activeItem && showElementData,
                        createElement: () =>
                            body(
                                list({
                                    data: () => Object.keys(context.activeItem.elData),
                                    createElement: (key) =>
                                        div({},
                                            label({ innerText: key }),
                                            switchComponent({
                                                items: [
                                                    {
                                                        active: () => context.activeItem.elData[key].bind === "const",
                                                        createElement: () =>
                                                            inputText({
                                                                value: () => context.activeItem.elData[key].constValue,
                                                                placeholder: "value",
                                                                onchange: (e) => {
                                                                    context.activeItem.elData[key].constValue = e.target.value;

                                                                }
                                                            })
                                                    },
                                                    {
                                                        active: () => context.activeItem.elData[key].bind === "dynamic",
                                                        createElement: () => body(
                                                            inputText({
                                                                value: () => context.activeItem.elData[key].dynValue,
                                                                placeholder: "field name",
                                                                onchange: (e) => {
                                                                    let elData = context.activeItem.elData[key];
                                                                    if (appData[elData.dynValue])
                                                                        removeAppDataReferer(elData.dynValue, elData)

                                                                    let name = e.target.value;
                                                                    elData.dynValue = name;
                                                                    if (!appData[name])
                                                                        addAppData(name, elData.constValue, "string", elData);
                                                                    else
                                                                        addAppDataReferer(name, elData);

                                                                }
                                                            }),
                                                            inputText({
                                                                value: () => getAppDataValue(context.activeItem.elData[key].dynValue),
                                                                onchange: (e) => {
                                                                    setAppData(context.activeItem.elData[key].dynValue, e.target.value);

                                                                }
                                                            })
                                                        )
                                                    }
                                                ]
                                            }),
                                            select({
                                                options: ["const", "dynamic"],
                                                value: () => context.activeItem.elData[key].bind,
                                                onchange: (e) => {
                                                    let elData = context.activeItem.elData[key];
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

                                                }
                                            })
                                        )
                                }),
                                list({
                                    data: () => Object.keys(context.activeItem.events),
                                    createElement: (k) => div({},
                                        label({
                                            innerText: k
                                        }),
                                        select({
                                            options: ["none", "setState", "function"],
                                            value: () => context.activeItem.events[k].type,
                                            onchange: (e) => {
                                                context.activeItem.events[k].type = e.target.value;

                                            }
                                        }),
                                        switchComponent({
                                            items: [
                                                {
                                                    active: () => context.activeItem.events[k].type === "setState",
                                                    createElement: () => body(
                                                        list({
                                                            data: () => Object.keys(context.activeItem.events[k].state),
                                                            createElement: (sk) => div({},
                                                                select({
                                                                    options: () => Object.keys(appData),
                                                                    value: () => sk,
                                                                    onchange: (e) => {
                                                                        let value = context.activeItem.events[k].state[sk];
                                                                        delete context.activeItem.events[k].state[sk];
                                                                        context.activeItem.events[k].state[e.target.value] = value;

                                                                    }
                                                                }),
                                                                inputText({
                                                                    value: () => context.activeItem.events[k].state[sk],
                                                                    placeholder: "new value",
                                                                    onchange: (e) => {
                                                                        context.activeItem.events[k].state[sk] = e.target.value;

                                                                    }
                                                                })
                                                            )
                                                        }),
                                                        button({
                                                            innerText: "add field",
                                                            onclick: () => {
                                                                let nameIncrement = 0;
                                                                let fieldName = "new field";
                                                                while (context.activeItem.events[k].state[fieldName] !== undefined) {
                                                                    fieldName = fieldName + (++nameIncrement);
                                                                }

                                                                context.activeItem.events[k].state[fieldName] = "";

                                                            }
                                                        })
                                                    )
                                                },
                                                {
                                                    active: () => context.activeItem.events[k].type === "function",
                                                    createElement: () => body(
                                                        inputText({
                                                            placeholder: "function name",
                                                            value: () => context.activeItem.events[k].function,
                                                            onchange: (e) => {
                                                                context.activeItem.events[k].function = e.target.value;

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
            )
        );
    }
}