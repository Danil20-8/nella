// Type definitions for Nella JSX
// The document is adapted version of React type definitions for Nella

export function createElement(tagName: string, props, ...children): JSX.Element;
export function Fragment(): JSX.Element[];

declare namespace __Nella {

    type numberProp = number | (() => number);
    type stringProp = string | (() => string);
    type booleanProp = boolean | (() => boolean);
    type anyProp = any | (() => any);

    //
    // Event System
    // ----------------------------------------------------------------------

    interface SyntheticEvent {
        bubbles: boolean;
        cancelable: boolean;
        currentTarget: EventTarget;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        nativeEvent: Event;
        preventDefault(): void;
        stopPropagation(): void;
        target: EventTarget;
        timeStamp: Date;
        type: string;
    }

    interface ClipboardEvent extends SyntheticEvent {
        clipboardData: DataTransfer;
    }

    interface CompositionEvent extends SyntheticEvent {
        data: string;
    }

    interface DragEvent extends SyntheticEvent {
        dataTransfer: DataTransfer;
    }

    interface FocusEvent extends SyntheticEvent {
        relatedTarget: EventTarget;
    }

    interface FormEvent extends SyntheticEvent {
    }

    interface KeyboardEvent extends SyntheticEvent {
        altKey: boolean;
        charCode: number;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        key: string;
        keyCode: number;
        locale: string;
        location: number;
        metaKey: boolean;
        repeat: boolean;
        shiftKey: boolean;
        which: number;
    }

    interface MouseEvent extends SyntheticEvent {
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: number;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
    }

    interface TouchEvent extends SyntheticEvent {
        altKey: boolean;
        changedTouches: TouchList;
        ctrlKey: boolean;
        getModifierState(key: string): boolean;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: TouchList;
        touches: TouchList;
    }

    interface UIEvent extends SyntheticEvent {
        detail: number;
        view: AbstractView;
    }

    interface WheelEvent extends SyntheticEvent {
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
    }

    //
    // Event Handler Types
    // ----------------------------------------------------------------------

    interface EventHandler<E extends SyntheticEvent> {
        (event: E): void;
    }

    type NellaEventHandler = EventHandler<SyntheticEvent>;

    type ClipboardEventHandler = EventHandler<ClipboardEvent>;
    type CompositionEventHandler = EventHandler<CompositionEvent>;
    type DragEventHandler = EventHandler<DragEvent>;
    type FocusEventHandler = EventHandler<FocusEvent>;
    type FormEventHandler = EventHandler<FormEvent>;
    type KeyboardEventHandler = EventHandler<KeyboardEvent>;
    type MouseEventHandler = EventHandler<MouseEvent>;
    type TouchEventHandler = EventHandler<TouchEvent>;
    type UIEventHandler = EventHandler<UIEvent>;
    type WheelEventHandler = EventHandler<WheelEvent>;

    //
    // Props / DOM Attributes
    // ----------------------------------------------------------------------

    interface HTMLProps<T> extends HTMLAttributes {
    }

    interface SVGProps extends SVGAttributes {
    }

    interface DOMAttributes {
        // Clipboard Events
        oncopy?: ClipboardEventHandler;
        oncut?: ClipboardEventHandler;
        onpaste?: ClipboardEventHandler;

        // Composition Events
        oncompositionend?: CompositionEventHandler;
        oncompositionstart?: CompositionEventHandler;
        oncompositionupdate?: CompositionEventHandler;

        // Focus Events
        onfocus?: FocusEventHandler;
        onblur?: FocusEventHandler;

        // Form Events
        onchange?: FormEventHandler;
        oninput?: FormEventHandler;
        onsubmit?: FormEventHandler;

        // Image Events
        onload?: NellaEventHandler;
        onerror?: NellaEventHandler; // also a Media Event

        // Keyboard Events
        onkeydown?: KeyboardEventHandler;
        onkeypress?: KeyboardEventHandler;
        onkeyup?: KeyboardEventHandler;

