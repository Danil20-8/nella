import * as uui from "../uii"

export interface ComponentContextInterface extends GlobalEventHandlers {
    innerText?: string
    innerHtml?: string
    style?: CSSStyleDeclaration
    value?: string,
    className?: string,
    checked?: boolean
}

type CoponentChildrenType = uui.Component | (() => uui.Component);

export class Component extends uui.Component {
    constructor(element: string | HTMLElement | null, context: ComponentContextInterface | any | null, children: CoponentChildrenType[]) {
        super(element, context, children);
    }
}

export function div(context: ComponentContextInterface, ...children: CoponentChildrenType[]) {
    return uui.div(context, ...children);
}
export function span(context: ComponentContextInterface, ...children: CoponentChildrenType[]) {
    return uui.span(context, ...children);
}
export function inputText(context: ComponentContextInterface) {
    return uui.inputText(context);
}
export function inputSubmit(context: ComponentContextInterface) {
    return uui.inputSubmit(context);
}
export function checkbox(context: ComponentContextInterface) {
    return uui.checkbox(context);
}
export function radio(context: ComponentContextInterface) {
    return uui.radio(context);
}
export function label(context: ComponentContextInterface, ...children: CoponentChildrenType[]) {
    return uui.label(context, ...children)
}
export function a(context: ComponentContextInterface, ...children: CoponentChildrenType[]) {
    return uui.a(context, ...children);
}

export function p(context: ComponentContextInterface, ...children: CoponentChildrenType[]) {
    return uui.p(context, ...children);
}
export function button(context: ComponentContextInterface) {
    return uui.button(context);
}

export function select(context: ComponentContextInterface & { options: { text: string, value: any }[], value: any }) {
    return uui.select(context);
}

export function iframe(context: ComponentContextInterface, ...children: CoponentChildrenType[]) {
    return uui.iframe(context, ...children)
}
export function list<TData>(context: { data: TData[], component: (data: TData) => (Component | Component[]) }) {
    return uui.list(context);
}
export function mount(element: HTMLElement, ...children: CoponentChildrenType[]) {
    return uui.mount(element, ...children);
}

export function useStore<T>(data: T): T {
    return uui.useStore(data);
}
export function updateUii() {
    return uui.updateUii();
}