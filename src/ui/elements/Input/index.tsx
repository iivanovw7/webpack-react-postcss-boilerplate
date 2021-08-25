/**
 * Module contains input component.
 * @module ui/elements/Input
 */
import type { ChangeEvent, InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import React from 'react';

import { Icon } from '../Icon';
import type { IconType } from '../Icon/types';

import { StyledInput, Label, Span, InputContainer, IconContainer } from './Styled';

export type TVariant = 'primary' | 'secondary' | 'disabled';
type TChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Input children, eg search button and etc. */
    children?: ReactNode;
    /** Label text. */
    label?: string;
    /** Input type [type = 'text'] */
    type?: string;
    /** Text input value. */
    value: string;
    /** onInput event handler. */
    onInput?: TChangeHandler;
    /** onChange event handler. */
    onChange?: TChangeHandler;
    /** Input variant */
    variant?: TVariant;
    /** Validation text. */
    validation?: string;
    /** Input icon */
    icon?: IconType;
}

/**
 * Creates text input component.
 * @name elements/Input
 * @method
 * @param {IInputProps} props - object represents component props.
 * @return {ReactElement} React component.
 * @constructor
 */
export function Input(props: IInputProps): ReactElement {
    const {
        label,
        children,
        id,
        placeholder,
        onChange,
        onFocus,
        onBlur,
        value,
        onInput,
        type = 'text',
        variant = 'primary',
        validation,
        icon
    } = props;

    return (
        <Label htmlFor={ id }>
            { label }
            <Span>{ validation }</Span>
            <InputContainer>
                <StyledInput
                    type={ type }
                    id={ id }
                    variant={ variant }
                    placeholder={ placeholder }
                    value={ value }
                    onChange={ onChange }
                    onInput={ onInput }
                    onFocus={ onFocus }
                    onBlur={ onBlur }
                    icon={Boolean(icon)}
                />
                { children }
                { icon && (
                    <IconContainer>
                        <Icon path={icon} />
                    </IconContainer>
                ) }
            </InputContainer>
        </Label>
    );
}
