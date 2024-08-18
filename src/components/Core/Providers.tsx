import React, { FC, ComponentType, Fragment, ReactNode } from 'react';

type ComponentWithProps = ComponentType<React.PropsWithChildren<any>>;
type Components = ComponentWithProps | [ComponentWithProps, { [key: string]: any }];

export const ComposeProviders: FC<{
    components: Components[];
    children?: ReactNode,
}> = ({ components, children }) => {
    return (
        <Fragment>
            {components.reverse().reduce((acc, curr) => {
                const [Provider, props] = Array.isArray(curr) ? [curr[0], curr[1]] : [curr, {}];
                return <Provider {...props}>{acc}</Provider>;
            }, children)}
        </Fragment>
    )
};