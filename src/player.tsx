
import { monitorEventLoopDelay } from 'node:perf_hooks';
import React from 'react';
import { Vector } from './vector';
import { v4 as uuidv4 } from 'uuid';
import './player.css'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import Field from './field'

type Position = {
    x: number,
    y: number,
}

export interface PlayerProps {
    key: string;
    field: Field;
}

export interface PlayerState {
    position: Position;
    size: number;
    vectors: Vector[];
}

export class Player extends React.Component<PlayerProps, PlayerState> {

    constructor(props: PlayerProps, position?: Position) {
        super(props);
        if (!position) {
            position = {x: 10, y: 10};
        }
        this.state = {
            position: position,
            size: 10,
            vectors: [],
        };
    }

    onMouseDown = (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
        console.log('Player.onMouseDown');
        e.stopPropagation();
        if (this == this.props.field.state.selection) {
            this.props.field.setState(state => {
                console.log('setting field state to no selection')
                return {
                    players: this.props.field.state.players,
                };
            });
        } else {
            this.props.field.setState(state => {
                console.log('setting field state to this as a selection')
                return {
                    players: this.props.field.state.players,
                    selection: this,
                };
            });
        }
    }

    addVector(x: number, y: number) {
        // If there is already a vector to add on to, then do so
        console.log('Player.addVector')
        if (this.state.vectors[this.state.vectors.length - 1]) {
            this.setState(state => {
                const vectors: Vector[] = this.state.vectors.concat(new Vector({key: uuidv4(), player: this}, x, y, this.state.vectors[this.state.vectors.length - 1]))
                return {
                    position: this.state.position,
                    size: this.state.size,
                    vectors: vectors,
                };
             })
        // Otherwise let it add on to origin
        } else {
            this.setState(state => {
                const vectors: Vector[] = this.state.vectors.concat(new Vector({key: uuidv4(), player: this}, x, y))
                return {
                    position: this.state.position,
                    size: this.state.size,
                    vectors: vectors,
                };
             })
        }
    }

    undoVector() {
        console.log('Player.undoVector')
        this.setState(state => {
            const vectors = this.state.vectors;
            vectors.pop();
            return {
                position: this.state.position,
                size: this.state.size,
                vectors: vectors,
            };
        })
    }

    deleteVector(index: number) {
        console.log('Player.deleteVector')
        this.setState(state => {
            const vectors = this.state.vectors;
            delete vectors[index];
            return {
                position: this.state.position,
                size: this.state.size,
                vectors: vectors,
            };
        })
    }

    render() {
        return (
            <svg className="PlayerContainer"
            key={this.props.key}
            width={this.state.size * 2}
            height={this.state.size * 2}
            >
                <circle 
                className="Player"
                style={{stroke: this.props.field.state.selection == this ? 'white' : 'yellow', fill: 'blue'}}
                onClick={this.onMouseDown}
                cx={this.state.position.x}
                cy={this.state.position.y}
                r={this.state.size}
                />
            </svg>
        );
    }
}

