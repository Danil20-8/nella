import { useHtmljs, val, switchComponent } from "../../..";

export default function usePage(htmljs, parentHtmljs) {
    let { component, div, button } = useHtmljs(htmljs, parentHtmljs);

    return function (context) {
        return component(div({},
            switchComponent(
                {
                    active: () => !val(context.signedIn),
                    component: () => context.authComponent(context)
                },
                {
                    active: () => val(context.signedIn),
                    component: () => div({}, button({ innerText: "signed in!" }))
                }
            )
        ));
    }
}