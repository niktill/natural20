import React from 'react';
import { Form, Popup, Checkbox, Search, Label, Message } from 'semantic-ui-react'
import shortid from "shortid";

export class AddCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.cards = props.cards;
        this.monsterList = [];

        this.state = {
            addCardOptions: {
                cardType: undefined,
                name: undefined,
                initiative: undefined,
                rollinitiative: false,
                initiativeModifier: 0,
                armourClass: undefined,
                quantity: 1
            },
            searchResults: [],
            searchIsLoading: false,
            waitingForMonsterList: true,
            errorInLoadingMonsters: false
        };
    }

    changeAddCardOptions = (e, data) => {
        e.preventDefault();

        let cardOption = data.name;
        let newVal = (data.name === 'rollinitiative') ? data.checked : data.value;
        let addCardOptionsCopy = this.state.addCardOptions;
        addCardOptionsCopy[cardOption] = newVal;
        this.setState({ addCardOptions: addCardOptionsCopy });

    }

    addCards = (event) => {
        let numCards = this.state.addCardOptions.cardType === 'monster' ? this.state.addCardOptions.quantity : 1;
        let cardsToAdd = [];

        for (let i = 0; i < numCards; i++) {
            // calulate initiative         
            let initiativeModifierVal = event.target.initiativeModifier.value !== '' ?
                parseInt(event.target.initiativeModifier.value) : 0;
            let initiativeVal = this.state.addCardOptions.rollinitiative ?
                Math.floor(Math.random() * 20) + 1 + initiativeModifierVal : event.target.initiative.value;
            // create new card
            let newCard = {
                id: shortid.generate(),
                cardType: this.state.addCardOptions.cardType,
                name: (numCards === 1) ? event.target.name.value : event.target.name.value + " #" + (i + 1),
                initiative: initiativeVal,
                armourClass: event.target.armourClass.value,
                hitPoints: event.target.hitPoints.value,
            }
            // add new card to cardsToAdd list
            cardsToAdd.push(newCard);
        }
        // add new card(s) to battle tracker
        this.props.addCardsToTracker(cardsToAdd);
    }

    monsterSearch = (event, data) => {
        let searchTerm = data.value;
        if (searchTerm) {
            this.setState({ searchIsLoading: true });
            let filteredResults = this.monsterList.filter((monster) =>
                monster.name.toLowerCase().includes(searchTerm.toLowerCase()));
            let formatFilterResults = filteredResults.map((monster) => {monster.title = monster.name; return monster});
            this.setState({ searchResults: formatFilterResults });
            this.setState({ searchIsLoading: false });
        }

    }

    componentDidMount() {
        let proxyUrl = window.location.href.includes('localhost:') ? 'https://cors-anywhere.herokuapp.com/' : '';
        fetch(proxyUrl + 'https://dnd5eapi.co/api/monsters').then((res) => {
            if (!res.ok) {
                throw new Error('Error in retrieving monsters from API')
            }
            return res.json()
        }).then((data) => {
            this.monsterList = data.results;
            this.setState({ waitingForMonsterList: false });
        }).catch((err) => {
            console.log(err)
            this.setState({ searchIsLoading: false });
            this.setState({ errorInLoadingMonsters: true });
        })
    }

    render() {
        return (
            <Form id='add-card-form' onSubmit={this.addCards}>
                <Form.Group>
                    <Form.Select value={this.state.addCardOptions.cardType} name='cardType' required={true} label='Type' placeholder='Type'
                        onChange={this.changeAddCardOptions}
                        options={[{ key: 'p', text: 'Player', value: 'player' }, { key: 'm', text: 'NPC / Monster', value: 'monster' }]}
                    />
                    <Form.Input required={true} label='Name' placeholder='Name' name='name' />
                </Form.Group>
                <Form.Group>
                    <div className={'field' +
                        ((this.state.addCardOptions.cardType !== 'monster' || this.state.errorInLoadingMonsters ||
                            this.state.waitingForMonsterList) ? ' disabled' : '')}>
                        <label>Monster Search</label>
                        <Search
                            size='small'
                            onSearchChange={this.monsterSearch} onFocus={this.monsterSearch}
                            loading={this.state.searchIsLoading || this.state.waitingForMonsterList}
                            results={this.state.searchResults}
                            resultRenderer={({ name }) => <Label content={name} />}
                            noResultsMessage='No monsters found'
                        />
                    </div>
                    <Message
                        className='monsterLoadErrorMessage'
                        size='mini' negative compact
                        hidden={!this.state.errorInLoadingMonsters}
                        content='Error in loading monsters, please refresh to try again.' />
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
            </Form >
        );
    }
}

export default AddCardForm;