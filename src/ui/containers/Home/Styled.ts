/**
 * Module contains styled elements for `Home` page.
 * @module ui/containers/Home/Styled
 */
import styled from 'astroturf/react';

import { StyledInput } from '../../elements/Input/Styled';

export const Wrapper = styled('div')`
    @mixin justifyAlignFlex;

    height: 100vh;

    ${ StyledInput } {
        @mixin fontSize 28, 36;
    }
`;

