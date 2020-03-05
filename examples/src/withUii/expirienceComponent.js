import { label, Component, useStore, button, poolList, div, poolSwitch } from "../../../uii";
import { inputForm } from "./inputForm";

class ExpirienceComponent extends Component {
    constructor(data) {
        super(null, data);
    }
    awake() {

    }
    component(data) {
        let state = this.state = useStore({
            order: 0
        });

        return div({},
            label({ innerText: "expirience" }),
            inputForm({
                inputs: [
                    {
                        caption: "name"
                    },
                    {
                        caption: "age"
                    }
                ],
                onsave: (name, age) => {
                    data.push({
                        name: name,
                        age: age
                    })
                }
            }),
            div({},
                [
                    div({},
                        button({
                            innerText: "sort",
                            onclick: () => state.order += 1
                        })
                    ),
                    poolList({
                        data: () => {
                            switch (state.order % 3) {
                                case 1:
                                    return data.map(e => e).sort((l, r) => {
                                        if (l.age.length.valueOf() > r.age.length.valueOf())
                                            return 1;
                                        if (l.age.length.valueOf() < r.age.length.valueOf())
                                            return -1;
                                        return 0;
                                    });
                                case 2:
                                    return data.map(e => e).sort((l, r) => {
                                        if (l.age.length.valueOf() < r.age.length.valueOf())
                                            return 1;
                                        if (l.age.length.valueOf() > r.age.length.valueOf())
                                            return -1;
                                        return 0;
                                    });
                                default:
                                    return data.map(e => e);
                            }
                        },
                        component: (data) => {
                            let state = useStore({
                                editMode: false
                            });

                            return div({},
                                label({ innerText: () => `${data.name} age: ${data.age}` }),
                                poolSwitch(
                                    {
                                        active: () => !state.editMode.valueOf(),
                                        component: () =>
                                            [
                                                button({
                                                    innerText: "edit",
                                                    onclick: () => state.editMode = true
                                                }),
                                                button({
                                                    innerText: "delete",
                                                    onclick: () => deleteItem(data)
                                                })
                                            ]
                                    },
                                    {
                                        active: () => state.editMode.valueOf(),
                                        component: () =>
                                            [
                                                inputForm({
                                                    inputs: [
                                                        {
                                                            caption: "name",
                                                            value: data.name
                                                        },
                                                        {
                                                            caption: "age",
                                                            value: data.age
                                                        }
                                                    ],
                                                    onsave: (name, age) => {
                                                        data.name = name;
                                                        data.age = age;
                                                        state.editMode = false;
                                                    },
                                                    oncancel: () => {
                                                        state.editMode = false;
                                                    }
                                                })
                                            ]
                                    }
                                )
                            )
                        }
                    })
                ]
            )
        );
        function deleteItem(item) {
            data.splice(data.indexOf(item), 1)
        }
    }
}

export function expirienceComponent(data) { return new ExpirienceComponent(data); }