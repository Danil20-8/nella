import { val, component, body, div, inputText, list, button, switchComponent, p, Component } from "../../index";

class SearchComponent extends Component {
    /*context;
    element;

    focus;*/
    constructor(context) {
        super(null, context, []);
        this.element = div({},
            inputText({
                value: this.context.value,
                onkeyup: (e) => this.context.onchange(e),
                onchange: (e) => this.context.onchange(e),
                onfocus: () => {
                    this.focus = true;
                    this.update();
                },
                onblur: () => {
                    this.focus = false;
                    this.update();
                }
            }),
            div({
                style: () => `${!this.focus ? "display: none;" : ""}`
            },
                list({
                    data: () => val(this.context.suggestions).filter(s => s.startsWith(val(this.context.value))),
                    createElement: (s) => div({
                        innerText: s,
                        setState: function (s) {
                            this.innerText = s;
                        }
                    }),
                })
            )
        );
    }
    update() {
        this.element.update();
    }
}
function searchComponent(context) {
    return new SearchComponent(context);
}

class ContentPage {
    /*context;
    element;

    searchValue;*/
    constructor(context) {
        this.context = context;

        this.element = body(
            searchComponent({
                value: () => this.searchValue || "",
                onchange: (e) => {
                    this.searchValue = e.target.value;

                    this.update();
                },
                suggestions: ["wall", "stay", "love", "feel", "be", "do"]
            }),
            div({},
                list({
                    data: ["item 1", "item 2"],
                    createElement: (data) => {
                        return div({
                            innerText: data
                        });
                    }
                }, div({

                }))
            )
        );
    }
    update() {
        this.element.update();
    }
}
function contentPage(context) {
    return new ContentPage(context);
}

function itemPage(context) {
    let page = body(
        div({
            style: "background: red; width: 10px; height: 10px;"
        }),
        select({
            style: "width: 200px;",
            value: 3,
            options: [1, 2, 3, 4, 5],
            onchange: (e) => update(page)
        })
    );

    return page;
}

