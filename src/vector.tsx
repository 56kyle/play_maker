
import React from 'react';
import { Player } from './player'

type VectorProps = {
    key: string,
    player: Player,
};

type VectorState = {
    origin?: Vector,
    xi: number,
    xf: number,
    yi: number,
    yf: number,
};

export class Vector extends React.Component<VectorProps, VectorState> {
    constructor(props: VectorProps, x: number, y: number, origin?: Vector) {
        super(props);
        let xi = this.props.player.state.position.x;
        let yi = this.props.player.state.position.y;
        if (origin) {
            xi = origin.state.xf;
            yi = origin.state.yf;
        };

        let xf = xi + x;
        let yf = yi + y;
        this.state = {
            origin: origin ? origin : undefined,
            xi: xi,
            yi: yi,
            xf: xf,
            yf: yf,
        };
    }

    render() {
        return (
            <line
                x1={this.state.xi}
                y1={this.state.yi}
                x2={this.state.xf}
                y2={this.state.yf}
            />
        );
    }
}



