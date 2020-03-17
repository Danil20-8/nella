import { router } from '../../../../router';
import { contentRoute } from './contentRoute';
import { resumeRoute } from './resumeRoute';
import { div, button, useStore } from '../../../..';

class HomeRoute {
    active() {
        return router.pathname.valueOf() === "/";
    }
    component() {
        return [
            div({ innerText: "Home" }),
            div({ innerText: "Hello everybody! Glad to see you at my home! Please go to see my content!" }),
            button({ innerText: "to content!", onclick: contentRoute.pushRoute }),
            div({ innerText: "Or see my resume" }),
            button({ innerText: "to resume!", onclick: resumeRoute.pushRoute })
        ];
    }

    pushRoute() {
        router.pushState(null, "/", this);
    }
}

export const homeRoute = useStore(new HomeRoute());