import { useStore, list, div, button, inputText, switchComponent, Component, UiiTarget } from "../../..";

class InputForm extends Component {
    constructor(context) {
        super(null, context);
    }
    awake({ inputs }) {
        this.state = Object.assign(this.state || useStore({}),
            {
                values: []
            }
        );

        /**@type {UiiTarget} */
        this.track = this.track || new UiiTarget([
            () => (this.state.values = inputs.map((e, i) => (e.value && e.value.valueOf()) || ""))
        ]);

        this.track.track();
    }
    stop() {
        this.track.untrack();
    }
    component({ inputs, onsave, oncancel }) {
        let { values } = this.state;

        return [
            list({
                data: () => inputs.map((e, i) => i),
                component: (index) =>
                    div({},
                        inputText({
                            placeholder: inputs[index].caption,
                            value: values[index],
                            onkeyup: (e) => values[index] = e.target.value
                        })
                    )
            }),
            button({
                innerText: "save",
                onclick: () => {
                    onsave(
                        ...(inputs.map((input, index) => {
                            let value = values[index].valueOf();

                            return value;
                        }))
                    );
                    inputs.forEach((input, index) => {
                        values[index] = inputs[index].value || "";
                    });
                }
            }),
            switchComponent(
                {
                    active: () => oncancel !== undefined,
                    component: () =>
                        button({
                            innerText: "cancel",
                            onclick: () => {
                                oncancel();
                                inputs.forEach((input, index) => {
                                    values[index] = inputs[index].value || "";
                                });
                            }
                        })
                }
            )
        ];
    }
}
export function inputForm(context) { return new InputForm(context); }