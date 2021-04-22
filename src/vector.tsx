
import React from 'react';

type VectorProps = {};
type VectorState = {};

export class Vector extends React.Component {
    origin?: Vector;
    x: number;
    y: number;
    xi: number;
    yi: number;
    xf: number;
    yf: number;

    constructor(props: VectorProps, x: number, y: number, origin?: Vector) {
        super(props);
        this.x = x;
        this.y = y;
        if (this.origin) {
            this.xi = this.origin.xf;
            this.yi = this.origin.yf;
        } else {
            this.xi = 0;
            this.yi = 0;
        }

        this.xf = this.xi + this.x;
        this.yf = this.yi + this.y;
    }

    render() {
        return (
            <svg>
                <line
                 x1={this.xi}
                 y1={this.yi}
                 x2={this.xf}
                 y2={this.yf}
                 stroke="000"
                 stroke-width={2}
                 />
            </svg>
        );
    }
}



