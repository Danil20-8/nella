// Type definitions for Nella JSX
// The document is adapted version of Nella type definitions for Nella

export function createElement(tagName: string, props, ...children): JSX.Element;
export function Fragment(): JSX.Element[];

declare namespace __Nella {

    type numberProp = number | (() => number);
    type stringProp = string | (() => string);
    type booleanProp = boolean | (() => boolean);
    type anyProp = any | (() => any);

    //
    // Event Handler Types
    // ----------------------------------------------------------------------

    interface EventHandler<E extends Event> {
        (event: E): void;
    }

    type NellaEventHandler = EventHandler<Event>;

    type ClipboardEventHandler = EventHandler<ClipboardEvent>;
    type CompositionEventHandler = EventHandler<CompositionEvent>;
    type DragEventHandler = EventHandler<DragEvent>;
    type FocusEventHandler = EventHandler<FocusEvent>;
    type FormEventHandler = EventHandler<Event>;
    type KeyboardEventHandler = EventHandler<KeyboardEvent>;
    type MouseEventHandler = EventHandler<MouseEvent>;
    type PointerEventHandler = EventHandler<PointerEvent>;
    type TouchEventHandler = EventHandler<TouchEvent>;
    type UIEventHandler = EventHandler<UIEvent>;
    type WheelEventHandler = EventHandler<WheelEvent>;
    type AnimationEventHandler = EventHandler<AnimationEvent>;
    type TransitionEventHandler = EventHandler<TransitionEvent>;
    //
    // Props / DOM Attributes
    // ----------------------------------------------------------------------

    interface HTMLProps extends HTMLAttributes {
    }

    interface SVGProps extends SVGAttributes {
    }

    interface DOMAttributes {
        // Clipboard Events
        oncopy?: ClipboardEventHandler;
        oncopycapture?: ClipboardEventHandler;
        oncut?: ClipboardEventHandler;
        oncutcapture?: ClipboardEventHandler;
        onpaste?: ClipboardEventHandler;
        onpastecapture?: ClipboardEventHandler;

        // Composition Events
        oncompositionend?: CompositionEventHandler;
        oncompositionendcapture?: CompositionEventHandler;
        oncompositionstart?: CompositionEventHandler;
        oncompositionstartcapture?: CompositionEventHandler;
        oncompositionupdate?: CompositionEventHandler;
        oncompositionupdatecapture?: CompositionEventHandler;

        // Focus Events
        onfocus?: FocusEventHandler;
        onfocuscapture?: FocusEventHandler;
        onblur?: FocusEventHandler;
        onblurcapture?: FocusEventHandler;

        // Form Events
        onchange?: FormEventHandler;
        onchangecapture?: FormEventHandler;
        onbeforeinput?: FormEventHandler;
        onbeforeinputcapture?: FormEventHandler;
        oninput?: FormEventHandler;
        oninputcapture?: FormEventHandler;
        onreset?: FormEventHandler;
        onresetcapture?: FormEventHandler;
        onsubmit?: FormEventHandler;
        onsubmitcapture?: FormEventHandler;
        oninvalid?: FormEventHandler;
        oninvalidcapture?: FormEventHandler;

        // Image Events
        onload?: NellaEventHandler;
        onloadcapture?: NellaEventHandler;
        onerror?: NellaEventHandler; // also a Media Event
        onerrorcapture?: NellaEventHandler; // also a Media Event

        // Keyboard Events
        onkeydown?: KeyboardEventHandler;
        onkeydowncapture?: KeyboardEventHandler;
        onkeypress?: KeyboardEventHandler;
        onkeypresscapture?: KeyboardEventHandler;
        onkeyup?: KeyboardEventHandler;
        onkeyupcapture?: KeyboardEventHandler;

