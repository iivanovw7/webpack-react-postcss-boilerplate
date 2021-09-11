/**
 * Module contains styled button elements.
 * @module ui/elements/Button/Styled
 */
import styled, { css } from 'astroturf/react';

import type { IButtonProps } from './index';

type TButtonProps = Pick<IButtonProps, 'disabled' | 'dataId' | 'variant'> & {
    type?: string
};

export const container = css`
    @mixin justifyAlignFlex;

    flex-direction: row;
`;

export const StyledButton = styled('button').attrs((props: TButtonProps) => {
    const { dataId, type = 'button', ...restProps } = props;

    return { 'data-id': props.dataId, type, ...restProps };
})<TButtonProps>`
    @mixin transition;

    composes: ${container};
    color: var(--primary-text-color);
    border: 1px solid var(--divider-color);
    border-radius: $borderRadius;

    &:not([disabled]) {
        &:focus,
        &:focus-visible {
            border-color: var(--primary-accent-color);
            outline: none;
        }

        &:hover {
            cursor: pointer;
        }
    }
`;

export const IconContainer = styled('div')`
    width: units(24);
    height: units(24);
`;

export const TextContainer = styled('div')`
    composes: ${container};
`;
