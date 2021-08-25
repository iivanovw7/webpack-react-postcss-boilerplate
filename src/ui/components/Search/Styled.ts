/**
 * Module contains additional styles used in search component.
 * @module ui/components/Search/Styled
 */
import styled from 'astroturf/react';

import { StyledInput } from '../../elements/Input/Styled';

export const Wrapper = styled('div')`
    ${ StyledInput } {
        @mixin fontSize 28, 36;
    }
`;
