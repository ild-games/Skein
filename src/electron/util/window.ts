import { BrowserWindow, screen } from 'electron';

export const INITIAL_SIZE = { x: 820, y: 580 };
export const BASE_WINDOW_TITLE = 'Skein';
export function centerAndResetToInitial(window: BrowserWindow) {
    let currentWindowPosition = window.getPosition();
    let currentDisplay = screen.getDisplayNearestPoint({ x: currentWindowPosition[0], y: currentWindowPosition[1] });
    window.setTitle(BASE_WINDOW_TITLE);
    window.unmaximize();
    window.setMinimumSize(INITIAL_SIZE.x, INITIAL_SIZE.y);
    window.setResizable(false);
    window.setSize(INITIAL_SIZE.x, INITIAL_SIZE.y);
    let bounds = currentDisplay.bounds;
    let x = bounds.x + ((bounds.width - INITIAL_SIZE.x) / 2);
    let y = bounds.y + ((bounds.height - INITIAL_SIZE.y) / 2);
    window.setPosition(x, y);
}
