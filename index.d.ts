import * as ll from "./index.js"

export interface ComponentContextInterface {
    innerText?: string | (() => string)
    title?: string | (() => string)
    innerHTML?: string | (() => string)
    style?: CSSStyleDeclaration | (() => CSSStyleDeclaration)
    value?: string | (() => string)
    className?: string | (() => string)
    checked?: boolean | (() => boolean)
    lang?: string | (() => string)
    href?: string | (() => string)
    src?: string | (() => string)
    width?: number | (() => number)
    height?: number | (() => number)
    size?: number | (() => number)
    tabIndex?: number | (() => number)
    action?: string | (() => string)
    method?: string | (() => string)
    name?: string | (() => string)
    type?: string | (() => string)
    colspan?: number | (() => number)
    rowspan?: number | (() => number)
    onabort?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: UIEvent) => any) | null;
    onanimationcancel?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: AnimationEvent) => any) | null;
    onanimationend?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: AnimationEvent) => any) | null;
    onanimationiteration?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: AnimationEvent) => any) | null;
    onanimationstart?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: AnimationEvent) => any) | null;
    onauxclick?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    /**
     * Fires when the object loses the input focus.
     * @param ev The focus event.
     */
    onblur?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: FocusEvent) => any) | null;
    oncancel?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when playback is possible, but would require further buffering.
     * @param ev The event.
     */
    oncanplay?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    oncanplaythrough?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when the contents of the object or selection have changed.
     * @param ev The event.
     */
    onchange?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when the user clicks the left mouse button on the object
     * @param ev The mouse event.
     */
    onclick?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    onclose?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when the user clicks the right mouse button in the client area, opening the context menu.
     * @param ev The mouse event.
     */
    oncontextmenu?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    oncuechange?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when the user double-clicks the object.
     * @param ev The mouse event.
     */
    ondblclick?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    /**
     * Fires on the source object continuously during a drag operation.
     * @param ev The event.
     */
    ondrag?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user releases the mouse at the close of a drag operation.
     * @param ev The event.
     */
    ondragend?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: DragEvent) => any) | null;
    /**
     * Fires on the target element when the user drags the object to a valid drop target.
     * @param ev The drag event.
     */
    ondragenter?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: DragEvent) => any) | null;
    ondragexit?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
     * @param ev The drag event.
     */
    ondragleave?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: DragEvent) => any) | null;
    /**
     * Fires on the target element continuously while the user drags the object over a valid drop target.
     * @param ev The event.
     */
    ondragover?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: DragEvent) => any) | null;
    /**
     * Fires on the source object when the user starts to drag a text selection or selected object.
     * @param ev The event.
     */
    ondragstart?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: DragEvent) => any) | null;
    ondrop?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: DragEvent) => any) | null;
    /**
     * Occurs when the duration attribute is updated.
     * @param ev The event.
     */
    ondurationchange?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when the media element is reset to its initial state.
     * @param ev The event.
     */
    onemptied?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when the end of playback is reached.
     * @param ev The event
     */
    onended?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when an error occurs during object loading.
     * @param ev The event.
     */
    onerror?: OnErrorEventHandler | (() => OnErrorEventHandler);
    /**
     * Fires when the object receives focus.
     * @param ev The event.
     */
    onfocus?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: FocusEvent) => any) | null;
    ongotpointercapture?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    oninput?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    oninvalid?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when the user presses a key.
     * @param ev The keyboard event
     */
    onkeydown?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user presses an alphanumeric key.
     * @param ev The event.
     */
    onkeypress?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: KeyboardEvent) => any) | null;
    /**
     * Fires when the user releases a key.
     * @param ev The keyboard event
     */
    onkeyup?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: KeyboardEvent) => any) | null;
    /**
     * Fires immediately after the browser loads the object.
     * @param ev The event.
     */
    onload?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when media data is loaded at the current playback position.
     * @param ev The event.
     */
    onloadeddata?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when the duration and dimensions of the media have been determined.
     * @param ev The event.
     */
    onloadedmetadata?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when Internet Explorer begins looking for media data.
     * @param ev The event.
     */
    onloadstart?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onlostpointercapture?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    /**
     * Fires when the user clicks the object with either mouse button.
     * @param ev The mouse event.
     */
    onmousedown?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    onmouseenter?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    onmouseleave?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse over the object.
     * @param ev The mouse event.
     */
    onmousemove?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer outside the boundaries of the object.
     * @param ev The mouse event.
     */
    onmouseout?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    /**
     * Fires when the user moves the mouse pointer into the object.
     * @param ev The mouse event.
     */
    onmouseover?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    /**
     * Fires when the user releases a mouse button while the mouse is over the object.
     * @param ev The mouse event.
     */
    onmouseup?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: MouseEvent) => any) | null;
    /**
     * Occurs when playback is paused.
     * @param ev The event.
     */
    onpause?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when the play method is requested.
     * @param ev The event.
     */
    onplay?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when the audio or video has started playing.
     * @param ev The event.
     */
    onplaying?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onpointercancel?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    onpointerdown?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    onpointerenter?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    onpointerleave?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    onpointermove?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    onpointerout?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    onpointerover?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    onpointerup?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: PointerEvent) => any) | null;
    /**
     * Occurs to indicate progress while downloading media data.
     * @param ev The event.
     */
    onprogress?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: ProgressEvent) => any) | null;
    /**
     * Occurs when the playback rate is increased or decreased.
     * @param ev The event.
     */
    onratechange?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when the user resets a form.
     * @param ev The event.
     */
    onreset?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onresize?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: UIEvent) => any) | null;
    /**
     * Fires when the user repositions the scroll box in the scroll bar on the object.
     * @param ev The event.
     */
    onscroll?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onsecuritypolicyviolation?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: SecurityPolicyViolationEvent) => any) | null;
    /**
     * Occurs when the seek operation ends.
     * @param ev The event.
     */
    onseeked?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when the current playback position is moved.
     * @param ev The event.
     */
    onseeking?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Fires when the current selection changes.
     * @param ev The event.
     */
    onselect?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onselectionchange?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onselectstart?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when the download has stopped.
     * @param ev The event.
     */
    onstalled?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onsubmit?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs if the load operation has been intentionally halted.
     * @param ev The event.
     */
    onsuspend?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs to indicate the current playback position.
     * @param ev The event.
     */
    ontimeupdate?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    ontoggle?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    ontouchcancel?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TouchEvent) => any) | null;
    ontouchend?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TouchEvent) => any) | null;
    ontouchmove?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TouchEvent) => any) | null;
    ontouchstart?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TouchEvent) => any) | null;
    ontransitioncancel?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TransitionEvent) => any) | null;
    ontransitionend?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TransitionEvent) => any) | null;
    ontransitionrun?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TransitionEvent) => any) | null;
    ontransitionstart?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: TransitionEvent) => any) | null;
    /**
     * Occurs when the volume is changed, or playback is muted or unmuted.
     * @param ev The event.
     */
    onvolumechange?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    /**
     * Occurs when playback stops because the next frame of a video resource is not available.
     * @param ev The event.
     */
    onwaiting?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: Event) => any) | null;
    onwheel?: ((this: GlobalEventHandlers | (() => GlobalEventHandlers), ev: WheelEvent) => any) | null;
}

