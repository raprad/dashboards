import * as React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Test = () => {
    const layout = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2, static:true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];

    return (
        <div>
            <ResponsiveGridLayout
            breakpoints={{lg:1200, md:996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
            style={{position:"relative"}}
            >
            <div data-grid={{x:0, y:0, w:1, h: 2}} key='a'>a</div>
            <div data-grid={{x:1, y:0, w:3, h: 2, minW:2, maxW:4}} key='b'>b</div>
            <div data-grid={{x:4, y:0, w:1, h: 2}} key='c'>c</div>
        </ResponsiveGridLayout>
        </div>
    )
}

export default Test;