        // Media Events
        onabort?: NellaEventHandler;
        oncanplay?: NellaEventHandler;
        oncanplaythrough?: NellaEventHandler;
        ondurationchange?: NellaEventHandler;
        onemptied?: NellaEventHandler;
        onencrypted?: NellaEventHandler;
        onended?: NellaEventHandler;
        onloadeddata?: NellaEventHandler;
        onloadedmetadata?: NellaEventHandler;
        onloadstart?: NellaEventHandler;
        onpause?: NellaEventHandler;
        onplay?: NellaEventHandler;
        onplaying?: NellaEventHandler;
        onprogress?: NellaEventHandler;
        onratechange?: NellaEventHandler;
        onseeked?: NellaEventHandler;
        onseeking?: NellaEventHandler;
        onstalled?: NellaEventHandler;
        onsuspend?: NellaEventHandler;
        ontimeupdate?: NellaEventHandler;
        onvolumechange?: NellaEventHandler;
        onwaiting?: NellaEventHandler;

        // MouseEvents
        onclick?: MouseEventHandler;
        oncontextmenu?: MouseEventHandler;
        ondoubleclick?: MouseEventHandler;
        ondrag?: DragEventHandler;
        ondragend?: DragEventHandler;
        ondragenter?: DragEventHandler;
        ondragexit?: DragEventHandler;
        ondragleave?: DragEventHandler;
        ondragover?: DragEventHandler;
        ondragstart?: DragEventHandler;
        ondrop?: DragEventHandler;
        onmousedown?: MouseEventHandler;
        onmouseenter?: MouseEventHandler;
        onmouseleave?: MouseEventHandler;
        onmousemove?: MouseEventHandler;
        onmouseout?: MouseEventHandler;
        onmouseover?: MouseEventHandler;
        onmouseup?: MouseEventHandler;

        // Selection Events
        onselect?: NellaEventHandler;

        // Touch Events
        ontouchcancel?: TouchEventHandler;
        ontouchend?: TouchEventHandler;
        ontouchmove?: TouchEventHandler;
        ontouchstart?: TouchEventHandler;

        // UI Events
        onscroll?: UIEventHandler;

        // Wheel Events
        onwheel?: WheelEventHandler;
    }

