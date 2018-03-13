export interface SkeinKeyEvent {
    rawEvent: KeyboardEvent;
    key?: string;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    metaKey?: boolean;
}
function skeinKeyEventFromKeyboardEvent(event: KeyboardEvent): SkeinKeyEvent {
    return {
        rawEvent: event,
        key: event.key,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        metaKey: event.metaKey
    };
}

export type KeyEventHandler = (event: SkeinKeyEvent) => void;
let keyDownHandlers: KeyEventHandler[] = [];

export function registerKeyDownHandler(handler: KeyEventHandler) {
    keyDownHandlers.push(handler);
}

export function callKeyDownHandlers(event: SkeinKeyEvent) {
    for (let keyDownHandler of keyDownHandlers) {
        keyDownHandler(event);
    }
}
document.onkeydown = (event) => {
    callKeyDownHandlers(skeinKeyEventFromKeyboardEvent(event));
};
