/**
 * Module contains styled elements.
 * @module ui/elements/Switch/Styled
 */
import styled from 'astroturf/react';

type StyledContainerProps = {
    checked: boolean;
    theme: boolean;
};

export const Checkbox = styled('input').attrs({ type: 'checkbox' })`
    @mixin textOverflow '';

    position: absolute;
    width: units(1.5);
    height: units(1.5);
    margin: units(-1.5);
    padding: 0;
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
`;

export const Container = styled('div')<StyledContainerProps>`
    position: absolute;
    bottom: units(4);
    left: units(30);
    z-index: zIndex(switchContainer);
    display: none;
    width: units(16);
    height: units(16);
    background-image: none;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    content: '';

    &.checked {
        left: units(6);
    }

    &.theme {
        display: block;
    }

    &.image {
        background-image: none;
    }
`;

export const Handle = styled('div')`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--background-control-color);
    border-radius: units(34);
    cursor: pointer;
    transition: transform $transitionDuration;

    &::before {
        position: absolute;
        bottom: units(2.5);
        left: units(1.7);
        z-index: zIndex(switchHandle);
        width: units(19);
        height: units(19);
        background-color: var(--primary-control-color);
        border-radius: 50%;
        transition: transform $transitionDuration;
        content: '';

        input:focus + & {
            box-shadow: 0 0 units(2) units(3) var(--primary-accent-color);
        }

        input:checked + & {
            transform: translateX(units(27));
        }
    }
`;

export const Wrapper = styled('label')`
    position: relative;
    display: inline-block;
    width: units(50);
    height: units(24);
    margin: 0 auto;
    vertical-align: middle;
`;
