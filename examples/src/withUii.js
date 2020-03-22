import { div, mount, switchComponent, inputText, button, list, poolList, useStore, poolSwitch, label, p, NTarget } from "../..";
import { popState, router } from "../../router";
import { popup } from "./withUii/popup";
import { expirienceComponent } from "./withUii/expirienceComponent";
import { resumeRoute } from "./withUii/routes/resumeRoute";
import { contentRoute } from "./withUii/routes/contentRoute";
import { homeRoute } from "./withUii/routes/homeRoute";
import { store } from "./withUii/store";
import { Menu } from "./withUii/menu";
import { itemPage } from "./withUii/pages/itemPage";

// Experimental: popup on first history entry move back to confirm page exit
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

new NTarget([
    // Debug main state logging
    /*{
        tracking: () => console.log(store.expirience.map(e => `${e.name} ${e.age}`).join(", ")),
        // continuousTracking is useful for dynamic objects such as arrays
        // it allows you do track changes of new item properties
        continuousTracking: true
    }*/
    {
        tracking: () => console.log("queue length:", popup.store.queue.length.valueOf())
    }
]).track();

// Application entry point
mount(document.body,
    // html body content
    popup.component(),
    new Menu().component({
        title: "Menu", options: [
            {
                title: "home", trigger: homeRoute.pushRoute
            },
            {
                title: "content", trigger: contentRoute.pushRoute
            },
            {
                title: "resume", trigger: resumeRoute.pushRoute
            }
        ]
    }),
    button({ innerText: "boo!", onclick: () => popup.push({ message: "be scaring!" }) }),
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
                        store.name = inputStore.value.valueOf();
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
            homeRoute,
            contentRoute,
            resumeRoute,
            itemPage
        )
    )
);