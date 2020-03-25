import { router } from "../../../../router";
import { homeRoute } from "./homeRoute";
import { div, button, useStore } from "../../../..";

class ContentRoute {
    active() { return router.pathname.startsWith("/content"); }
    component() {
        return [
            div({ innerText: "Content" }),
            div({ innerText: "Hey! Here is my content! Enjoy to see that!" }),
            div({ innerText: "Tired of content? Go home and get rest." }),
            button({ innerText: "to home", onclick: homeRoute.pushRoute })
        ];
    }
    pushRoute() { router.pushState(null, "/content", this); }
}

export const contentRoute = useStore(new ContentRoute());