
import React from 'react';
import { Player } from './player'
import './field.css';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core';

import Draggable from 'react-draggable';
import { isConstructorDeclaration } from 'typescript';

export interface FieldProps {
}

export interface FieldState {
    players: Player[];
}

export default class Field extends React.Component<FieldProps, FieldState> {
    public readonly state: Readonly<FieldState> = {
        players: [],
    }

    constructor(props: FieldProps) {
        super(props);
        console.log("Field - Constructor");
    }

    addPlayer() {
        this.setState(state => {
            const players: Player[] = this.state.players.concat(new Player({key: uuidv4()}))
            return {
                players: players,
            };
        });
        console.log("Field - Player Added")
    }

    undoPlayer() {
        this.setState(state => {
            const players: Player[] = this.state.players;
            players.pop()
            return {
                players: players,
            };
        });
        console.log("Field - Player Undone")
    }

    deletePlayer(key: string) {
        this.setState(state => {
            const players: Player[] = this.state.players;
            players.forEach(function(player, index) {
                if (player.props.key == key) {
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
                <div className="Field">
                    {this.state.players.map(function(player: Player) {
                        return(
                            <Draggable bounds="parent" onStop={(element) => {player.handleStop()}}>
                                {player.render()}
                            </Draggable>
                        );
                    })}
                </div>
                <Button className="AddPlayerButton" color="primary" onClick={() => {this.addPlayer()}}></Button>
            </div>
        );
    }
}
