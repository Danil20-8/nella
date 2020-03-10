import { div, mount, switchComponent, inputText, button, list, poolList, useStore, poolSwitch, label, p, UiiTarget } from "../..";
import { pushState, useFallbackBackHandler, restore, popState } from "../../router";
import { popup } from "./withUii/popup";
import { expirienceComponent } from "./withUii/expirienceComponent";
import { menuComponent } from "./withUii/menu";

// Experimental default history popstate handler
useFallbackBackHandler(() => {
    route.pathname = location.pathname;
});

/*pushState(null, null, {
    onenter: function () {
        console.log("Leaving!");
        if (this.entered) {
            popupStore.pushPopup({
                message: "Wow! Where are you going? You are leaving! Please stay!",
                okHandler: () => {
                    popState();
                },
                cancelHandler: function () {
                    popupStore.closePopup();
                    pushState(null, null, {});
                }
            })
        }

        this.entered = true;
    }
});
pushState(null, null, {});*/

// Defining stores
// useStore returns proxy of your source object
let store = useStore({
    name: "rename me",
    langs: ["en", "ru"],
    expirience: [{ name: "cook", age: "3 years" }, { name: "pilot", "age": "1 year" }]
});
new UiiTarget([
    // Debug main state logging
    /*{
        tracking: () => console.log(store.expirience.map(e => `${e.name} ${e.age}`).join(", ")),
        // continuousTracking is useful for dynamic objects such as arrays
        // it allows you do track changes of new item properties
        continuousTracking: true
    }*/

]).track();
let popupStore = useStore({
    queue: [],

    pushPopup: function (data) {
        this.queue.push(data);
    },
    closePopup: function () {
        this.queue.shift();
    }
});

let route = useStore({
    pathname: location.pathname,

    gotoHome: function () {
        this.goto("/");
    },
    gotoContent: function () {
        this.goto("/content");
    },
    gotoResume: function () {
        this.goto("/resume");
    },
    goto: function (pathname) {
        this.pathname = pathname;

        // Pushing history state with new url
        pushState(this, this.pathname, {
            onenter: (state) => {
                restore(this, state);
            }
        });
    },
});

// Application entry point
mount(document.body,

    // html body content
    popup({
        // arrow function will be called automatically on component creating and each time then in use store properties changed
        active: () => popupStore.queue.length > 0,
        hide: popupStore.closePopup,
        message: () => popupStore.queue[0].message,
        okHandler: () => popupStore.queue[0].okHandler,
        cancelHandler: () => popupStore.queue[0].cancelHandler
    }),
    menuComponent({
        title: "Menu", options: [
            {
                title: "home", trigger: route.gotoHome
            },
            {
                title: "content", trigger: route.gotoContent
            },
            {
                title: "resume", trigger: route.gotoResume
            }
        ]
    }),
    button({ innerText: "boo!", onclick: () => popupStore.pushPopup({ message: "be scaring!" }) }),
    div({
        // component will update its attributes when store property changed
        innerText: store.name
    }),
    div({},
        () => {
            // defining component local state
            let inputStore = useStore({
                value: ""
            });
            return [
                inputText({
                    value: inputStore.value,
                    onchange: (e) => {
                        inputStore.value = e.target.value;
                    }
                }),
                button({
                    innerText: "save",
                    // html element events trigger component update for which store properties changed
                    // so only attributes or only list elements will be updated which used changed properties
                    onclick: () => {
                        store.name = inputStore.value;
                        inputStore.value = "";

                    }
                })
            ]
        }
    ),
    div({},
        () => {
            // defining component local state
            let inputStore = useStore({
                value: ""
            });
            return [
                inputText({
                    placeholder: "lang",
                    value: inputStore.value,
                    onchange: (e) => inputStore.value = e.target.value
                }),
                button({
                    innerText: "Add",
                    onclick: () => {
                        store.langs.push(inputStore.value.valueOf());
                        inputStore.value = "";
                    }
                })
            ];
        }),
    div({},
        div({
            style: "color: green",
            innerText: store.langs.length
        }),
        // pool... indicates that component will reuse removed components with new state
        poolList({
            data: store.langs,
            component: (data) => [div({
                innerText: data
            }),
            button({
                innerText: "remove",
                onclick: () => store.langs.splice(store.langs.indexOf(data), 1)
            })
            ]
        })
    ),
    div({},
        // page router
        // caches inactive page components when they are loaded and deactivated
        poolSwitch(
            {
                // store properties can't be compared directly with values
                // you should call valueOf to get value of property proxy
                active: () => route.pathname.valueOf() === "/",
                component: () =>
                    [
                        div({ innerText: "Home" }),
                        div({ innerText: "Hello everybody! Glad to see you at my home! Please go to see my content!" }),
                        button({ innerText: "to content!", onclick: route.gotoContent }),
                        div({ innerText: "Or see my resume" }),
                        button({ innerText: "to resume!", onclick: route.gotoResume })
                    ]
            },
            {
                active: () => route.pathname.startsWith("/content"),
                component: () =>
                    [
                        div({ innerText: "Content" }),
                        div({ innerText: "Hey! Here is my content! Enjoy to see that!" }),
                        div({ innerText: "Tired of content? Go home and get rest." }),
                        button({ innerText: "to home", onclick: route.gotoHome })
                    ]

            },
            {
                active: () => route.pathname.startsWith("/resume"),
                component: () =>
                    [
                        div({ innerText: store.name }),
                        div({},
                            label({ innerText: "languages" }),
                            div({},
                                inputTextForm({ caption: "language", onsave: (value) => store.langs.push(value) })
                            ),
                            poolList({
                                data: store.langs,
                                component: (data) => div({ innerText: data })
                            })
                        ),
                        expirienceComponent(store.expirience)
                    ]
            }
        )
    )
);

function log(component) {
    console.log(component);
    return component;
}

function inputTextForm({ caption, onsave }) {
    let state = useStore({
        value: ""
    });

    return [
        inputText({
            placeholder: caption,
            value: state.value,
            onchange: (e) => state.value = e.target.value
        }),
        button({
            innerText: "save",
            onclick: () => {
                onsave(state.value.valueOf());
                state.value = "";
            }
        })
    ];
}