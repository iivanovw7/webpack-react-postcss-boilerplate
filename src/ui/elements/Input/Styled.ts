/**
 * Module contains styled input elements.
 * @module ui/elements/Input/Styled
 */
import styled from 'astroturf/react';

import type { InputProps } from './index';

type StyledInputProps = Pick<InputProps, 'disabled' | 'variant'>;

export const Label = styled('label')`
    @mixin flex;

    color: var(--primary-text-color);
`;

export const InputContainer = styled('div')`
    position: relative;
    margin-top: units(8);
`;

export const StyledInput = styled('input')<StyledInputProps>`
    @mixin shadows;
    @mixin transition border-color;

    padding: units(8);
    color: var(--primary-text-color);
    background-color: var(--background-input-color);
    border: 1px solid var(--divider-color);
    border-radius: $borderRadius;

    &:not([disabled]) {
        &:focus,
        &:focus-visible {
            border-color: var(--primary-accent-color);
            outline: none;
        }
    }

    &.icon {
        padding-right: units(32);
    }
`;

export const Span = styled('span')`
    @mixin fontSize 11, 16;

    margin-left: units(7);
    color: var(--alert-color);
`;