    interface HTMLAttributes extends DOMAttributes {
        // Standard HTML Attributes
        accept?: stringProp;
        acceptCharset?: stringProp;
        accessKey?: stringProp;
        action?: stringProp;
        allowFullScreen?: booleanProp;
        allowTransparency?: booleanProp;
        alt?: stringProp;
        async?: booleanProp;
        autoComplete?: stringProp;
        autoFocus?: booleanProp;
        autoPlay?: booleanProp;
        capture?: booleanProp;
        cellPadding?: numberProp | stringProp;
        cellSpacing?: numberProp | stringProp;
        charSet?: stringProp;
        challenge?: stringProp;
        checked?: booleanProp;
        classID?: stringProp;
        className?: stringProp;
        cols?: numberProp;
        colSpan?: numberProp;
        content?: stringProp;
        contentEditable?: booleanProp;
        contextMenu?: stringProp;
        controls?: booleanProp;
        coords?: stringProp;
        crossOrigin?: stringProp;
        data?: stringProp;
        dateTime?: stringProp;
        default?: booleanProp;
        defer?: booleanProp;
        dir?: stringProp;
        disabled?: booleanProp;
        download?: anyProp;
        draggable?: booleanProp;
        encType?: stringProp;
        form?: stringProp;
        formAction?: stringProp;
        formEncType?: stringProp;
        formMethod?: stringProp;
        formNoValidate?: booleanProp;
        formTarget?: stringProp;
        frameBorder?: numberProp | stringProp;
        headers?: stringProp;
        height?: numberProp | stringProp;
        hidden?: booleanProp;
        high?: numberProp;
        href?: stringProp;
        hrefLang?: stringProp;
        htmlFor?: stringProp;
        httpEquiv?: stringProp;
        icon?: stringProp;
        id?: stringProp;
        inputMode?: stringProp;
        integrity?: stringProp;
        is?: stringProp;
        keyParams?: stringProp;
        keyType?: stringProp;
        kind?: stringProp;
        label?: stringProp;
        lang?: stringProp;
        list?: stringProp;
        loop?: booleanProp;
        low?: numberProp;
        manifest?: stringProp;
        marginHeight?: numberProp;
        marginWidth?: numberProp;
        max?: numberProp | stringProp;
        maxLength?: numberProp;
        media?: stringProp;
        mediaGroup?: stringProp;
        method?: stringProp;
        min?: numberProp | stringProp;
        minLength?: numberProp;
        multiple?: booleanProp;
        muted?: booleanProp;
        name?: stringProp;
        noValidate?: booleanProp;
        open?: booleanProp;
        optimum?: numberProp;
        pattern?: stringProp;
        placeholder?: stringProp;
        poster?: stringProp;
        preload?: stringProp;
        radioGroup?: stringProp;
        readOnly?: booleanProp;
        rel?: stringProp;
        required?: booleanProp;
        role?: stringProp;
        rows?: numberProp;
        rowSpan?: numberProp;
        sandbox?: stringProp;
        scope?: stringProp;
        scoped?: booleanProp;
        scrolling?: stringProp;
        seamless?: booleanProp;
        selected?: booleanProp;
        shape?: stringProp;
        size?: numberProp;
        sizes?: stringProp;
        span?: numberProp;
        spellCheck?: booleanProp;
        src?: stringProp;
        srcDoc?: stringProp;
        srcLang?: stringProp;
        srcSet?: stringProp;
        start?: numberProp;
        step?: numberProp | stringProp;
        style?: stringProp;
        summary?: stringProp;
        tabIndex?: numberProp;
        target?: stringProp;
        title?: stringProp;
        type?: stringProp;
        useMap?: stringProp;
        value?: stringProp | numberProp | string[] | (() => string[]);
        width?: numberProp | stringProp;
        wmode?: stringProp;
        wrap?: stringProp;

        // RDFa Attributes
        about?: stringProp;
        datatype?: stringProp;
        inlist?: anyProp;
        prefix?: stringProp;
        property?: stringProp;
        resource?: stringProp;
        typeof?: stringProp;
        vocab?: stringProp;

        // Non-standard Attributes
        autoCapitalize?: booleanProp;
        autoCorrect?: stringProp;
        autoSave?: stringProp;
        color?: stringProp;
        itemProp?: stringProp;
        itemScope?: booleanProp;
        itemType?: stringProp;
        itemID?: stringProp;
        itemRef?: stringProp;
        results?: numberProp;
        security?: stringProp;
        unselectable?: booleanProp;
    }

    interface SVGAttributes extends HTMLAttributes {
        clipPath?: stringProp;
        cx?: numberProp | stringProp;
        cy?: numberProp | stringProp;
        d?: stringProp;
        dx?: numberProp | stringProp;
        dy?: numberProp | stringProp;
        fill?: stringProp;
        fillOpacity?: numberProp | stringProp;
        fontFamily?: stringProp;
        fontSize?: numberProp | stringProp;
        fx?: numberProp | stringProp;
        fy?: numberProp | stringProp;
        gradientTransform?: stringProp;
        gradientUnits?: stringProp;
        markerEnd?: stringProp;
        markerMid?: stringProp;
        markerStart?: stringProp;
        offset?: numberProp | stringProp;
        opacity?: numberProp | stringProp;
        patternContentUnits?: stringProp;
        patternUnits?: stringProp;
        points?: stringProp;
        preserveAspectRatio?: stringProp;
        r?: numberProp | stringProp;
        rx?: numberProp | stringProp;
        ry?: numberProp | stringProp;
        spreadMethod?: stringProp;
        stopColor?: stringProp;
        stopOpacity?: numberProp | stringProp;
        stroke?: stringProp;
        strokeDasharray?: stringProp;
        strokeLinecap?: stringProp;
        strokeMiterlimit?: stringProp;
        strokeOpacity?: numberProp | stringProp;
        strokeWidth?: numberProp | stringProp;
        textAnchor?: stringProp;
        transform?: stringProp;
        version?: stringProp;
        viewBox?: stringProp;
        x1?: numberProp | stringProp;
        x2?: numberProp | stringProp;
        x?: numberProp | stringProp;
        xlinkActuate?: stringProp;
        xlinkArcrole?: stringProp;
        xlinkHref?: stringProp;
        xlinkRole?: stringProp;
        xlinkShow?: stringProp;
        xlinkTitle?: stringProp;
        xlinkType?: stringProp;
        xmlBase?: stringProp;
        xmlLang?: stringProp;
        xmlSpace?: stringProp;
        y1?: numberProp | stringProp;
        y2?: numberProp | stringProp;
        y?: numberProp | stringProp;
    }

