export function pushState<TState>(state: TState, url: string, handler:{ onenter: (state: TState) => void, onexit?: () => void });

export function popState();

export function restore(store, state);

export function useFallbackBackHandler(handler: () => void);