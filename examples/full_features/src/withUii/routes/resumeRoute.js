import { router } from "../../../../../router";
import { expirienceComponent } from "../expirienceComponent";
import { poolList, div, label, inputText, useStore, button } from "../../../../..";
import { store } from "../store";

class ResumeRoute {
    active() { return router.pathname.startsWith("/resume"); }
    component() {
        return [
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
        ];
    }
    pushRoute() { router.pushState(null, "/resume", this); }
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

export const resumeRoute = useStore(new ResumeRoute());