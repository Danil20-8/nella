import * as Nella from "../../..";
import { routesPage } from "./pages/routes";

function MainComponent() {
    return (
        <div>
            <div>
                <button onclick={() => routesPage.push()}>routes</button>
            </div>,
            <switchComponent>
                {
                    routesPage
                }
            </switchComponent>
        </div>
    )
}

Nella.mount(document.body,
    <MainComponent></MainComponent>
);