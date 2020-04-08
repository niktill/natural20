import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Form, Popup, Checkbox } from 'semantic-ui-react'
import BattleCard from './BattleCard';
import shortid from "shortid";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            addCardOptions: {
                cardType: undefined,
                name: undefined,
                initiative: undefined,
                rollinitiative: false,
                initiativeModifier: 0,
                armourClass: undefined,
                quantity: 1
            }
        };
    }

    deleteCard = (index, e) => {
        e.preventDefault();

        let cardList = Object.assign([], this.state.cards);
        cardList.splice(index, 1);
        this.setState({ cards: cardList });
    }

    changeAddCardOptions = (e, data) => {
        e.preventDefault();

        let cardOption = data.name;
        let newVal = (data.name === 'rollinitiative') ? data.checked : data.value;
        let addCardOptionsCopy = this.state.addCardOptions;
        addCardOptionsCopy[cardOption] = newVal;
        this.setState({ addCardOptions: addCardOptionsCopy });

    }

    addCards = (event, data) => {
        let numCards = this.state.addCardOptions.cardType === 'monster' ? this.state.addCardOptions.quantity : 1;

        for (let i = 0; i < numCards; i++) {
            // calulate initiative         
            let initiativeModifierVal = event.target.initiativeModifier.value !== '' ?
                parseInt(event.target.initiativeModifier.value) : 0;
            let initiativeVal = this.state.addCardOptions.rollinitiative ?
                Math.floor(Math.random() * 20) + 1 + initiativeModifierVal : event.target.initiativeModifier.value;
            // create new card
            let newCard = {
                id: shortid.generate(),
                cardType: this.state.addCardOptions.cardType,
                name: (numCards === 1) ? event.target.name.value : event.target.name.value + " #" + (i + 1),
                initiative: initiativeVal,
                armourClass: event.target.armourClass.value,
                hitPoints: event.target.hitPoints.value
            }
            // add new card to card list
            let newCardList = this.state.cards;
            newCardList.push(newCard);
            this.setState({ cards: newCardList });
        }
    }

    render() {
        return (
            <div id="natural-20-app">
                {/* Add battle card(s) form */}
                <Form id='add-card-form' onSubmit={this.addCards}>
                    <Form.Group>
                        <Form.Select value={this.state.addCardOptions.cardType} name='cardType' required={true} label='Type' placeholder='Type'
                            onChange={this.changeAddCardOptions}
                            options={[{ key: 'p', text: 'Player', value: 'player' }, { key: 'm', text: 'Monster', value: 'monster' }]}
                        />
                        <Form.Input required={true} label='Name' placeholder='Name' name='name' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Initiative' placeholder='Initiative' type='number' name='initiative'
                            disabled={this.state.addCardOptions.rollinitiative}
                            required={!this.state.addCardOptions.rollinitiative} />
                        <Popup
                            trigger={
                                <Checkbox width={2} label='Roll Initiative' name='rollinitiative'
                                    checked={this.state.addCardOptions.rollinitiative}
                                    onChange={this.changeAddCardOptions} />}
                            content='Roll initiative instead of setting'
                            size='small'>
                        </Popup>
                        <Form.Input label='Initiative Modifier' placeholder='Initiative Modifier' type='number' name='initiativeModifier'
                            disabled={!this.state.addCardOptions.rollinitiative} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input disabled={this.state.addCardOptions.cardType !== 'monster'}
                            label='Armour Class' placeholder='Armour Class' type='number' name='armourClass' />
                        <Form.Input disabled={this.state.addCardOptions.cardType !== 'monster'}
                            label='Hit Points' placeholder='Hit Points' type='number' name='hitPoints' />
                    </Form.Group>
                    <Form.Group inline={true}>
                        <Popup
                            trigger={
                                <Form.Input
                                    disabled={this.state.addCardOptions.cardType !== 'monster'}
                                    onChange={this.changeAddCardOptions}
                                    value={this.state.addCardOptions.quantity}
                                    min='1'
                                    style={{ 'width': '100px' }} label='Quantity' type='number' name='quantity' />}
                            content='Quantity of monsters to add'
                            size='small' />
                        <Form.Button type='submit' id='add-card-button' positive={true}> Add to Battle</Form.Button>
                    </Form.Group>
                </Form>
                {/* List of Battle Cards */}
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