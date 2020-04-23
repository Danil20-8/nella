import * as Nella from "../../../../..";
import { NRoute, router } from "../../../../../router";

class RoutesRoute extends NRoute<{}>{
    constructor() {
        super("routes");
    }
    handleEnter() {
        
    }
}

class RoutesPage {
    route: RoutesRoute

    constructor() {
        this.route = new RoutesRoute();
    }

    push() {
        if(!this.active().valueOf())
            this.route.pushState({}, "/routes");
    }

    active() {
        return this.route.within.valueOf() && router.pathname.indexOf("routes") > -1;
    }

    component() {
        let state = Nella.useStore({
        })
        return (
            <div>
                <h1>Routes page</h1>

                <button onclick={() => pushRoute.pushState(state, "")}>push</button>
            </div>
        )
    }
}

class PushRoute extends NRoute<{}> {
    constructor(){ super("routes/pushRoute") }
    handleEnter() {
        
    }
}
const pushRoute = new PushRoute();
export const routesPage = new RoutesPage();