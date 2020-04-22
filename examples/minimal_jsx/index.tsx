import * as Nella from "../..";

class MainComponent extends Nella.Component<null>{
    component() {
        let state = Nella.useStore({
            clicked: false
        });

        return (
            <div>
                <button onclick={() => state.clicked = !state.clicked.valueOf() }>Hey!</button>
                <switchComponent>
                    {
                        {
                            active: true,
                            component: () => <div>Active!</div>
                        }
                    }
                </switchComponent>
                <poolSwitch>
                    {
                        {
                            active: state.clicked,
                            component: () => <div>Boo!</div>
                        }
                    }
                </poolSwitch>
                <list data={[1]}>
                    {
                        (t) => <div>{t}</div>
                    }
                </list>
                <poolList data={[2]}>
                    {
                        (t) => <div>{t}</div>
                    }
                </poolList>
                <HelloComponent name="World"></HelloComponent>
            </div>
        )
    }
}

function HelloComponent({ name }) { return <div>Hello {name}!</div> }

Nella.mount(document.body,
    <MainComponent></MainComponent>
);