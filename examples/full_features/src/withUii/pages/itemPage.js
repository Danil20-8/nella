import { NStore, h1 } from "../../../../..";
import { NRoute, router } from "../../../../../router";
import Route from "route-parser";

class ItemStore extends NStore {
    constructor() {
        super();
        this.id = null;
        this.title = null;
    }
}

class ItemRoute extends NRoute {
    constructor(page) {
        super("item");
        this.page = page;

        this.route = new Route("/item/:id");
    }

    match() { return this.route.match(router.pathname); }
    push(item) { this.pushState(item, this.route.reverse(item)); }

    handleEnter({ id }) {
        this.page.store.id = id;
    }
}

class ItemPage {
    constructor() {
        this.route = new ItemRoute(this);
        this.store = new ItemStore();
    }
    active() { return this.route.within.valueOf() && this.route.match(); }
    component() {
        return [
            h1({ innerText: this.store.id })
        ]
    }

    pushRoute(item) { this.id = item.id; this.route.push(item); }
}

export const itemPage = new ItemPage();