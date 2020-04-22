import { mount, div, Component, inputText, useStore } from "../../../";
class AppComponent extends Component<{ name: string }>{
    component({ name }) {
        return [
            div({
                innerText: () => `Hello ${name}!`
            })
        ]
    }
}

let store = useStore({
    name: "World"
})

mount(
    document.body,
    new AppComponent({
        name: store.name
    }),
    inputText({
        value: store.name,
        onchange: (e: any) => store.name = e.target.value,
        onkeyup: (e: any) => store.name = e.target.value
    })
);