        // Media Events
        onabort?: NellaEventHandler;
        onabortcapture?: NellaEventHandler;
        oncanplay?: NellaEventHandler;
        oncanplaycapture?: NellaEventHandler;
        oncanplaythrough?: NellaEventHandler;
        oncanplaythroughcapture?: NellaEventHandler;
        ondurationchange?: NellaEventHandler;
        ondurationchangecapture?: NellaEventHandler;
        onemptied?: NellaEventHandler;
        onemptiedcapture?: NellaEventHandler;
        onencrypted?: NellaEventHandler;
        onencryptedcapture?: NellaEventHandler;
        onended?: NellaEventHandler;
        onendedcapture?: NellaEventHandler;
        onloadeddata?: NellaEventHandler;
        onloadeddatacapture?: NellaEventHandler;
        onloadedmetadata?: NellaEventHandler;
        onloadedmetadatacapture?: NellaEventHandler;
        onloadstart?: NellaEventHandler;
        onloadstartcapture?: NellaEventHandler;
        onpause?: NellaEventHandler;
        onpausecapture?: NellaEventHandler;
        onplay?: NellaEventHandler;
        onplaycapture?: NellaEventHandler;
        onplaying?: NellaEventHandler;
        onplayingcapture?: NellaEventHandler;
        onprogress?: NellaEventHandler;
        onprogresscapture?: NellaEventHandler;
        onratechange?: NellaEventHandler;
        onratechangecapture?: NellaEventHandler;
        onseeked?: NellaEventHandler;
        onseekedcapture?: NellaEventHandler;
        onseeking?: NellaEventHandler;
        onseekingcapture?: NellaEventHandler;
        onstalled?: NellaEventHandler;
        onstalledcapture?: NellaEventHandler;
        onsuspend?: NellaEventHandler;
        onsuspendcapture?: NellaEventHandler;
        ontimeupdate?: NellaEventHandler;
        ontimeupdatecapture?: NellaEventHandler;
        onvolumechange?: NellaEventHandler;
        onvolumechangecapture?: NellaEventHandler;
        onwaiting?: NellaEventHandler;
        onwaitingcapture?: NellaEventHandler;

        // MouseEvents
        onauxclick?: MouseEventHandler;
        onauxclickcapture?: MouseEventHandler;
        onclick?: MouseEventHandler;
        onclickcapture?: MouseEventHandler;
        oncontextmenu?: MouseEventHandler;
        oncontextmenucapture?: MouseEventHandler;
        ondoubleclick?: MouseEventHandler;
        ondoubleclickcapture?: MouseEventHandler;
        ondrag?: DragEventHandler;
        ondragcapture?: DragEventHandler;
        ondragend?: DragEventHandler;
        ondragendcapture?: DragEventHandler;
        ondragenter?: DragEventHandler;
        ondragentercapture?: DragEventHandler;
        ondragexit?: DragEventHandler;
        ondragexitcapture?: DragEventHandler;
        ondragleave?: DragEventHandler;
        ondragleavecapture?: DragEventHandler;
        ondragover?: DragEventHandler;
        ondragovercapture?: DragEventHandler;
        ondragstart?: DragEventHandler;
        ondragstartcapture?: DragEventHandler;
        ondrop?: DragEventHandler;
        ondropcapture?: DragEventHandler;
        onmousedown?: MouseEventHandler;
        onmousedowncapture?: MouseEventHandler;
        onmouseenter?: MouseEventHandler;
        onmouseleave?: MouseEventHandler;
        onmousemove?: MouseEventHandler;
        onmousemovecapture?: MouseEventHandler;
        onmouseout?: MouseEventHandler;
        onmouseoutcapture?: MouseEventHandler;
        onmouseover?: MouseEventHandler;
        onmouseovercapture?: MouseEventHandler;
        onmouseup?: MouseEventHandler;
        onmouseupcapture?: MouseEventHandler;

        // Selection Events
        onselect?: NellaEventHandler;
        onselectcapture?: NellaEventHandler;

        // Touch Events
        ontouchcancel?: TouchEventHandler;
        ontouchcancelcapture?: TouchEventHandler;
        ontouchend?: TouchEventHandler;
        ontouchendcapture?: TouchEventHandler;
        ontouchmove?: TouchEventHandler;
        ontouchmovecapture?: TouchEventHandler;
        ontouchstart?: TouchEventHandler;
        ontouchstartcapture?: TouchEventHandler;

