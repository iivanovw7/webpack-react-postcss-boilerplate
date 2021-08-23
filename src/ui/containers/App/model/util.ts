/**
 * Module contains app container utils.
 * @module ui/containers/App/model/util
 */

const waitScreen = document.querySelector('.preloader');
const globalLoader = document.querySelector<HTMLElement>('.preloader-progress');

/**
 * Sets wait screen state.
 * @param {boolean} isShown - If `true` shows application wait screen.
 */
export function setWaitScreen(isShown: boolean): void {
    if (waitScreen) {
        const { classList } = waitScreen;

        if (isShown) {
            classList.remove('preloader-hidden');
        }
        else if (! classList.contains('preloader-hidden')) {
            classList.add('preloader-hidden');
        }
    }
}

/**
 * Sets global loader visibility state.
 * @param {boolean} isVisible - If `true` shows top progress bar.
 */
export function setGlobalLoader(isVisible: boolean): void {
    if (globalLoader) {
        globalLoader.style.display = isVisible
            ? 'block'
            : 'none';
    }
}
