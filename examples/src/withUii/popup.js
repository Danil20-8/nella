import { poolSwitch, div, button, val, isDefined } from "../../../uii";
import { pushState, popState } from "../../../router";
import { Component } from "../../../uii";

class Popup extends Component {
    constructor(context) {
        super(null, context);
    }

    awake() {
        pushState(null, null, this);
    }

    component({ message, okHandler, cancelHandler }) {
        return div({
            style: "position: absolute; left: 33vw; right: 33vw; top: 25vh; bottom: 50vh; border: solid 2px green; color green; display: flex; justify-content: center; flex-flow: column;"
        },
            div({ innerText: message, style: "text-align: center" }),
            poolSwitch(
                {
                    active: () => val(okHandler),
                    component: () =>
                        button({
                            innerText: "ok",
                            onclick: () => {
                                popState();
                                okHandler();
                            }
                        })
                }
            ),
            poolSwitch(
                {
                    active: () => val(cancelHandler),
                    component: () =>
                        button({
                            innerText: "cancel",
                            onclick: () => {
                                popState();
                                cancelHandler();
                            }
                        })
                }
            ),
            poolSwitch(
                {
                    active: () => !(val(okHandler) || val(cancelHandler)),
                    component: () =>
                        button({ innerText: "close", onclick: () => { popState(); } })
                }
            )
        );
    }

    onexit() {
        this.context.hide();
    }
}

export function popup(context) {
    return poolSwitch({
        active: context.active,
        component: () => new Popup(context)
    })
}