        // Pointer Events
        onpointerdown?: PointerEventHandler;
        onpointerdowncapture?: PointerEventHandler;
        onpointermove?: PointerEventHandler;
        onpointermovecapture?: PointerEventHandler;
        onpointerup?: PointerEventHandler;
        onpointerupcapture?: PointerEventHandler;
        onpointercancel?: PointerEventHandler;
        onpointercancelcapture?: PointerEventHandler;
        onpointerenter?: PointerEventHandler;
        onpointerentercapture?: PointerEventHandler;
        onpointerleave?: PointerEventHandler;
        onpointerleavecapture?: PointerEventHandler;
        onpointerover?: PointerEventHandler;
        onpointerovercapture?: PointerEventHandler;
        onpointerout?: PointerEventHandler;
        onpointeroutcapture?: PointerEventHandler;
        ongotpointercapture?: PointerEventHandler;
        ongotpointercapturecapture?: PointerEventHandler;
        onlostpointercapture?: PointerEventHandler;
        onlostpointercapturecapture?: PointerEventHandler;

        // UI Events
        onscroll?: UIEventHandler;
        onscrollcapture?: UIEventHandler;

        // Wheel Events
        onwheel?: WheelEventHandler;
        onwheelcapture?: WheelEventHandler;

        // Animation Events
        onanimationstart?: AnimationEventHandler;
        onanimationstartcapture?: AnimationEventHandler;
        onanimationend?: AnimationEventHandler;
        onanimationendcapture?: AnimationEventHandler;
        onanimationiteration?: AnimationEventHandler;
        onanimationiterationcapture?: AnimationEventHandler;

        // Transition Events
        ontransitionend?: TransitionEventHandler;
        ontransitionendcapture?: TransitionEventHandler;
    }

    interface HTMLAttributes extends DOMAttributes {
        // Standard HTML Attributes
        accessKey?: stringProp;
        className?: stringProp;
        contenteditable?: booleanProp | "inherit" | (() => "inherit" | boolean);
        contextmenu?: stringProp;
        dir?: stringProp;
        draggable?: booleanProp;
        hidden?: booleanProp;
        id?: stringProp;
        lang?: stringProp;
        slot?: stringProp;
        spellCheck?: booleanProp;
        style?: stringProp;
        tabIndex?: numberProp;
        title?: stringProp;
        translate?: 'yes' | 'no' | (() => 'yes' | 'no');
        accept?: stringProp;
        acceptCharset?: stringProp;
        action?: stringProp;
        allowFullScreen?: booleanProp;
        allowTransparency?: booleanProp;
        alt?: stringProp;
        as?: stringProp;
        async?: booleanProp;
        autoComplete?: stringProp;
        autoFocus?: booleanProp;
        autoPlay?: booleanProp;
        capture?: booleanProp | stringProp;
        cellPadding?: numberProp | stringProp;
        cellSpacing?: numberProp | stringProp;
        charSet?: stringProp;
        challenge?: stringProp;
        checked?: booleanProp;
        cite?: stringProp;
        classID?: stringProp;
        cols?: numberProp;
        colSpan?: numberProp;
        content?: stringProp;
        controls?: booleanProp;
        coords?: stringProp;
        crossOrigin?: stringProp;
        data?: stringProp;
        dateTime?: stringProp;
        default?: booleanProp;
        defer?: booleanProp;
        disabled?: booleanProp;
        download?: anyProp;
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
        high?: numberProp;
        href?: stringProp;
        hrefLang?: stringProp;
        htmlFor?: stringProp;
        httpEquiv?: stringProp;
        integrity?: stringProp;
        keyParams?: stringProp;
        keyType?: stringProp;
        kind?: stringProp;
        label?: stringProp;
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
        nonce?: stringProp;
        noValidate?: booleanProp;
        open?: booleanProp;
        optimum?: numberProp;
        pattern?: stringProp;
        placeholder?: stringProp;
        playsInline?: booleanProp;
        poster?: stringProp;
        preload?: stringProp;
        readonly?: booleanProp;
        rel?: stringProp;
        required?: booleanProp;
        reversed?: booleanProp;
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
        src?: stringProp;
        srcDoc?: stringProp;
        srcLang?: stringProp;
        srcSet?: stringProp;
        start?: numberProp;
        step?: numberProp | stringProp;
        summary?: stringProp;
        target?: stringProp;
        type?: stringProp;
        useMap?: stringProp;
        value?: stringProp | string[] | (() => string[]) | numberProp;
        width?: numberProp | stringProp;
        wmode?: stringProp;
        wrap?: stringProp;
    }

