
import React from 'react';
import { Player } from './player'
import './field.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core';

import Draggable from 'react-draggable';
import { isConstructorDeclaration } from 'typescript';
import { isContext } from 'node:vm';
import { Vector } from './vector';

export interface FieldProps {
}

export interface FieldState {
    players: Player[];
    selection?: Player;
}

export default class Field extends React.Component<FieldProps, FieldState> {
    constructor(props: FieldProps) {
        super(props);
        this.state = {players: []};
        console.log("Field - Constructor");
    }

    onMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (this.state.selection) {
            this.state.selection.addVector(e.clientX - this.state.selection.state.position.x, e.clientY - this.state.selection.state.position.y)
        }
    }

    addPlayer() {
        this.setState(state => {
            const players: Player[] = this.state.players.concat(new Player({key: uuidv4(), field: this}))
            return {
                players: players,
            };
        });
        console.log("Field - Player Added")
    }

    undoPlayer() {
        const players: Player[] = this.state.players;
        players.pop()
        this.setState(state => {
            return {
                players: players,
            };
        });
        console.log("Field - Player Undone")
    }

    deletePlayer() {
        this.setState(state => {
            let selection = this.state.selection;
            const players: Player[] = this.state.players;
            players.forEach(function(player, index) {
                if (selection == player) {
                    delete players[index];
                }
            });

            return {
                players: players,
            };
        });
        console.log("Field - Player Deleted")
    }

    render() {
        console.log("Field - Render")
        return (
            <div className="Main">
                <div className="Field" onClick={this.onMouseDown}>
                    {this.state.players.map(function(player: Player) {
                        return(
                            <Draggable bounds="parent" >
                                {player.render()}
                            </Draggable>
                        );
                    })}
                </div>
                <div>
                    <span>
                        <Button className="AddPlayerButton" variant="contained" color="primary" onClick={(e) => {e.preventDefault(); this.addPlayer()}}>Add Player</Button>
                    </span>
                    <span>
                        <Button className="AddPlayerButton" variant="contained" color="primary" onClick={(e) => {e.preventDefault(); this.undoPlayer()}}>Undo Player</Button>
                    </span>
                    <span>
                        <Button className="AddPlayerButton" variant="contained" color="primary" onClick={(e) => {e.preventDefault(); this.deletePlayer()}}>Delete Player</Button>
                    </span>
                </div>
            </div>
        );
    }
}
