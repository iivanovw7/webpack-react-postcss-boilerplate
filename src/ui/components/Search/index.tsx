/**
 * Module contains search component.
 * @module ui/components/Search
 */
import type { ReactElement } from 'react';
import React from 'react';

import { Icon } from '../../elements/Icon';
import { Input } from '../../elements/Input';

export interface ISearchProps {
    /** Input element `id. */
    id: string;
    /** Search field label. */
    label?: string;
    /** Function called on every search string change. */
    onInputChange: (value: string) => void;
}

/** Input debounce delay. */
// const debounceTimeout = 50;

export function Search(): ReactElement {

    return (
        <Input
            id="packages-search-input"
            label="npm package name"
            type="search"
            variant="primary"
            value="text"
        >
            <Icon path="search" />
        </Input>
    );
}
