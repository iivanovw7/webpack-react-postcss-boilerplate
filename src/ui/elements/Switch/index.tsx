/**
 * Module contains switch component
 * @module ui/elements/Switch
 * @author Igor Ivanov
 */
import { css } from 'astroturf';
import type { ReactElement } from 'react';
import React from 'react';

import { Checkbox, Container, Handle, Wrapper } from './Styled';

interface ISwitchProps {
    /** If switch is enabled. */
    checked: boolean;
    /**
     *  If passed will be used as background image for checked state.
     *  @default null
     */
    checkedImg?: Nullable<string>;
    /** Switch handler. */
    onChange: () => void;
    /**
     *  Flag defines theme switch.
     *  @default false
     */
    themeSwitch: boolean;
    /**
     *  If passed will be used as background image for unchecked state.
     *  @default null
     */
    uncheckedImg?: Nullable<string>;
}

/**
 * Creates switch component.
 * @name elements/Switch
 * @method
 * @param {Object} props - contains component props
 * @return {ReactElement} React component with children.
 * @constructor
 */
export function Switch(props: ISwitchProps): ReactElement {
    const {
        onChange,
        checked,
        themeSwitch = false,
        checkedImg = null,
        uncheckedImg = null
    } = props;
    const image = checked
        ? checkedImg
        : uncheckedImg;

    return (
        <Wrapper>
            <Checkbox onChange={ onChange } checked={ checked } />
            <Handle />
            <Container
                css={ css`background-image: ${ (image && `url(${ image }) `) || 'none' };` }
                checked={ checked }
                theme={ themeSwitch }
            />
        </Wrapper>
    );
}
