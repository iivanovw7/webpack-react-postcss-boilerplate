/**
 * Module Home page container.
 * @module ui/containers/Home
 * @author Igor Ivanov
 */
import type { ReactElement } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Search } from '../../components/Search';

import { setSearchText } from './model';
import { makeSelectHome } from './model/selectors';
import { Wrapper } from './Styled';

/**
 * Home page component.
 * @constructor
 *
 * @return {ReactElement} React component with children.
 */
export function Home(): ReactElement {
    const { search } = useSelector(makeSelectHome);
    const dispatch = useDispatch();

    // eslint-disable-next-line no-console
    console.log(search);

    /**
     * Handles search input change.
     * @param {string} text - next input value.
     */
    function handleSearch(text: string): void {
        dispatch(setSearchText(text));
    }

    return (
        <Wrapper>
            <Search
                id="packages-search-input"
                label="npm package name"
                onSearch={ handleSearch }
            />
        </Wrapper>
    );
}
