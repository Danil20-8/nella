import { Context } from "../../../oldIndex";

/**
 * 
 * @param {Context} htmljs 
 */
export default function useCssEditor(htmljs) {
    let { component, body } = htmljs;
    return function (context) {
        return component(body(
            
        ));
    };
}