    interface SVGAttributes extends HTMLAttributes {
        // Attributes which also defined in HTMLAttributes
        // See comment in SVGDOMPropertyConfig.js
        className?: stringProp;
        color?: stringProp;
        height?: numberProp | stringProp;
        id?: stringProp;
        lang?: stringProp;
        max?: numberProp | stringProp;
        media?: stringProp;
        method?: stringProp;
        min?: numberProp | stringProp;
        name?: stringProp;
        style?: stringProp;
        target?: stringProp;
        type?: stringProp;
        width?: numberProp | stringProp;

        // Other HTML properties supported by SVG elements in browsers
        role?: stringProp;
        tabIndex?: numberProp;
        crossOrigin?: "anonymous" | "use-credentials" | "" | (() => "anonymous" | "use-credentials" | "");

        // SVG Specific attributes
        accentHeight?: numberProp | stringProp;
        accumulate?: "none" | "sum" | (() => "none" | "sum");
        additive?: "replace" | "sum" | (() => "replace" | "sum");
        alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
        "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" |
        (() => "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
            "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit");
        allowReorder?: "no" | "yes";
        alphabetic?: numberProp | stringProp;
        amplitude?: numberProp | stringProp;
        arabicForm?: "initial" | "medial" | "terminal" | "isolated" | (() => "initial" | "medial" | "terminal" | "isolated");
        ascent?: numberProp | stringProp;
        attributeName?: stringProp;
        attributeType?: stringProp;
        autoReverse?: booleanProp;
        azimuth?: numberProp | stringProp;
        baseFrequency?: numberProp | stringProp;
        baselineShift?: numberProp | stringProp;
        baseProfile?: numberProp | stringProp;
        bbox?: numberProp | stringProp;
        begin?: numberProp | stringProp;
        bias?: numberProp | stringProp;
        by?: numberProp | stringProp;
        calcMode?: numberProp | stringProp;
        capHeight?: numberProp | stringProp;
        clip?: numberProp | stringProp;
        clipPath?: stringProp;
        clipPathUnits?: numberProp | stringProp;
        clipRule?: numberProp | stringProp;
        colorInterpolation?: numberProp | stringProp;
        colorInterpolationfilters?: "auto" | "sRGB" | "linearRGB" | "inherit" | (() => "auto" | "sRGB" | "linearRGB" | "inherit");
        colorProfile?: numberProp | stringProp;
        colorRendering?: numberProp | stringProp;
        contentscripttype?: numberProp | stringProp;
        contentstyletype?: numberProp | stringProp;
        cursor?: numberProp | stringProp;
        cx?: numberProp | stringProp;
        cy?: numberProp | stringProp;
        d?: stringProp;
        decelerate?: numberProp | stringProp;
        descent?: numberProp | stringProp;
        diffuseConstant?: numberProp | stringProp;
        direction?: numberProp | stringProp;
        display?: numberProp | stringProp;
        divisor?: numberProp | stringProp;
        dominantBaseline?: numberProp | stringProp;
        dur?: numberProp | stringProp;
        dx?: numberProp | stringProp;
        dy?: numberProp | stringProp;
        edgeMode?: numberProp | stringProp;
        elevation?: numberProp | stringProp;
        enableBackground?: numberProp | stringProp;
        end?: numberProp | stringProp;
        exponent?: numberProp | stringProp;
        externalResourcesRequired?: booleanProp;
        fill?: stringProp;
        fillOpacity?: numberProp | stringProp;
        fillRule?: "nonzero" | "evenodd" | "inherit" | (() => "nonzero" | "evenodd" | "inherit");
        filter?: stringProp;
        filterRes?: numberProp | stringProp;
        filterUnits?: numberProp | stringProp;
        floodColor?: numberProp | stringProp;
        floodOpacity?: numberProp | stringProp;
        focusable?: booleanProp | "auto" | (() => boolean | "auto");
        fontfamily?: stringProp;
        fontsize?: numberProp | stringProp;
        fontsizeadjust?: numberProp | stringProp;
        fontstretch?: numberProp | stringProp;
        fontstyle?: numberProp | stringProp;
        fontvariant?: numberProp | stringProp;
        fontweight?: numberProp | stringProp;
        format?: numberProp | stringProp;
        from?: numberProp | stringProp;
        fx?: numberProp | stringProp;
        fy?: numberProp | stringProp;
        g1?: numberProp | stringProp;
        g2?: numberProp | stringProp;
        glyphName?: numberProp | stringProp;
        glyphOrientationhorizontal?: numberProp | stringProp;
        glyphOrientationvertical?: numberProp | stringProp;
        glyphRef?: numberProp | stringProp;
        gradientTransform?: stringProp;
        gradientUnits?: stringProp;
        hanging?: numberProp | stringProp;
        horizAdvX?: numberProp | stringProp;
        horizOriginX?: numberProp | stringProp;
        href?: stringProp;
        ideographic?: numberProp | stringProp;
        imageRendering?: numberProp | stringProp;
        in2?: numberProp | stringProp;
        in?: stringProp;
        intercept?: numberProp | stringProp;
        k1?: numberProp | stringProp;
        k2?: numberProp | stringProp;
        k3?: numberProp | stringProp;
        k4?: numberProp | stringProp;
        k?: numberProp | stringProp;
        kernelMatrix?: numberProp | stringProp;
        kernelUnitLength?: numberProp | stringProp;
        kerning?: numberProp | stringProp;
        keyPoints?: numberProp | stringProp;
        keySplines?: numberProp | stringProp;
        keyTimes?: numberProp | stringProp;
        lengthAdjust?: numberProp | stringProp;
        letterSpacing?: numberProp | stringProp;
        lightingColor?: numberProp | stringProp;
        limitingConeangle?: numberProp | stringProp;
        local?: numberProp | stringProp;
        markerEnd?: stringProp;
        markerHeight?: numberProp | stringProp;
        markerMid?: stringProp;
        markerStart?: stringProp;
        markerUnits?: numberProp | stringProp;
        markerWidth?: numberProp | stringProp;
        mask?: stringProp;
        maskContentunits?: numberProp | stringProp;
        maskUnits?: numberProp | stringProp;
        mathematical?: numberProp | stringProp;
        mode?: numberProp | stringProp;
        numOctaves?: numberProp | stringProp;
        offset?: numberProp | stringProp;
        opacity?: numberProp | stringProp;
        operator?: numberProp | stringProp;
        order?: numberProp | stringProp;
        orient?: numberProp | stringProp;
        orientation?: numberProp | stringProp;
        origin?: numberProp | stringProp;
        overflow?: numberProp | stringProp;
        overlinePosition?: numberProp | stringProp;
        overlineThickness?: numberProp | stringProp;
        paintOrder?: numberProp | stringProp;
        panose1?: numberProp | stringProp;
        pathLength?: numberProp | stringProp;
        patternContentunits?: stringProp;
        patternTransform?: numberProp | stringProp;
        patternUnits?: stringProp;
        pointerEvents?: numberProp | stringProp;
        points?: stringProp;
        pointsAtX?: numberProp | stringProp;
        pointsAtY?: numberProp | stringProp;
        pointsAtZ?: numberProp | stringProp;
        preserveAlpha?: booleanProp;
        preserveAspectRatio?: stringProp;
        primitiveUnits?: numberProp | stringProp;
        r?: numberProp | stringProp;
        radius?: numberProp | stringProp;
        refX?: numberProp | stringProp;
        refY?: numberProp | stringProp;
        renderingIntent?: numberProp | stringProp;
        repeatCount?: numberProp | stringProp;
        repeatDur?: numberProp | stringProp;
        requiredExtensions?: numberProp | stringProp;
        requiredFeatures?: numberProp | stringProp;
        restart?: numberProp | stringProp;
        result?: stringProp;
        rotate?: numberProp | stringProp;
        rx?: numberProp | stringProp;
        ry?: numberProp | stringProp;
        scale?: numberProp | stringProp;
        seed?: numberProp | stringProp;
        shapeRendering?: numberProp | stringProp;
        slope?: numberProp | stringProp;
        spacing?: numberProp | stringProp;
        specularConstant?: numberProp | stringProp;
        specularExponent?: numberProp | stringProp;
        speed?: numberProp | stringProp;
        spreadMethod?: stringProp;
        startOffset?: numberProp | stringProp;
        stdDeviation?: numberProp | stringProp;
        stemh?: numberProp | stringProp;
        stemv?: numberProp | stringProp;
        stitchTiles?: numberProp | stringProp;
        stopColor?: stringProp;
        stopOpacity?: numberProp | stringProp;
        strikethroughPosition?: numberProp | stringProp;
        strikethroughThickness?: numberProp | stringProp;
        string?: numberProp | stringProp;
        stroke?: stringProp;
        strokeDasharray?: stringProp | numberProp;
        strokeDashoffset?: stringProp | numberProp;
        strokeLinecap?: "butt" | "round" | "square" | "inherit" | (() => "butt" | "round" | "square" | "inherit");
        strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | (() => "miter" | "round" | "bevel" | "inherit");
        strokeMiterlimit?: numberProp | stringProp;
        strokeOpacity?: numberProp | stringProp;
        strokeWidth?: numberProp | stringProp;
        surfaceScale?: numberProp | stringProp;
        systemLanguage?: numberProp | stringProp;
        tableValues?: numberProp | stringProp;
        targetX?: numberProp | stringProp;
        targetY?: numberProp | stringProp;
        textAnchor?: stringProp;
        textDecoration?: numberProp | stringProp;
        textLength?: numberProp | stringProp;
        textRendering?: numberProp | stringProp;
        to?: numberProp | stringProp;
        transform?: stringProp;
        u1?: numberProp | stringProp;
        u2?: numberProp | stringProp;
        underlinePosition?: numberProp | stringProp;
        underlineThickness?: numberProp | stringProp;
        unicode?: numberProp | stringProp;
        unicodeBidi?: numberProp | stringProp;
        unicodeRange?: numberProp | stringProp;
        unitsPerEm?: numberProp | stringProp;
        vAlphabetic?: numberProp | stringProp;
        values?: stringProp;
        vectorEffect?: numberProp | stringProp;
        version?: stringProp;
        vertAdvY?: numberProp | stringProp;
        vertOriginX?: numberProp | stringProp;
        vertOriginY?: numberProp | stringProp;
        vHanging?: numberProp | stringProp;
        vIdeographic?: numberProp | stringProp;
        viewBox?: stringProp;
        viewTarget?: numberProp | stringProp;
        visibility?: numberProp | stringProp;
        vMathematical?: numberProp | stringProp;
        widths?: numberProp | stringProp;
        wordSpacing?: numberProp | stringProp;
        writingMode?: numberProp | stringProp;
        x1?: numberProp | stringProp;
        x2?: numberProp | stringProp;
        x?: numberProp | stringProp;
        xChannelSelector?: stringProp;
        xHeight?: numberProp | stringProp;
        xlinkActuate?: stringProp;
        xlinkArcrole?: stringProp;
        xlinkHref?: stringProp;
        xlinkRole?: stringProp;
        xlinkShow?: stringProp;
        xlinkTitle?: stringProp;
        xlinkType?: stringProp;
        xmlBase?: stringProp;
        xmlLang?: stringProp;
        xmlns?: stringProp;
        xmlnsXlink?: stringProp;
        xmlSpace?: stringProp;
        y1?: numberProp | stringProp;
        y2?: numberProp | stringProp;
        y?: numberProp | stringProp;
        yChannelSelector?: stringProp;
        z?: numberProp | stringProp;
        zoomAndPan?: stringProp;
    }
}

