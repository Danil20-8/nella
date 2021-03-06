import { useStore, list, div, button, inputText, switchComponent, Component, NTarget } from "../../../..";

class InputForm extends Component {
    awake({ inputs }) {
        this.state = Object.assign(this.state || useStore({}),
            {
                values: []
            }
        );

        /**@type {NTarget} */
        this.track = this.track || new NTarget([
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