import { useStore, list, div, button, inputText, switchComponent } from "../../../uii";

class ImportForm{
    constructor({ inputs, onsave, oncancel }) {
        
    }
}

export function inputForm({
    inputs,
    onsave,
    oncancel
}) {
    let state = useStore({
        values: inputs.map((e, i) => (e.value && e.value.valueOf()) || "")
    });

    return [
        list({
            data: () => inputs.map((e, i) => i),
            component: (index) =>
                div({},
                    inputText({
                        placeholder: inputs[index].caption,
                        value: state.values[index],
                        onkeyup: (e) => state.values[index] = e.target.value
                    })
                )
        }),
        button({
            innerText: "save",
            onclick: () => {
                onsave(
                    ...(inputs.map((input, index) => {
                        let value = state.values[index].valueOf();

                        return value;
                    }))
                );
                inputs.forEach((input, index) => {
                    state.values[index] = inputs[index].value || "";
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
                                state.values[index] = inputs[index].value || "";
                            });
                        }
                    })
            }
        )
    ];
}