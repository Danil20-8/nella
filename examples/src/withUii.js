import { div, mount, switchComponent, inputText, button, list, poolList, useStore, poolSwitch } from "../../uii";
import { pushState, useFallbackBackHandler, restore } from "../../router";
import { popup } from "./withUii/popup";

// Experimental default history popstate handler
useFallbackBackHandler(() => {
    route.pathname = location.pathname;
});

// Defining stores
// useStore returns proxy of your source object
let store = useStore({
    name: "rename me",
    langs: ["en", "ru"]
});
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
        hide: popupStore.closePopup
    }),
    button({ innerText: "boo!", onclick: () => popupStore.pushPopup({}) }),
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
                        store.langs.push(inputStore.value);
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
                        button({ innerText: "to content!", onclick: route.gotoContent })
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

            }
        )
    )
);