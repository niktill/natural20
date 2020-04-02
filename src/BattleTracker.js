import React from 'react';
import { Card } from 'semantic-ui-react'
import BattleCard from './BattleCard';


class BattleCardList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            cards: [<BattleCard name='Nik' initiative='12' deleteSelf={this.deleteCard} cardType="player" initiative='22' />,
            <BattleCard name='Nik'deleteSelf={this.deleteCard} cardType="player" initiative='18'/>,
            <BattleCard name='Nik'deleteSelf={this.deleteCard}  cardType="player" initiative='10'/>,
            <BattleCard name='Veteran Goblin Raider'
                health='19'
                armourClass='12'
                initiative='10'
                hitPoints='32'
                deleteSelf={this.deleteCard} 
                cardType="monster"/>,
            <BattleCard name='Veteran Goblin Raider'
                health='19'
                initiative='3'
                armourClass='11'
                hitPoints='32'
                deleteCard={this.deleteCard}
                cardType='monster' />], 
            cardCurrentTurn: undefined };
    }
    render() {
        return (
            <Card.Group>
                {this.state.cards}
            </Card.Group>
        );
    }
}

export default BattleCardList;