    //
    // Browser Interfaces
    // https://github.com/nikeee/2048-typescript/blob/master/2048/js/touch.d.ts
    // ----------------------------------------------------------------------

    interface AbstractView {
        styleMedia: StyleMedia;
        document: Document;
    }

    interface Touch {
        identifier: number;
        target: EventTarget;
        screenX: number;
        screenY: number;
        clientX: number;
        clientY: number;
        pageX: number;
        pageY: number;
    }

    interface TouchList {
        [index: number]: Touch;
        length: number;
        item(index: number): Touch;
        identifiedTouch(identifier: number): Touch;
    }
}

declare module "Nella" {
    export = __Nella;
}

declare namespace JSX {
    import Nella = __Nella;

    interface Element {
        getElement<T =HTMLAnchorElement |
        HTMLAppletElement |
        HTMLAreaElement |
        HTMLAudioElement |
        HTMLBRElement |
        HTMLBaseElement |
        HTMLBaseFontElement |
        HTMLBodyElement |
        HTMLButtonElement |
        HTMLCanvasElement |
        HTMLDListElement |
        HTMLDataElement |
        HTMLDataListElement |
        HTMLDetailsElement |
        HTMLDialogElement |
        HTMLDirectoryElement |
        HTMLDivElement |
        HTMLEmbedElement |
        HTMLFieldSetElement |
        HTMLFontElement |
        HTMLFormElement |
        HTMLFrameElement |
        HTMLFrameSetElement |
        HTMLHRElement |
        HTMLHeadElement |
        HTMLHeadingElement |
        HTMLHtmlElement |
        HTMLIFrameElement |
        HTMLImageElement |
        HTMLInputElement |
        HTMLLIElement |
        HTMLLabelElement |
        HTMLLegendElement |
        HTMLLinkElement |
        HTMLMapElement |
        HTMLMarqueeElement |
        HTMLMediaElement |
        HTMLMenuElement |
        HTMLMetaElement |
        HTMLMeterElement |
        HTMLModElement |
        HTMLOListElement |
        HTMLObjectElement |
        HTMLOptGroupElement |
        HTMLOptionElement |
        HTMLOrSVGElement |
        HTMLOutputElement |
        HTMLParagraphElement |
        HTMLParamElement |
        HTMLPictureElement |
        HTMLPreElement |
        HTMLProgressElement |
        HTMLQuoteElement |
        HTMLScriptElement |
        HTMLSelectElement |
        HTMLSlotElement |
        HTMLSourceElement |
        HTMLSpanElement |
        HTMLStyleElement |
        HTMLTableCaptionElement |
        HTMLTableCellElement |
        HTMLTableColElement |
        HTMLTableDataCellElement |
        HTMLTableElement |
        HTMLTableHeaderCellElement |
        HTMLTableRowElement |
        HTMLTableSectionElement |
        HTMLTemplateElement |
        HTMLTextAreaElement |
        HTMLTimeElement |
        HTMLTitleElement |
        HTMLTrackElement |
        HTMLUListElement |
        HTMLUnknownElement |
        HTMLVideoElement | Node
        >(): T | null;
    }
    interface ElementClass {
    }
    interface ElementAttributesProperty { props: {}; }

    interface IntrinsicAttributes {
        key?: string | number;
    }

