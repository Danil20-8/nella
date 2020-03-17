import { useStore, poolSwitch, poolList, div, button, isDefined } from "../../..";
import { router } from "../../../router";

class PopupStore {
    constructor() {
        this.queue = [];
    }

    pushPopup(item) {
        this.queue.push(item);

        if (this.queue.length.valueOf() === 1)
            router.pushState(null, null, this);
    }
    closePopup() { router.popState(); }
    onpushEnter() {
        if (this.queue.length.valueOf() === 0)
            router.popState();
    }
    onpopExit() {
        this.queue.shift();
        console.log("exit!!!");
        if (this.queue.length.valueOf() > 0) {
            console.log("pushing!");
            router.pushState(null, null, this);
        }
    }
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