import React from 'react';
import { Card } from 'semantic-ui-react'
import BattleCard from './BattleCard';
import uniqueId from 'react-html-id';

class BattleTracker extends React.Component {
    constructor(props) {
        super(props);
        uniqueId.enableUniqueIds(this)

        this.state = {
            cards: [
                { id: this.nextUniqueId(), name: 'Nik', cardType: 'd', initiative: 12 },
                { id: this.nextUniqueId(), name: 'Dan', cardType: 'player', initiative: 3 },
                { id: this.nextUniqueId(), name: 'Griffin', cardType: 'player', initiative: 7 },
                { id: this.nextUniqueId(), name: 'Maud', cardType: 'player', initiative: 18 },
                { id: this.nextUniqueId(), name: 'Goblin', cardType: 'monster', initiative: 18, hitPoints: 5, armourClass: 13 },
                { id: this.nextUniqueId(), name: 'Ogre', cardType: 'monster', initiative: 4, hitPoints: 42, armourClass: 11 }
            ],
        };
    }

    deleteCard = (index, e) => {
        e.preventDefault();
        
        let cardList = Object.assign([], this.state.cards);
        cardList.splice(index, 1);
        this.setState({ cards: cardList });
    }
    

    render() {
        return (
            <Card.Group>
                {this.state.cards
                .sort((a,b)=> b.initiative - a.initiative)
                .map((card, i) => (
                    <BattleCard
                        key={card.id}
                        name={card.name}
                        deleteSelf={this.deleteCard.bind(this, i)}
                        cardType={card.cardType}
                        initiative={card.initiative}
                        hitPoints={card.hitPoints}
                        armourClass={card.armourClass} />
                ))}
            </Card.Group>
        );
    }
}

export default BattleTracker;