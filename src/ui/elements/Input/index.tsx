/**
 * Module contains input component.
 * @module ui/elements/Input
 */
import type { ChangeEvent, InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import React from 'react';

import { StyledInput, Label, Span, InputContainer } from './Styled';

export type TVariant = 'primary' | 'secondary';
type TChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    /** Input children, eg search button and etc. */
    children?: ReactNode;
    /** Button is disabled. */
    disabled?: boolean;
    /** Label text. */
    label?: string;
    /** onChange event handler. */
    onChange?: TChangeHandler;
    /** onInput event handler. */
    onInput?: TChangeHandler;
    /** Input type [type = 'text'] */
    type?: string;
    /** Validation text. */
    validation?: string;
    /** Text input value. */
    value: string;
    /** Input variant */
    variant?: TVariant;
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
        disabled,
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
    } = props;

    return (
        <Label htmlFor={ id }>
            { label }
            <Span>{ validation }</Span>
            <InputContainer>
                <StyledInput
                    type={ type }
                    disabled={ disabled }
                    id={ id }
                    variant={ variant }
                    placeholder={ placeholder }
                    value={ value }
                    onChange={ onChange }
                    onInput={ onInput }
                    onFocus={ onFocus }
                    onBlur={ onBlur }
                />
                { children }
            </InputContainer>
        </Label>
    );
}
