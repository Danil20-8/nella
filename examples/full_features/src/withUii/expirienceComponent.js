import { label, Component, useStore, button, poolList, div, poolSwitch, list } from "../../../..";
import { inputForm } from "./inputForm";

class ExpirienceComponent extends Component {
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
                            let values = data.map(d => {
                                return {
                                    data: d,
                                    value: {
                                        ageLength: d.age.length.valueOf(),
                                        age: (d.age.match(/\d+/) || [0])[0]
                                    }
                                };
                            });

                            switch (state.order % 3) {
                                case 1:
                                    return values.sort((ld, rd) => {
                                        let l = ld.value;
                                        let r = rd.value;
                                        if (l.age > r.age)
                                            return 1;
                                        if (l.age < r.age)
                                            return -1;
                                        return 0;
                                    }).map(v => v.data);
                                case 2:
                                    return values.sort((ld, rd) => {
                                        let l = ld.value;
                                        let r = rd.value;
                                        if (l.age < r.age)
                                            return 1;
                                        if (l.age > r.age)
                                            return -1;
                                        return 0;
                                    }).map(v => v.data);
                                default:
                                    return data;
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