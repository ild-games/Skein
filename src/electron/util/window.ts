import { BrowserWindow } from 'electron';

export const INITIAL_SIZE = { x: 820, y: 580 };
export const BASE_WINDOW_TITLE = 'Skein';
export function centerAndResetToInitial(window: BrowserWindow) {
    window.setTitle(BASE_WINDOW_TITLE);
    window.unmaximize();
    window.setMinimumSize(INITIAL_SIZE.x, INITIAL_SIZE.y);
    window.setResizable(false);
    window.center();
}
