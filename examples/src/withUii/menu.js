import { poolSwitch, div, span, useStore, list, button, Component, th } from "../../..";
import { NRoute } from "../../../router";

class MenuComponent extends Component {
    awake() {
        this.state = this.state || useStore({
            active: false
        });

        this.route = this.route || new NRoute(this, "menu");
    }
    component({ title, options }) {

        return div({
            style: "position: relative;"
        },
            header({ title, active: this.state.active, toggle: () => this.route.pushState(null, null) }),
            poolSwitch(
                {
                    active: () => this.state.active.valueOf(),
                    component: () =>
                        div({ style: "position:absolute; z-index: 10; top: 0; background-color: yellow;" },
                            [
                                header({ title, active: () => this.state.active, toggle: () => this.route.popState() }),
                                body({ options })
                            ]
                        )
                }
            )
        )
    }
    onenter() {
        this.state.active = true;
    }
    onexit() {
        this.state.active = false;
    }
}

function header({ title, active, toggle }) {
    return div({},
        button({
            innerText: () => active.valueOf() ? "close" : "open",
            onclick: toggle
        }),
        span({ innerText: title, style: "margin-left: 20px" })
    );
}
function body({ options }) {
    return div({
        style: "position:absolute; left: 0; right: 0;"
    },
        list({
            data: options,
            component: (data) =>
                div({},
                    button({
                        style: "width: 100%;",
                        innerText: data.title,
                        onclick: () => {
                            data.trigger();
                        }
                    })
                )
        })
    );
}

export function menuComponent(context) { return new MenuComponent(context); }