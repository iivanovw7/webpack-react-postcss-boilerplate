/**
 * Module contains portal element.
 * @module ui/elements/Portal
 */
import type { ReactPortal, ReactNode } from 'react';
import { createPortal} from 'react-dom';

import usePortal from '../../../utils/hooks/usePortal';

export interface PortalParams {
    /** Portal `children`, eg search button and etc. */
    children: ReactNode;
    /** Portal `id`. */
    id: string;
}

/**
 * Creates react portal with children.
 * @param {PortalParams} params - object represents parameters.
 * @return {ReactPortal} react portal.
 *
 * @example
 *  <Portal id="modal">
 *    <p>Thinking with portals</p>
 *  </Portal>
 */
export const Portal = (params: PortalParams): ReactPortal => {
    const { id, children } = params;
    const target = usePortal(id);

    return createPortal(
        children,
        target
    );
};

