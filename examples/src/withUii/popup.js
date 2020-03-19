import { useStore, poolSwitch, poolList, div, button, isDefined } from "../../..";
import { NRoute } from "../../../router";

class PopupStore {
    constructor() {
        this.queue = [];
    }
}

class PopupRoute extends NRoute {
    constructor(popup, keyPrefix) {
        super((keyPrefix || "") + "popup");

        this.popup = popup;
    }

    handlePushEnter() {
        if (this.popup.store.queue.length.valueOf() === 0)
            this.popState();
    }
    handlePopExit() {
        this.popup.store.queue.shift();
        if (this.popup.store.queue.length.valueOf() > 0) {
            this.pushState(null, null);
        }
    }
}

export class Popup {
    constructor(routeKey) {
        this.route = new PopupRoute(this, routeKey)

        this.store = useStore(new PopupStore());
    }

    push(item) {
        this.store.queue.push(item);

        if (this.store.queue.length.valueOf() === 1)
            this.route.pushState(null, null);
    }
    close() {
        this.route.popState();
    }

    component() {
        return poolList({
            data: () => this.store.queue.slice(0, 1),
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
                                        this.close();
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
                                        this.close();
                                        cancelHandler();
                                    }
                                })
                        }
                    ),
                    poolSwitch(
                        {
                            active: () => !(isDefined(okHandler) || isDefined(cancelHandler)),
                            component: () =>
                                button({ innerText: "close", onclick: () => { this.close(); } })
                        }
                    )
                )
        })
    }
}
export const popup = new Popup();