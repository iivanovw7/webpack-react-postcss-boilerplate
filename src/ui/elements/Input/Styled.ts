/**
 * Module contains styled input elements.
 * @module ui/elements/Input/Styled
 */
import styled from 'astroturf/react';

import type { TVariant } from './index';

type TLabelProps = {
    ref: any // eslint-disable-line
};
type TInputProps = {
    variant: TVariant;
};

export const Label = styled('label')<TLabelProps>`
    @mixin flex;
`;

export const StyledInput = styled('input')<TInputProps>`
    @mixin shadows;
    @mixin transition border-color;

    margin-top: units(8);
    padding: units(8);
    color: var(--primary-text-color);
    background-color: var(--background-input-color);
    border: 1px solid var(--divider-color);
    border-radius: $borderRadius;

    &:focus,
    &:focus-visible {
        border-color: var(--primary-accent-color);
        outline: none;
    }
`;

export const Span = styled('span')`
    @mixin fontSize 11, 16;

    margin-left: units(7);
    color: var(--alert-color);
`;
