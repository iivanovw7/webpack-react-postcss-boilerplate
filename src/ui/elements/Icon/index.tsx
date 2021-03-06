/**
 * Module contains SVG icon component.
 * @module ui/elements/Icon
 * @author Igor Ivanov
 */
import type { FC, SVGProps, ReactElement} from 'react';
import React, { useEffect, useRef, useState } from 'react';

interface IconProps {
    /**
     * Svg fill prop.
     * @default "currentColor"
     */
    fill?: string,
    /**
     * Icon file name.
     * @example "search"
     */
    path: string
}

interface ImportedIconInterface extends FC<SVGProps<SVGSVGElement>>, IconProps {}

/**
 * Dynamically loads icon from assets.
 * @constructor
 * @name elements/Icon
 * @method
 * @param {IconProps} props - contains component props.
 * @return {Node} React component with children.
 */
export function Icon(props: IconProps): Nullable<ReactElement<JSX.Element>> {
    const { path, fill = 'currentColor' } = props;
    const ImportedIconRef = useRef<ImportedIconInterface>();
    const [loading, setLoading] = useState(false);

    useEffect((): void => {
        setLoading(true);

        const renderImage = async (imagePath: string): Promise<void> => {
            const imageComponent = (await import(`../../../../assets/svg/icons/${imagePath}.svg`)).ReactComponent;

            ImportedIconRef.current = await imageComponent;
            setLoading(false);
        };

        // eslint-disable-next-line no-void
        void renderImage(path);
    }, [path]);

    if (! loading && ImportedIconRef.current) {
        const { current: ImportedIcon } = ImportedIconRef;

        return <ImportedIcon path={path} fill={fill} />;
    }

    return null;
}
