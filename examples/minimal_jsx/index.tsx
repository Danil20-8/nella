import * as Nella from "../..";

class MainComponent extends Nella.Component<null>{
    component() {
        return (
            <div>
                <HelloComponent name="World"></HelloComponent>
            </div>
        )
    }
}

function HelloComponent({ name }) { return <div>Hello {name}!</div> }

Nella.mount(document.body,
    <MainComponent></MainComponent>
);