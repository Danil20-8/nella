import { Context } from "../../../oldIndex";

/**
 * 
 * @param { Context } context 
 */
export function useAuthComponent(context) {
    let { div, button, inputText } = context;

    return function (context) {
        return div({},
            inputText({
                placeholder: "login"
            }),
            button({
                innerText: "sign in",
                onclick: () => {
                    context.signedIn = true;
                }
            })
        );
    }
}