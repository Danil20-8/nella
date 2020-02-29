import { useHtmljs, Component, list } from "../../..";

export default function useSlowComponent(context, parentContext) {
    let { component, div, span } = useHtmljs(context, parentContext);

    class SlowComponent extends Component {
        constructor(context) {
            super(null, context);
        }

        component() {
            return div({
                style: () => this.loaded ? "border: solid 2px green; padding: 12px; color: green;" : "border: solid 2px red; padding: 12px; color: red",
            },
                span({
                    innerText: () => this.loaded ? "Ready to work!" : "Loading..."
                }),
                div({
                    innerText: () => this.loaded ? "Me too!" : "Waiting too..."
                }),

                div({},
                    list({
                        data: ["1", "2", "3"],
                        component: (data) => div({ innerText: () => data })
                    }))
            );
        }
        awake() {
            this.loaded = false;
        }
        async start() {
            await new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });

            this.loaded = true;
        }
    }

    return (context) => component(new SlowComponent(context));
}