import { Context, val, switchComponent, Component, body, useHtmljs } from "../../../oldIndex";

/**
 * 
 * @param {Context} htmljs 
 * @param {Context} parentHtmljs
 */

export default function useTimerComponent(htmljs, parentHtmljs) {
    let { component, div, span, button } = useHtmljs(htmljs, parentHtmljs);

    class TimerComponent extends Component {
        constructor(context) {
            super(null, context);
        }
        
        component() {
            return [
                span({ innerText: () => this.context.title + " " }),
                span({ innerText: () => this.startTime && ((this.stopTime || Date.now()) - this.startTime) / 1000 }),
                switchComponent(
                    {
                        active: () => !this.started,
                        component: () => button({
                            innerText: "start", onclick: () => {
                                this.started = true;
                                this.startTime = Date.now();
                                this.stopTime = 0;
                                this.interval = setInterval(() => {
                                    this.update();
                                }, 30);
                            }
                        })
                    },
                    {
                        active: () => this.started,
                        component: () => button({
                            innerText: "stop", onclick: () => {
                                this.started = false;
                                clearInterval(this.interval);
                                this.interval = null;
                                this.stopTime = Date.now();
                            }
                        })
                    }
                )
            ];
        }

        awake() {
            this.started = false;
            this.interval = null;
            this.startTime = 0;
            this.stopTime = 0;
        }
        stop() {
            clearInterval(this.interval);
        }
    }
    return (context) => component(new TimerComponent(context));
}