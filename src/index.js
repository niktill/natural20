import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Form } from 'semantic-ui-react'
import BattleCard from './BattleCard';
import shortid from "shortid";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            addCardOptions: { cardType: undefined, name: undefined, initiative: undefined, armourClass: undefined }
        };
    }

    deleteCard = (index, e) => {
        e.preventDefault();

        let cardList = Object.assign([], this.state.cards);
        cardList.splice(index, 1);
        this.setState({ cards: cardList });
    }

    changeAddCardType = (event, data) => {
        event.preventDefault();

        let addCardOptionsCopy = this.state.addCardOptions
        addCardOptionsCopy.cardType = data.value;
        this.setState({ addCardOptions: addCardOptionsCopy })
    }

    addCard = (event, data) => {
        let newCard = {
            id: shortid.generate(),
            cardType: this.state.addCardOptions.cardType,
            name: event.target.name.value,
            initiative: event.target.initiative.value,
            armourClass: event.target.armourClass.value,
            hitPoints: event.target.hitPoints.value
        }

        let newCardList = this.state.cards;
        newCardList.push(newCard);
        this.setState({ cards: newCardList });

    }


    render() {
        return (
            <div id="natural-20-app">
                <Form id='add-card-form' onSubmit={this.addCard}>
                    <Form.Group>
                        <Form.Select
                            onChange={this.changeAddCardType}
                            value={this.state.addCardOptions.cardType}
                            required={true}
                            label='Type'
                            placeholder='Type'
                            options={[{ key: 'p', text: 'Player', value: 'player' }, { key: 'm', text: 'Monster', value: 'monster' }]}
                        />
                        <Form.Input required={true} width={5} label='Name' placeholder='Name' name='name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input required={true} width={2} label='Initiative' placeholder='Initiative' type='number' name='initiative' />
                        <Form.Input disabled={this.state.addCardOptions.cardType !== 'monster'}
                            width={2} label='Armour Class' placeholder='Armour Class' type='number' name='armourClass' />
                        <Form.Input disabled={this.state.addCardOptions.cardType !== 'monster'}
                            width={2} label='Hit Points' placeholder='Hit Points' type='number' name='hitPoints' />
                        <Form.Button type='submit' id='add-card-button' positive={true}> Add to Battle</Form.Button>
                    </Form.Group>
                </Form>
                <Card.Group id='battle-cards'>
                    {this.state.cards
                        .sort((a, b) => b.initiative - a.initiative)
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
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);