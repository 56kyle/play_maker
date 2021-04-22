
import { monitorEventLoopDelay } from 'node:perf_hooks';
import React from 'react';
import { Vector } from './vector';
import './player.css'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import Draggable from 'react-draggable';

type Position = {
    x: number,
    y: number,
}

export interface PlayerProps {
    key: string;
}

export interface PlayerState {
    position: Position;
    size: number;
    vectors: Vector[];
    selected: boolean;
}

export class Player extends React.Component<PlayerProps, PlayerState> {
    public readonly state: Readonly<PlayerState> = {
        position: {x: 10, y: 10},
        size: 10,
        vectors: [],
        selected: true,
    }

    constructor(props: PlayerProps, position?: Position) {
        super(props);
        if (!position) {
            position = this.state.position;
        }
        this.state = {
            position: position,
            size: this.state.size,
            vectors: this.state.vectors,
            selected: this.state.selected,
        };
    }

    handleStop() {
        this.setState(state => {
            return {
                position: this.state.position,
                size: this.state.size,
                vectors: this.state.vectors,
                selected: !this.state.selected,
            };
        })
    }

    addVector(x: number, y: number) {
        // If there is already a vector to add on to, then do so
        if (this.state.vectors[this.state.vectors.length - 1]) {
            this.setState(state => {
                const vectors: Vector[] = this.state.vectors.concat(new Vector({}, x, y, this.state.vectors[this.state.vectors.length - 1]))
                return {
                    position: this.state.position,
                    size: this.state.size,
                    vectors: vectors,
                    selected: this.state.selected,
                };
             })
        // Otherwise let it add on to origin
        } else {
            this.setState(state => {
                const vectors: Vector[] = this.state.vectors.concat(new Vector({}, x, y))
                return {
                    position: this.state.position,
                    size: this.state.size,
                    vectors: vectors,
                    selected: this.state.selected,
                };
             })
        }
    }

    undoVector() {
        this.setState(state => {
            const vectors = this.state.vectors;
            vectors.pop();
            return {
                position: this.state.position,
                size: this.state.size,
                vectors: vectors,
                selected: this.state.selected,
            };
        })
    }

    deleteVector(index: number) {
        this.setState(state => {
            const vectors = this.state.vectors;
            delete vectors[index];
            return {
                position: this.state.position,
                size: this.state.size,
                vectors: vectors,
                selected: this.state.selected,
            };
        })
    }

    getClassName(): string {
        if(this.state.selected) {
            return("SelectedPlayer");
        } else {
            return("Player")
        }
    }

    render() {
        return (
            <div className="PlayerContainer" key={this.props.key}>
                <svg className="PlayerContainer" width={this.state.size * 2} height={this.state.size * 2}>
                    <circle 
                    className={this.getClassName()}
                    cx={this.state.position.x}
                    cy={this.state.position.y}
                    r={this.state.size}
                    />
                </svg>
            </div>
        );
    }
}

