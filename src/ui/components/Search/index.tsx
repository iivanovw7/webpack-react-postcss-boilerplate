/**
 * Module contains search component.
 * @module ui/components/Search
 */
import debounce from 'lodash.debounce';
import type { ReactElement } from 'react';
import React, { useCallback, useState } from 'react';

import { DEBOUNCE_TIMEOUT } from '../../../config/constants';
import { Input } from '../../elements/Input';

import { Wrapper } from './Styled';

export interface ISearchProps {
    /** Input element `id`. */
    id: string;
    /** Search field label. */
    label?: string;
    /** Function called on every search string change. */
    onSearch: (value: string) => void;
}

/**
 * Search input.
 *
 * @param {ISearchProps} props - represents component props.
 * @constructor
 *
 * @return {ReactElement} React component with children.
 */
export function Search(props: ISearchProps): ReactElement {
    const { id, label = 'Search', onSearch } = props;
    const [searchValue, setSearchValue] = useState('');
    const handleSearch = useCallback(
        debounce((query: string) => onSearch(query), DEBOUNCE_TIMEOUT),
        [onSearch]
    );

    /**
     * Handles input change.
     * @param {string} value - new input value.
     */
    function handleChange({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void {
        setSearchValue(value);
        handleSearch(value);
    }

    return (
        <Wrapper>
            <Input
                id={ id }
                label={ label }
                type="search"
                variant="primary"
                icon="search"
                value={ searchValue }
                onChange={ handleChange }
            />
        </Wrapper>
    );
}
