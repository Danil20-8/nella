import { Context, useHtmljs } from "../../../oldIndex";
import useSideEditorComponent from "./side";
import useSandboxComponent from "./sandbox";
import useCssEditor from "./css";
import useTopEditorComponent from "./top";
/**
 * 
 * @param {Context} htmljs 
 * @param {Context} parentHtmljs 
 */
export default function useEditorComponent(htmljs, parentHtmljs) {
    let { div } = useHtmljs(htmljs, parentHtmljs);

    let sandboxHtmljs = new Context(htmljs.data.sandbox);
    let cssComponentHtmljs = new Context(htmljs.data, [sandboxHtmljs]);
    let sandboxComponent = useSandboxComponent(sandboxHtmljs, htmljs);
    let cssComponent = useCssEditor(cssComponentHtmljs, htmljs);
    let topComponent = useTopEditorComponent(htmljs);
    let sideComponent = useSideEditorComponent(htmljs);
    htmljs.update
    return function (context) {

        return htmljs.component(
            div({
                className: "editor"
            },
                topComponent(context),
                sideComponent(context),
                cssComponent(context),
                div({
                    className: "editor-sandbox"
                },
                    iframe({ width: "100%", height: "100%" }, sandboxComponent(context))
                ),
                div({
                    className: "editor-out"
                },
                    button({
                        innerText: "compile",
                        onclick: () => context.compile()
                    })
                )
            )
        );
    }
}