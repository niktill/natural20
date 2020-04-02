import React from 'react';
import PlayerCard from './PlayerCard'
import MonsterCard from './MonsterCard'
import { Card } from 'semantic-ui-react'


class BattleCardList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { cards: [], cardCurrentTurn: undefined };
    }
    deleteCard(card) {
    }

    render() {
        return (
            <Card.Group>
                <PlayerCard name='Nik' initiative='12' deleteSelf={this.deleteCard} />
                <PlayerCard name='Nik'deleteSelf={this.deleteCard} />
                <PlayerCard name='Nik'deleteSelf={this.deleteCard} />
                <MonsterCard name='Veteran Goblin Raider'
                    health='19'
                    armourClass='12'
                    initiative='10'
                    hitPoints='32'
                    deleteSelf={this.deleteCard} />
                <MonsterCard name='Veteran Goblin Raider'
                    health='19'
                    initiative='10'
                    hitPoints='32'
                    deleteSelf={this.deleteCard} />
            </Card.Group>
        );
    }
}

export default BattleCardList;