class MainContext {
    /*items;

    buttonClicked;
    tags;
    count;
    leftright;*/
    constructor() {
        this.items = ["1", "2", "3"];
        this.buttonClicked = false;
        this.count = 0;
        this.tags = "";
        this.leftright = [{ value: 1, side: false }, { value: 2, side: false }, { value: 3, side: false }, { value: 4, side: true }]
    }
}
class MainApp {
    /*parent;
    context;
    element;*/
    constructor(parent) {
        this.parent = parent;

        this.context = new MainContext();

        this.element = component(parent, { style: "color: blue;" },
            body(
                div({
                    style: "position: relative;"
                },
                    component("h1", { innerText: () => "No no no" }),
                    inputText({
                        value: () => this.context.tags,
                        onchange: (e) => {
                            this.context.tags = e.target.value;
                            this.update();
                        },
                        onkeyup: (e) => {
                            this.context.tags = e.target.value;
                            this.update();
                        }
                    }),
                    list({
                        data: () => this.context.tags.split(" ").filter(t => t),
                        createElement: (tag) => {
                            return div({
                                style: `color: ${tag};`,
                                innerText: tag + " "
                            });
                        }
                    })
                ),
                div({
                    innerHTML: "<strong>AAA</strong>aaa!"
                }),
                (() => {
                    let mycontext = {
                        items1: ["List 1", "Item 1", "Item 2"],
                        items2: ["List 2", "Item 1", "Item 2"],
                        items3: ["List 3", "Item 1", "Item 2"]
                    };
                    let el = body(
                        button({
                            innerText: "Add to list 1",
                            onclick: () => {
                                mycontext.items1.push(
                                    mycontext.items1.length === 0 ?
                                        `List 1` :
                                        `Item ${mycontext.items1.length}`);
                                this.update();
                            }
                        }),
                        button({
                            innerText: "Add to list 2",
                            onclick: () => {
                                mycontext.items2.push(
                                    mycontext.items2.length === 0 ?
                                        `List 2` :
                                        `Item ${mycontext.items2.length}`);
                                this.update();
                            }
                        }),
                        button({
                            innerText: "Add to list 3",
                            onclick: () => {
                                mycontext.items3.push(
                                    mycontext.items3.length === 0 ?
                                        `List 3` :
                                        `Item ${mycontext.items3.length}`);
                                this.update();
                            }
                        }),
                        list({
                            data: () => mycontext.items1,
                            createElement: (d) => body(div({
                                innerText: d
                            }),
                                button({
                                    innerText: `remove ${d}`,
                                    onclick: () => {
                                        mycontext.items1.splice(mycontext.items1.indexOf(d), 1);
                                        this.update();
                                    }
                                })
                            )
                        }),
                        list({
                            data: () => mycontext.items2,
                            createElement: (d) => body(div({
                                innerText: d
                            }),
                                button({
                                    innerText: `remove ${d}`,
                                    onclick: () => {
                                        mycontext.items2.splice(mycontext.items2.indexOf(d), 1);
                                        this.update();
                                    }
                                })
                            )
                        }),

                        list({
                            data: () => mycontext.items3,
                            createElement: (d) => body(div({
                                innerText: d
                            }),
                                button({
                                    innerText: `remove ${d}`,
                                    onclick: () => {
                                        mycontext.items3.splice(mycontext.items3.indexOf(d), 1);
                                        this.update();
                                    }
                                })
                            )
                        }),
                    );

                    return el;
                })()
                ,
                div({ id: 1 },
                    list({
                        data: () => this.context.items,
                        createElement: (data) => {
                            return div({
                                innerText: data,
                                setState: function (s) {
                                    this.innerText = s;
                                }
                            });
                        }
                    })),
                button({
                    className: () => `clickable ${this.context.buttonClicked ? "clicked" : null}`,
                    innerText: () => !this.context.buttonClicked ? "Click me!" : "Click again!",
                    onclick: (e) => {
                        this.context.buttonClicked = true;
                        if (Math.random() > .5) {
                            this.context.items.splice(0, 1);
                        }
                        else {
                            this.context.items.splice(
                                Math.round(Math.random() * (this.context.items.length - 1)),
                                0, Math.round(Math.random() * 30));
                        }
                        this.context.count += 1;
                        this.update();
                    }
                }),
                div({
                    innerText: () => this.context.count
                }),
                div({

                },
                    inputText({
                        placeholder: "enter something"
                    }),
                    button({
                        innerText: "add",
                        onclick: (e) => {
                            this.context.leftright.push({
                                value: e.target.parentElement.querySelector("input").value,
                                side: false
                            });
                            this.update();
                        }
                    })

                ),
                div({
                    style: "display: flex;"
                },
                    div({
                        style: "width: 300px;"
                    },
                        component("h3", {
                            innerText: "left side"
                        }),
                        list({
                            data: () => this.context.leftright.filter(e => e.side),
                            createElement: (d) => body(
                                div({
                                    innerText: () => d.value
                                }),
                                inputText({
                                    placeholder: "rename",
                                    onkeydown: (e) => {
                                        if (e.keyCode === 13) {
                                            d.value = e.target.value;
                                            this.update();
                                        }
                                    }
                                }),
                                button({
                                    innerText: "to the right",
                                    onclick: () => {
                                        d.side = !d.side;
                                        this.update();
                                    }
                                }))
                        })
                    ),
                    div({
                        style: "width: 300px;"
                    },
                        component("h3", {
                            innerText: "right side"
                        }),
                        list({
                            data: () => this.context.leftright.filter(e => !e.side),
                            createElement: (d) => body(
                                div({
                                    innerText: d.value
                                }),
                                button({
                                    innerText: "to the left",
                                    onclick: () => {
                                        d.side = !d.side;
                                        this.update();
                                    }
                                }))
                        })
                    ),
                    button({
                        innerText: "resort",
                        onclick: () => {
                            this.context.leftright = this.context.leftright.reverse();
                            this.update();
                        }
                    })
                ),
                div({
                    style: "border: solid 1px red"
                },
                    switchComponent({
                        items: [
                            {
                                active: () => this.context.count % 2 === 0,
                                createElement: () => contentPage({

                                })
                            },
                            {
                                active: () => this.context.count % 2 === 1,
                                createElement: () => itemPage({

                                })
                            }
                        ]
                    })
                )
            )
        );
    }

    update() {
        this.element.update();
    }
}

let main = new MainApp(document.body);
main.update();