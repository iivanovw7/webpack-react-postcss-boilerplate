/**
 * Module contains portal element.
 * @module ui/elements/Portal
 */
import type { ReactPortal, ReactNode } from 'react';
import { createPortal} from 'react-dom';

import usePortal from '../../../utils/hooks/usePortal';

export interface IPortalParams {
    id: string;
    children: ReactNode
}

/**
 * Creates react portal with children.
 * @param {IPortalParams} params - object represents parameters.
 * @return {ReactPortal} react portal.
 *
 * @example
 *  <Portal id="modal">
 *    <p>Thinking with portals</p>
 *  </Portal>
 */
export const Portal = (params: IPortalParams): ReactPortal => {
    const { id, children } = params;
    const target = usePortal(id);

    return createPortal(
        children,
        target
    );
};

