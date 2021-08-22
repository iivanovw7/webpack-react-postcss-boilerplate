/**
 * Module Home page container.
 * @module ui/containers/Home
 * @author Igor Ivanov
 */
import type { ReactElement } from 'react';
import React from 'react';

import { Input } from '../../elements/Input';

import { Wrapper } from './Styled';

/**
 * Home page component.
 * @constructor
 * @return {ReactElement} React component with children.
 */
export function Home(): ReactElement {
    return (
        <Wrapper>
            <Input
                id="packages-search-input"
                label="npm package name"
                type="search"
                variant="primary"
                value="text"
            />
        </Wrapper>
    );
}

export default Home;