declare module "Nella" {
    export = __Nella;
}

declare namespace JSX {
    import Nella = __Nella;

    interface Element {
        getElement<T =
            HTMLElement |
            HTMLAnchorElement |
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
        a: Nella.HTMLProps;
        abbr: Nella.HTMLProps;
        address: Nella.HTMLProps;
        area: Nella.HTMLProps;
        article: Nella.HTMLProps;
        aside: Nella.HTMLProps;
        audio: Nella.HTMLProps;
        b: Nella.HTMLProps;
        base: Nella.HTMLProps;
        bdi: Nella.HTMLProps;
        bdo: Nella.HTMLProps;
        big: Nella.HTMLProps;
        blockquote: Nella.HTMLProps;
        body: Nella.HTMLProps;
        br: Nella.HTMLProps;
        button: Nella.HTMLProps;
        canvas: Nella.HTMLProps;
        caption: Nella.HTMLProps;
        cite: Nella.HTMLProps;
        code: Nella.HTMLProps;
        col: Nella.HTMLProps;
        colgroup: Nella.HTMLProps;
        data: Nella.HTMLProps;
        datalist: Nella.HTMLProps;
        dd: Nella.HTMLProps;
        del: Nella.HTMLProps;
        details: Nella.HTMLProps;
        dfn: Nella.HTMLProps;
        dialog: Nella.HTMLProps;
        div: Nella.HTMLProps;
        dl: Nella.HTMLProps;
        dt: Nella.HTMLProps;
        em: Nella.HTMLProps;
        embed: Nella.HTMLProps;
        fieldset: Nella.HTMLProps;
        figcaption: Nella.HTMLProps;
        figure: Nella.HTMLProps;
        footer: Nella.HTMLProps;
        form: Nella.HTMLProps;
        h1: Nella.HTMLProps;
        h2: Nella.HTMLProps;
        h3: Nella.HTMLProps;
        h4: Nella.HTMLProps;
        h5: Nella.HTMLProps;
        h6: Nella.HTMLProps;
        head: Nella.HTMLProps;
        header: Nella.HTMLProps;
        hgroup: Nella.HTMLProps;
        hr: Nella.HTMLProps;
        html: Nella.HTMLProps;
        i: Nella.HTMLProps;
        iframe: Nella.HTMLProps;
        img: Nella.HTMLProps;
        input: Nella.HTMLProps;
        ins: Nella.HTMLProps;
        kbd: Nella.HTMLProps;
        keygen: Nella.HTMLProps;
        label: Nella.HTMLProps;
        legend: Nella.HTMLProps;
        li: Nella.HTMLProps;
        link: Nella.HTMLProps;
        main: Nella.HTMLProps;
        map: Nella.HTMLProps;
        mark: Nella.HTMLProps;
        menu: Nella.HTMLProps;
        menuitem: Nella.HTMLProps;
        meta: Nella.HTMLProps;
        meter: Nella.HTMLProps;
        nav: Nella.HTMLProps;
        noindex: Nella.HTMLProps;
        noscript: Nella.HTMLProps;
        object: Nella.HTMLProps;
        ol: Nella.HTMLProps;
        optgroup: Nella.HTMLProps;
        option: Nella.HTMLProps;
        output: Nella.HTMLProps;
        p: Nella.HTMLProps;
        param: Nella.HTMLProps;
        picture: Nella.HTMLProps;
        pre: Nella.HTMLProps;
        progress: Nella.HTMLProps;
        q: Nella.HTMLProps;
        rp: Nella.HTMLProps;
        rt: Nella.HTMLProps;
        ruby: Nella.HTMLProps;
        s: Nella.HTMLProps;
        samp: Nella.HTMLProps;
        script: Nella.HTMLProps;
        section: Nella.HTMLProps;
        select: Nella.HTMLProps;
        small: Nella.HTMLProps;
        source: Nella.HTMLProps;
        span: Nella.HTMLProps;
        strong: Nella.HTMLProps;
        style: Nella.HTMLProps;
        sub: Nella.HTMLProps;
        summary: Nella.HTMLProps;
        sup: Nella.HTMLProps;
        table: Nella.HTMLProps;
        template: Nella.HTMLProps;
        tbody: Nella.HTMLProps;
        td: Nella.HTMLProps;
        textarea: Nella.HTMLProps;
        tfoot: Nella.HTMLProps;
        th: Nella.HTMLProps;
        thead: Nella.HTMLProps;
        time: Nella.HTMLProps;
        title: Nella.HTMLProps;
        tr: Nella.HTMLProps;
        track: Nella.HTMLProps;
        u: Nella.HTMLProps;
        ul: Nella.HTMLProps;
        "var": Nella.HTMLProps;
        video: Nella.HTMLProps;
        wbr: Nella.HTMLProps;
        webview: Nella.HTMLProps;

