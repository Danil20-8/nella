import { Context } from "../../../oldIndex";

/**
 * 
 * @param {Context} htmljs
 * @param {Context} parentHtmljs
 */
export default function useSandboxComponent(htmljs, parentHtmljs = null) {
    let { list } = parentHtmljs || htmljs;
    return function (context) {
        return htmljs.component(list({
            data: context.items,
            component: (e) => e.el(e.context)
        })
        );
    };
}