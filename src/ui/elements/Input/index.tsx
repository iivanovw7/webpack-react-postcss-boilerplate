/**
 * Module contains input component.
 * @module ui/elements/Input
 */
import type { ChangeEvent, ReactElement, ReactNode } from 'react';
import React, { createRef } from 'react';

import { StyledInput, Label, Span } from './Styled';

export type TVariant = 'primary' | 'secondary' | 'disabled';
type TChangeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export interface IInputProps {
    /** Input children, eg search button and etc. */
    children?: ReactNode;
    /** Input `id`. */
    id: string;
    /** Flag determines if input is being focused, only used if onFocus is defined. */
    focused?: boolean;
    /** Validation text. */
    validation?: string;
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
    /** onFocus event handler. */
    onFocus?: () => void;
    /** onBlur event handler. */
    onBlur?: () => void;
    /** Placeholder text. */
    placeholder?: string;
    /** If input should gain focus on mouse enter. */
    focusOnMouseEnter?: boolean;
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
        children,
        focused,
        validation,
        id,
        placeholder,
        onChange,
        onFocus,
        onBlur,
        value,
        onInput,
        focusOnMouseEnter = false,
        type = 'text',
        variant = 'primary'
    } = props;
    const inputRef = createRef<HTMLInputElement>();
    const showValidation = (onFocus && focused) || ! onFocus;

    /**
     * Handles input mouse enter.
     */
    function handleMouseEnter() {
        if (inputRef.current && focusOnMouseEnter) {
            inputRef.current.focus();
        }
    }

    return (
        <Label
            ref={ inputRef }
            htmlFor={ id }
            onMouseEnter={ handleMouseEnter }
        >
            { label }
            { showValidation && (
                <Span>{ validation }</Span>
            ) }
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
            />
            { children }
        </Label>
    );
}
