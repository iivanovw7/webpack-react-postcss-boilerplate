import { useEffect, useRef } from 'react';

/**
 * Creates DOM element to be used as React root.
 * @param {string} id - root element id.
 *
 * @return {HTMLDivElement} returns created root element.
 */
function createRootElement(id: string): HTMLDivElement {
    const rootContainer = document.createElement('div');

    rootContainer.setAttribute('id', id);

    return rootContainer;
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem - root element reference.
 */
function addRootElement(rootElem): void {
    const { body } = document;

    if (body.lastElementChild) {
        body.insertBefore(
            rootElem,
            body.lastElementChild.nextElementSibling
        );
    }
}

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 *  makes this trivial), so there is no need to ensure the parent target already
 *  exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {string} id The id of the target container, e.g 'modal' or 'spotlight'.
 *
 * @return {HTMLDivElement} The DOM node to use as the Portal target.
 */
function usePortal(id: string): HTMLDivElement {
    const rootElemRef = useRef<Nullable<HTMLDivElement>>(null);

    useEffect(function setupElement() {
        const { current } = rootElemRef;
        // Look for existing target dom element to append to
        const existingParent = document.querySelector(`#${ id }`);
        // Parent is either a new root or the existing dom element
        const parentElem = existingParent || createRootElement(id);

        // If there is no existing DOM element, add a new one.
        if (! existingParent) {
            addRootElement(parentElem);
        }

        // Add the detached element to the parent
        if (current) {
            parentElem.appendChild(current);
        }

        return function removeElement() {
            if (current) {
                current.remove();
            }

            if (! parentElem.childElementCount) {
                parentElem.remove();
            }
        };
    }, [id]);


    /**
     * It's important we evaluate this lazily:
     * - We need first render to contain the DOM element, so it shouldn't happen
     *   in useEffect. We would normally put this in the constructor().
     * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
     *   since this will run every single render (that's a lot).
     * - We want the ref to consistently point to the same DOM element and only
     *   ever run once.
     * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
     *
     * @return {HTMLElement} root element.
     */
    function getRootElem() {
        if (! rootElemRef.current) {
            rootElemRef.current = document.createElement('div');
        }

        return rootElemRef.current;
    }

    return getRootElem();
}

export default usePortal;
