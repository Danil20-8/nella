import { useStore, poolSwitch, poolList, div, button, isDefined } from "../../..";
import { NRoute } from "../../../router";

const route = new NRoute({
    onpushEnter: function () {
        if (popupStore.queue.length.valueOf() === 0)
            route.popState();
    },
    onpopEnter() {
        popupStore.queue.shift();
        if (popupStore.queue.length.valueOf() > 0) {
            route.pushState(null, null);
        }
    }
}, "popup");

class PopupStore {
    constructor() {
        this.queue = [];
    }

    pushPopup(item) {
        this.queue.push(item);

        if (this.queue.length.valueOf() === 1)
            route.pushState(null, null);
    }
    closePopup() { route.popState(); }
}

export const popupStore = useStore(new PopupStore());


export function popup() {
    return poolList({
        data: () => popupStore.queue.slice(0, 1),
        component: ({ message, okHandler, cancelHandler }) =>
            div({
                style: "position: absolute; left: 33vw; right: 33vw; top: 25vh; bottom: 50vh; border: solid 2px green; color green; display: flex; justify-content: center; flex-flow: column;"
            },
                div({ innerText: message, style: "text-align: center" }),
                poolSwitch(
                    {
                        active: () => isDefined(okHandler),
                        component: () =>
                            button({
                                innerText: "ok",
                                onclick: () => {
                                    popupStore.closePopup();
                                    okHandler();
                                }
                            })
                    }
                ),
                poolSwitch(
                    {
                        active: () => isDefined(cancelHandler),
                        component: () =>
                            button({
                                innerText: "cancel",
                                onclick: () => {
                                    popupStore.closePopup();
                                    cancelHandler();
                                }
                            })
                    }
                ),
                poolSwitch(
                    {
                        active: () => !(isDefined(okHandler) || isDefined(cancelHandler)),
                        component: () =>
                            button({ innerText: "close", onclick: () => { popupStore.closePopup(); } })
                    }
                )
            )
    })
}