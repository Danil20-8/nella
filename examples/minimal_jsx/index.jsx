import * as Nella from "../../";


let store = Nella.useStore({ number: 321 })

Nella.mount(document.body,
    <div>Hello World! {store.number} <span> Hey! i'm span! </span>
        {() => [
            <div>
                Computed div {() => store.number.toString().split("").reverse().join("")}
            </div>
        ]}
    </div>
);

store.number = 123;
Nella.updateN();