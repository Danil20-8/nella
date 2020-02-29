import { Context } from "../../../index";
/**
 * 
 * @param {Context} htmljs
 * @param {Context} parentHtmljs
 */
export default function useTopEditorComponent(htmljs, parentHtmljs = null) {
    let { button, div, span, list, a,  } = parentHtmljs || htmljs;
    return function ({ pushItem, editorItemContext, defaultElContext }) {
        return htmljs.component(
            div({
                className: "editor-top"
            },
                button({
                    innerText: "button",
                    onclick: () => pushItem("button", (context) => button(editorItemContext(context)), defaultElContext({ innerText: "button" }))
                }),
                button({
                    innerText: "div",
                    onclick: () => pushItem("div", (context) => div(editorItemContext(context), list(context)), defaultElContext({}, true))
                }),
                button({
                    innerText: "list",
                    onclick: () => pushItem("list", (context) => span(editorItemContext(context), list(context)), defaultElContext({ data: [] }, false, true))
                }),
                button({
                    innerText: "a",
                    onclick: () => pushItem("a", (context) => a(editorItemContext(context)), defaultElContext({ innerText: "to google!", href: "https://www.google.com/" }))
                })
            )
        );
    };
}