    interface IntrinsicClassAttributes<T> {
        ref?: string | ((classInstance: T) => void);
    }

    interface IntrinsicElements {
        // HTML
        a: Nella.HTMLProps<HTMLAnchorElement>;
        abbr: Nella.HTMLProps<HTMLElement>;
        address: Nella.HTMLProps<HTMLElement>;
        area: Nella.HTMLProps<HTMLAreaElement>;
        article: Nella.HTMLProps<HTMLElement>;
        aside: Nella.HTMLProps<HTMLElement>;
        audio: Nella.HTMLProps<HTMLAudioElement>;
        b: Nella.HTMLProps<HTMLElement>;
        base: Nella.HTMLProps<HTMLBaseElement>;
        bdi: Nella.HTMLProps<HTMLElement>;
        bdo: Nella.HTMLProps<HTMLElement>;
        big: Nella.HTMLProps<HTMLElement>;
        blockquote: Nella.HTMLProps<HTMLElement>;
        body: Nella.HTMLProps<HTMLBodyElement>;
        br: Nella.HTMLProps<HTMLBRElement>;
        button: Nella.HTMLProps<HTMLButtonElement>;
        canvas: Nella.HTMLProps<HTMLCanvasElement>;
        caption: Nella.HTMLProps<HTMLElement>;
        cite: Nella.HTMLProps<HTMLElement>;
        code: Nella.HTMLProps<HTMLElement>;
        col: Nella.HTMLProps<HTMLTableColElement>;
        colgroup: Nella.HTMLProps<HTMLTableColElement>;
        data: Nella.HTMLProps<HTMLElement>;
        datalist: Nella.HTMLProps<HTMLDataListElement>;
        dd: Nella.HTMLProps<HTMLElement>;
        del: Nella.HTMLProps<HTMLElement>;
        details: Nella.HTMLProps<HTMLElement>;
        dfn: Nella.HTMLProps<HTMLElement>;
        dialog: Nella.HTMLProps<HTMLElement>;
        div: Nella.HTMLProps<HTMLDivElement>;
        dl: Nella.HTMLProps<HTMLDListElement>;
        dt: Nella.HTMLProps<HTMLElement>;
        em: Nella.HTMLProps<HTMLElement>;
        embed: Nella.HTMLProps<HTMLEmbedElement>;
        fieldset: Nella.HTMLProps<HTMLFieldSetElement>;
        figcaption: Nella.HTMLProps<HTMLElement>;
        figure: Nella.HTMLProps<HTMLElement>;
        footer: Nella.HTMLProps<HTMLElement>;
        form: Nella.HTMLProps<HTMLFormElement>;
        h1: Nella.HTMLProps<HTMLHeadingElement>;
        h2: Nella.HTMLProps<HTMLHeadingElement>;
        h3: Nella.HTMLProps<HTMLHeadingElement>;
        h4: Nella.HTMLProps<HTMLHeadingElement>;
        h5: Nella.HTMLProps<HTMLHeadingElement>;
        h6: Nella.HTMLProps<HTMLHeadingElement>;
        head: Nella.HTMLProps<HTMLHeadElement>;
        header: Nella.HTMLProps<HTMLElement>;
        hr: Nella.HTMLProps<HTMLHRElement>;
        html: Nella.HTMLProps<HTMLHtmlElement>;
        i: Nella.HTMLProps<HTMLElement>;
        iframe: Nella.HTMLProps<HTMLIFrameElement>;
        img: Nella.HTMLProps<HTMLImageElement>;
        input: Nella.HTMLProps<HTMLInputElement>;
        ins: Nella.HTMLProps<HTMLModElement>;
        kbd: Nella.HTMLProps<HTMLElement>;
        keygen: Nella.HTMLProps<HTMLElement>;
        label: Nella.HTMLProps<HTMLLabelElement>;
        legend: Nella.HTMLProps<HTMLLegendElement>;
        li: Nella.HTMLProps<HTMLLIElement>;
        link: Nella.HTMLProps<HTMLLinkElement>;
        main: Nella.HTMLProps<HTMLElement>;
        map: Nella.HTMLProps<HTMLMapElement>;
        mark: Nella.HTMLProps<HTMLElement>;
        menu: Nella.HTMLProps<HTMLElement>;
        menuitem: Nella.HTMLProps<HTMLElement>;
        meta: Nella.HTMLProps<HTMLMetaElement>;
        meter: Nella.HTMLProps<HTMLElement>;
        nav: Nella.HTMLProps<HTMLElement>;
        noscript: Nella.HTMLProps<HTMLElement>;
        object: Nella.HTMLProps<HTMLObjectElement>;
        ol: Nella.HTMLProps<HTMLOListElement>;
        optgroup: Nella.HTMLProps<HTMLOptGroupElement>;
        option: Nella.HTMLProps<HTMLOptionElement>;
        output: Nella.HTMLProps<HTMLElement>;
        p: Nella.HTMLProps<HTMLParagraphElement>;
        param: Nella.HTMLProps<HTMLParamElement>;
        picture: Nella.HTMLProps<HTMLElement>;
        pre: Nella.HTMLProps<HTMLPreElement>;
        progress: Nella.HTMLProps<HTMLProgressElement>;
        q: Nella.HTMLProps<HTMLQuoteElement>;
        rp: Nella.HTMLProps<HTMLElement>;
        rt: Nella.HTMLProps<HTMLElement>;
        ruby: Nella.HTMLProps<HTMLElement>;
        s: Nella.HTMLProps<HTMLElement>;
        samp: Nella.HTMLProps<HTMLElement>;
        script: Nella.HTMLProps<HTMLElement>;
        section: Nella.HTMLProps<HTMLElement>;
        select: Nella.HTMLProps<HTMLSelectElement>;
        small: Nella.HTMLProps<HTMLElement>;
        source: Nella.HTMLProps<HTMLSourceElement>;
        span: Nella.HTMLProps<HTMLSpanElement>;
        strong: Nella.HTMLProps<HTMLElement>;
        style: Nella.HTMLProps<HTMLStyleElement>;
        sub: Nella.HTMLProps<HTMLElement>;
        summary: Nella.HTMLProps<HTMLElement>;
        sup: Nella.HTMLProps<HTMLElement>;
        table: Nella.HTMLProps<HTMLTableElement>;
        tbody: Nella.HTMLProps<HTMLTableSectionElement>;
        td: Nella.HTMLProps<HTMLTableDataCellElement>;
        textarea: Nella.HTMLProps<HTMLTextAreaElement>;
        tfoot: Nella.HTMLProps<HTMLTableSectionElement>;
        th: Nella.HTMLProps<HTMLTableHeaderCellElement>;
        thead: Nella.HTMLProps<HTMLTableSectionElement>;
        time: Nella.HTMLProps<HTMLElement>;
        title: Nella.HTMLProps<HTMLTitleElement>;
        tr: Nella.HTMLProps<HTMLTableRowElement>;
        track: Nella.HTMLProps<HTMLTrackElement>;
        u: Nella.HTMLProps<HTMLElement>;
        ul: Nella.HTMLProps<HTMLUListElement>;
        "var": Nella.HTMLProps<HTMLElement>;
        video: Nella.HTMLProps<HTMLVideoElement>;
        wbr: Nella.HTMLProps<HTMLElement>;

        // SVG
        svg: Nella.SVGProps;

        circle: Nella.SVGProps;
        defs: Nella.SVGProps;
        ellipse: Nella.SVGProps;
        g: Nella.SVGProps;
        image: Nella.SVGProps;
        line: Nella.SVGProps;
        linearGradient: Nella.SVGProps;
        mask: Nella.SVGProps;
        path: Nella.SVGProps;
        pattern: Nella.SVGProps;
        polygon: Nella.SVGProps;
        polyline: Nella.SVGProps;
        radialGradient: Nella.SVGProps;
        rect: Nella.SVGProps;
        stop: Nella.SVGProps;
        text: Nella.SVGProps;
        tspan: Nella.SVGProps;
    }
}
