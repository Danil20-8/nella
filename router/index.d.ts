export function pushState<TState>(state: TState, url: string, handler:{ onenter: (state: TState) => void, onexit?: () => void });

export function popState();

export function restore(store, state);

export function useFallbackBackHandler(handler: () => void);

declare class NRouteHanadler<TState>{
    onenter?(state: TState) : void;
    onexit?(): void;
}
declare class NRouter{
    pathname: string
    search: string
    hash: string

    pushState<TState>(state: TState, url: string, handler: NRouteHanadler<TState>);
    popState();
}
export const router: NRouter;