/**
 * Module contains app container utils.
 * @module ui/containers/App/model/util
 */

const waitScreen = document.querySelector('.preloader');

/**
 * Removes loading screen.
 */
export function hideWaitScreen(): void {
    if (waitScreen && ! waitScreen.classList.contains('preloader-hidden')) {
        waitScreen.classList.add('preloader-hidden');
    }
}

/**
 * Display loading screen.
 */
export function showWaitScreen(): void {
    if (waitScreen?.classList.contains('preloader-hidden')) {
        waitScreen.classList.remove('preloader-hidden');
    }
}
