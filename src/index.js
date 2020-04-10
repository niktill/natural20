import React from 'react';
import ReactDOM from 'react-dom';
import { Card, Button, Modal, Container } from 'semantic-ui-react'
import BattleCard from './BattleCard';
import AddCardForm from './AddCardForm'
import shortid from "shortid";


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            showDeleteAllModal: false
        };
    }

    addCardsToTracker = (cards) => {
        let currentCards = this.state.cards;
        let newCards = currentCards.concat(cards);
        this.setState({ cards: newCards });
    }

    deleteCard = (index, e) => {
        e.preventDefault();

        let cardList = Object.assign([], this.state.cards);
        cardList.splice(index, 1);
        this.setState({ cards: cardList });
    }

    deleteAll = () => {
        this.setState({ cards: [], showDeleteAllModal: false })
    }

    render() {
        return (
            <Container>
                {/* Add battle card(s) form */}
                <AddCardForm
                    cards={this.cards}
                    addCardsToTracker={this.addCardsToTracker} />
                {/* List of Battle Cards */}
                <Card.Group id='battle-cards' itemsPerRow={4} stackable>
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
                {/* Delete all battle bards button and modal */}
                <Container textAlign='center'>
                    {this.state.cards.length > 0 ?
                        <Button id='delete-all-button' negative onClick={() => { this.setState({ showDeleteAllModal: true }) }}>Delete All</Button> : null}
                </Container>
                <Modal size='tiny' open={this.state.showDeleteAllModal}
                    onClose={() => { this.setState({ showDeleteAllModal: false }) }}>
                    <Modal.Header align='center'>Delete All</Modal.Header>
                    <Modal.Content align='center'>
                        <p>Are you sure you want to delete all?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => { this.setState({ showDeleteAllModal: false }) }}>No</Button>
                        <Button onClick={this.deleteAll}
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Yes'
                        />
                    </Modal.Actions>
                </Modal>
            </Container>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);