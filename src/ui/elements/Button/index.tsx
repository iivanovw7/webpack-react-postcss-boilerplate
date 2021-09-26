/**
 * Module contains button component
 * @module ui/elements/Button
 * @author Igor Ivanov
 */
import type { ForwardedRef, ReactElement, ReactNode } from 'react';
import React, { forwardRef } from 'react';

import { Icon } from '../Icon';
import type { IconType } from '../Icon/types';

import { IconContainer, StyledButton, TextContainer } from './Styled';

export type TVariant = 'primary' | 'secondary';

export interface IButtonProps {
    /** Button children. */
    children?: ReactNode;
    /**
     *  Any additional string or number passed in data-id field. [dataId = 0]
     *  @see {@link https://developer.mozilla.org/ru/docs/Learn/HTML/Howto/Use_data_attributes}
     */
    dataId?: string | number;
    /** Button is disabled. */
    disabled?: boolean;
    /** Input icon */
    icon?: IconType;
    /** Click handler. */
    onClick: () => void;
    /** Button text string */
    text?: string;
    /** Input variant */
    variant?: TVariant;
}

/**
 * Creates `PlainButton` component.
 * @constructor
 * @name elements/Button
 * @method
 * @param {IButtonProps} props - contains component props.
 * @param {ForwardedRef<HTMLButtonElement>} ref - contains button `ref`.
 * @return {ReactElement} React component with children.
 */
function PlainButton(props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>): ReactElement {
    const { children, disabled, dataId, variant = 'primary', icon, text, onClick } = props;

    return (
        <StyledButton
            ref={ ref }
            dataId={ dataId }
            variant={ variant }
            onClick={ onClick }
            disabled={ disabled }>
            { children }
            { text && (
                <TextContainer>
                    { text }
                </TextContainer>
            ) }
            { icon && (
                <IconContainer>
                    <Icon path={ icon } />
                </IconContainer>
            ) }
        </StyledButton>
    );
}

export const Button = forwardRef(PlainButton);
