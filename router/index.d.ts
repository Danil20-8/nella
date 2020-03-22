export function restore(store, state);

declare class NRouteHanadler<TState>{
    routeKey?: string;

    onenter?(state: TState, anchor: any): any;
    onpushEnter?(state: TState, anchor: any): any;
    onpopEnter?(state: TState, anchor: any): any;
    onexit?(): any;
    onpushExit?(): any;
    onpopExit?(): any;
}
declare class NRouter {
    pathname: string
    search: string
    hash: string

    pushState<TState>(state: TState, url: string, handler: NRouteHanadler<TState>);
    popState(anchor: any);
}
export const router: NRouter;

declare class NRoute<TState>{
    constructor(routeKey?: string);

    routeKey: string;
    within: boolean;

    match(): TState | false;

    onpushEnter(state: TState, anchor: any): any;
    onpopEnter(state: TState, anchor: any): any;
    onpushExit(): any;
    onpopExit(): any;

    pushState<TState>(state: TState, url: string);
    popState();

    handleEnter(state: TState): any;
    handlePushEnter(state: TState): any;
    handlePopEnter(state: TState): any;
    handleExit(): any;
    handlePushExit(): any;
    handlePopExit(): any;
}

export function useRouteHandler<TState>(handler: NRouteHanadler<TState>);
export function dropRouteHandler<TState>(handler: NRouteHanadler<TState>);

export function reloadRoute();