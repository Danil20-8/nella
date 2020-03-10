import { Context, poolList, switchComponent, poolSwitch } from "../../oldIndex";
import { useAuthComponent } from "./withContext/auth";
import useTimerComponent from "./withContext/timerComponent";
import usePage from "./withContext/page";
import useSlowComponent from "./withContext/slow";


let htmljs = new Context();
let { mount, div, button, select, span, inputText } = htmljs;

let appData = {
    show: false,
    listData: []
};

let timerComponent = useTimerComponent(htmljs);
let page = usePage(htmljs);
let slowComponent = useSlowComponent(htmljs);
let start = Date.now();
mount(document.body,
    page({
        signedIn: false,
        authComponent: useAuthComponent(htmljs)
    }),
    timerComponent({
        title: "static timer"
    }),
    slowComponent({}),
    () => {
        let timers = [];
        return [
            () => {
                let inputTitle = "";
                let inputError = "";
                let timerTitleInput = null;
                return div({
                    style: "display: flex; flex-flow: row wrap; width: 480px"
                },
                    div({
                        style: "display: flex; flex-flow: column wrap; width: 320px"
                    },
                        timerTitleInput = inputText({
                            placeholer: "title",
                            style: () => inputError ? "color: red; border-color: red;" : "",
                            value: () => inputTitle,
                            onkeyup: (e) => { inputTitle = e.target.value; inputError = ""; }
                        }),
                        switchComponent(
                            {
                                active: () => inputError,
                                component: () => span({
                                    style: "color: red;",
                                    innerText: () => inputError
                                })
                            }
                        )
                    ),
                    button({
                        innerText: "add timer",
                        onclick: () => {
                            if (inputTitle) {
                                timers.push({ title: inputTitle });
                                inputTitle = "";
                            } else {
                                inputError = "enter title!"

                                //timerTitleInput.element.scrollIntoView();
                            }
                        }
                    })
                )
            },
            div({
                style: "display: flex; height: 300px; flex-flow: column wrap; "
            },
                poolList({
                    data: timers,
                    component: (pool) => div({},
                        timerComponent(pool),
                        button({
                            innerText: "delete",
                            onclick: () => {
                                timers.splice(
                                    timers.indexOf(pool.__context),
                                    1
                                );
                            }
                        })
                    )
                })
            )
        ]
    },
    select({
        options: [{ text: "abc", value: "1" }, { text: "qwer", value: "2" }],
        value: "1",
        onchange: () => { }
    }),
    poolList({
        data: appData.listData,
        component: (context) => [
            div({}, [
                span({
                    innerText: "online",
                    style: "color: green"
                }),
                button({
                    innerText: () => `meet ${context.id}`,
                    onclick: () => {
                        context.meeted = true
                    }
                }),
                poolSwitch(
                    {
                        active: () => context.meeted,
                        component: () => div({
                            style: "border: solid 1px red",
                            innerText: () => `Hey! I'm a model ${context.id}`
                        })
                    }
                )
            ]
            ),
            poolSwitch({ active: () => !context.meeted, component: () => div({ innerText: "meet me!" }) })
        ],

    }),
    button({
        innerText: "magic!",
        onclick: () => {
            if (Math.random() > .5) {
                let index = Math.round(Math.random() * appData.listData.length);
                appData.listData.splice(index, 1);
            }
            else {
                appData.listData.splice(Math.round(Math.random() * appData.listData.length), 0,
                    {
                        id: Math.round(Math.random() * 50),
                        meeted: false
                    });
            }
        }
    })
);

console.log(Date.now() - start);