import { poolSwitch, div, button, updateUii } from "../../../uii";
import { pushState } from "../../../router";
import { Component } from "../../../uii";

class Popup extends Component {
    constructor(context) {
        super(null, context);
    }

    awake() {
        pushState(null, null, {
            onexit: () => this.context.hide()
        });
    }

    component() {
        return div({
            style: "position: absolute; left: 33%; right: 33%; top: 25%; bottom: 50%; border: solid 2px green; color green; display: flex; justify-content: center; flex-flow: column;"
        },
            div({ innerText: "popup", style: "text-align: center" }),
            button({ innerText: "close", onclick: this.context.hide })
        );
    }
}

export function popup({ active, hide }) {
    return poolSwitch({
        active,
        component: () => new Popup({ active, hide })
    })
}