type CoponentChildrenType = ll.Component | (() => ll.Component);

export class Component<TContext> extends ll.Component {
    constructor(context: TContext, element?: string | HTMLElement, children?: CoponentChildrenType | (() => CoponentChildrenType)[]) {
        super(context, element, children);
    }
    awake(context: TContext) {
        return super.awake(context);
    }
    start(): void | (() => void) {
        return super.start();
    }
    stop(): void | (() => void) {
        return super.stop();
    }
    component(context: TContext)
    {
        return super.component(context);
    }
}

export function div(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.div(context, ...children);
}
export function span(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.span(context, ...children);
}
export function img(context: ComponentContextInterface | (() => ComponentContextInterface)) {
    return ll.img(context);
}
export function form(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.form(context, ...children);
}
export function inputText(context: ComponentContextInterface | (() => ComponentContextInterface)) {
    return ll.inputText(context);
}
export function inputSubmit(context: ComponentContextInterface | (() => ComponentContextInterface)) {
    return ll.inputSubmit(context);
}
export function checkbox(context: ComponentContextInterface | (() => ComponentContextInterface)) {
    return ll.checkbox(context);
}
export function radio(context: ComponentContextInterface | (() => ComponentContextInterface)) {
    return ll.radio(context);
}
export function label(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.label(context, ...children)
}
export function a(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.a(context, ...children);
}

export function h1(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.h1(context, ...children);
}

export function h2(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.h2(context, ...children);
}
export function h3(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.h3(context, ...children);
}
export function h4(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.h4(context, ...children);
}
export function h5(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.h5(context, ...children);
}
export function h6(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.h6(context, ...children);
}

export function table(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.table(context, ...children);
}
export function thead(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.thead(context, ...children);
}
export function tbody(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.tbody(context, ...children);
}
export function th(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.th(context, ...children);
}
export function td(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.td(context, ...children);
}
export function tr(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.tr(context, ...children);
}
export function p(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.p(context, ...children);
}
export function button(context: ComponentContextInterface | (() => ComponentContextInterface)) {
    return ll.button(context);
}

export function select(context: ComponentContextInterface | (() => ComponentContextInterface) & { options: { text: string | (() => string), value: any | (() => any) }[], value: any | (() => any) }) {
    return ll.select(context);
}

export function iframe(context: ComponentContextInterface | (() => ComponentContextInterface), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.iframe(context, ...children)
}
export function list<TData>(context: { data: TData | (() => TData)[], component: (data: TData | (() => TData)) => (Component | Component[]) }) {
    return ll.list(context);
}
export function mount(element: HTMLElement | (() => HTMLElement), ...children: CoponentChildrenType | (() => CoponentChildrenType)[]) {
    return ll.mount(element, ...children);
}

export function useStore<T>(data: T): T {
    return ll.useStore(data);
}
export function updateN() {
    return ll.updateN();
}