        // SVG
        svg: Nella.SVGProps

        animate: Nella.SVGProps // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
        animateMotion: Nella.SVGProps
        animateTransform: Nella.SVGProps // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
        circle: Nella.SVGProps
        clipPath: Nella.SVGProps
        defs: Nella.SVGProps
        desc: Nella.SVGProps
        ellipse: Nella.SVGProps
        feBlend: Nella.SVGProps
        feColorMatrix: Nella.SVGProps
        feComponentTransfer: Nella.SVGProps
        feComposite: Nella.SVGProps
        feConvolveMatrix: Nella.SVGProps
        feDiffuseLighting: Nella.SVGProps
        feDisplacementMap: Nella.SVGProps
        feDistantLight: Nella.SVGProps
        feDropShadow: Nella.SVGProps
        feFlood: Nella.SVGProps
        feFuncA: Nella.SVGProps
        feFuncB: Nella.SVGProps
        feFuncG: Nella.SVGProps
        feFuncR: Nella.SVGProps
        feGaussianBlur: Nella.SVGProps
        feImage: Nella.SVGProps
        feMerge: Nella.SVGProps
        feMergeNode: Nella.SVGProps
        feMorphology: Nella.SVGProps
        feOffset: Nella.SVGProps
        fePointLight: Nella.SVGProps
        feSpecularLighting: Nella.SVGProps
        feSpotLight: Nella.SVGProps
        feTile: Nella.SVGProps
        feTurbulence: Nella.SVGProps
        filter: Nella.SVGProps
        foreignObject: Nella.SVGProps
        g: Nella.SVGProps
        image: Nella.SVGProps
        line: Nella.SVGProps
        linearGradient: Nella.SVGProps
        marker: Nella.SVGProps
        mask: Nella.SVGProps
        metadata: Nella.SVGProps
        mpath: Nella.SVGProps
        path: Nella.SVGProps
        pattern: Nella.SVGProps
        polygon: Nella.SVGProps
        polyline: Nella.SVGProps
        radialGradient: Nella.SVGProps
        rect: Nella.SVGProps
        stop: Nella.SVGProps
        switch: Nella.SVGProps
        symbol: Nella.SVGProps
        text: Nella.SVGProps
        textPath: Nella.SVGProps
        tspan: Nella.SVGProps
        use: Nella.SVGProps
        view: Nella.SVGProps

        switchComponent: {}
        poolSwitch: {}
        list: { data, component?: (data) => any }
        poolList: { data, component?: (data) => any }
    }
}
