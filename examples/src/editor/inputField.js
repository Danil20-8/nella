import { useHtmljs } from "../../../oldIndex";

export function useInputField(context) {
    let { div, switchComponent, inputText, body, list } = useHtmljs(context);

    function inputField (context) {

        let { data, field } = context;

        return switchComponent({
            items: [{
                active: () => field.type === "string" || field.type === "number",
                createElement: () => inputText({
                    value: () => field.getValue()
                    ,
                    onchange: (e) => {
                        field.setValue(e.target.value);
                    }
                })
            },
            {
                active: () => field.type === "list",
                createElement: () => body(
                    list({
                        data: () => Object.keys(field.listType),
                        createElement: (k) => div({},
                            inputText({
                                value: () => field.listType[k],
                                placeholder: "list field name",
                                onchange: (e) => {
                                    field.rename(e.target.value);
                                }
                            })
                        )
                    }),
                    list({
                        data: () => field.listValue,
                        createElement: (d) => list({
                            data: () => Object.keys(field.listType),
                            createElement: (t) => inputField({
                                field: d[t]
                            })
                        })
                    })
                )
            }
            ]
        });
    }

    return inputField;
}