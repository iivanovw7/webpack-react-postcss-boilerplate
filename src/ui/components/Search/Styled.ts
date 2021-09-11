/**
 * Module contains additional styles used in search component.
 * @module ui/components/Search/Styled
 */
import styled from 'astroturf/react';

import { StyledButton } from '../../elements/Button/Styled';
import { StyledInput } from '../../elements/Input/Styled';

export const Wrapper = styled('div')`
    ${ StyledInput } {
        @mixin fontSize 28, 36;
    }

    ${ StyledButton } {
        @mixin centerAbsolute Y;

        right: units(16);
        width: units(48);
        height: units(48);
        background-color: transparent;
        border: 0;

        &:not([disabled]) {
            &:hover {
                color: var(--primary-accent-color);
            }
        }
    }
`;
