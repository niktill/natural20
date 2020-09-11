import React from 'react';
import { Form, Popup, Checkbox, Search, Label, Message, Icon } from 'semantic-ui-react'
import shortid from "shortid";

export class AddCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.cards = props.cards;
        this.monsterList = [];

        this.state = {
            addCardOptions: {
                cardType: '',
                name: '',
                initiative: '',
                rollInitiative: false,
                initiativeModifier: 0,
                armourClass: '',
                hitPoints: '',
                quantity: 1
            },
            searchResults: [],
            searchIsLoading: false,
            waitingForMonsterList: true,
            errorInLoadingMonsters: false,
            CardTypeSelected: false
        };
    }

    changeAddCardOptions = (e, data) => {
        e.preventDefault();

        let cardOption = data.name;
        let newVal = (cardOption === 'rollInitiative') ? data.checked : data.value;
        let addCardOptionsCopy = this.state.addCardOptions;
        addCardOptionsCopy[cardOption] = newVal;
        this.setState({ addCardOptions: addCardOptionsCopy });

    }

    addCards = (event) => {
        if (this.state.addCardOptions.cardType) {
            this.setState({ CardTypeSelected: false });
            let numCards = this.state.addCardOptions.cardType === 'monster' ? this.state.addCardOptions.quantity : 1;
            let cardsToAdd = [];

            for (let i = 0; i < numCards; i++) {
                // calulate initiative         
                let initiativeModifierVal = event.target.initiativeModifier.value !== '' ?
                    parseInt(event.target.initiativeModifier.value) : 0;
                let initiativeVal = this.state.addCardOptions.rollInitiative ?
                    Math.floor(Math.random() * 20) + 1 + initiativeModifierVal : event.target.initiative.value;
                // create new card
                let newCard = {
                    id: shortid.generate(),
                    cardType: this.state.addCardOptions.cardType,
                    name: (parseInt(numCards) === 1) ? event.target.name.value : event.target.name.value + " #" + (i + 1),
                    initiative: initiativeVal,
                    armourClass: event.target.armourClass.value,
                    hitPoints: event.target.hitPoints.value,
                }
                // add new card to cardsToAdd list
                cardsToAdd.push(newCard);
            }
            // add new card(s) to battle tracker
            this.props.addCardsToTracker(cardsToAdd);
        } else {
            this.setState({ CardTypeSelected: true });
        }
    }

    monsterSearch = (event, data) => {
        let searchTerm = data.value;
        if (searchTerm) {
            this.setState({ searchIsLoading: true });
            let filteredResults = this.monsterList.filter((monster) =>
                monster.name.toLowerCase().includes(searchTerm.toLowerCase()));
            let formatFilterResults = filteredResults.map((monster) => { monster.title = monster.name; return monster });
            this.setState({ searchResults: formatFilterResults, searchIsLoading: false });
        }

    }

    handleMonsterSelect = (event, data) => {
        if (data.result) {
            this.setState({ searchIsLoading: true });
            fetch('https://cors-anywhere.herokuapp.com/https://dnd5eapi.co' + data.result.url).then((res) => {
                if (!res.ok) {
                    throw new Error('Error in retrieving selected monster from API')
                }
                return res.json()
            }).then((data) => {
                let addCardOptionsCopy = this.state.addCardOptions;
                addCardOptionsCopy.name = data.name;
                addCardOptionsCopy.armourClass = data.armor_class;
                addCardOptionsCopy.hitPoints = data.hit_points;
                addCardOptionsCopy.initiativeModifier = this.abilityModifier(data.dexterity);
                this.setState({ addCardOptions: addCardOptionsCopy, searchIsLoading: false })
            }).catch((err) => {
                console.log(err)
                this.setState({ searchIsLoading: false, errorInLoadingMonsters: true });
            })
        }
    }

    abilityModifier = (base) => {
        if (base < 3) throw Error("Ability scores must be at least 3")
        if (base > 18) throw Error("Ability scores can be at most 18")
        return Math.floor((base - 10) / 2);
    };

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://dnd5eapi.co/api/monsters').then((res) => {
            if (!res.ok) {
                throw new Error('Error in retrieving monsters from API')
            }
            return res.json()
        }).then((data) => {
            this.monsterList = data.results;
            this.setState({ waitingForMonsterList: false });
        }).catch((err) => {
            console.log(err)
            this.setState({ waitingForMonsterList: false, searchIsLoading: false, errorInLoadingMonsters: true });
        })
    }

    render() {
        return (
            <Form id='add-card-form' onSubmit={this.addCards}>
                <Message className='CardTypeSelectedErrorMessage' size='mini' negative compact
                    hidden={!this.state.CardTypeSelected}
                    content='Please pick a Card Type.' />
                <Form.Group>
                    <Form.Select value={this.state.addCardOptions.cardType} name='cardType' required={true} label='Type' placeholder='Type'
                        onChange={this.changeAddCardOptions}
                        options={[{ key: 'p', text: 'Player', value: 'player' }, { key: 'm', text: 'NPC / Monster', value: 'monster' }]}
                    />
                    <Form.Input required={true} label='Name' placeholder='Name' name='name'
                        value={this.state.addCardOptions.name} onChange={this.changeAddCardOptions} />
                </Form.Group>
                <Form.Group>
                    <div className={'field' +
                        ((this.state.addCardOptions.cardType !== 'monster' || this.state.errorInLoadingMonsters ||
                            this.state.waitingForMonsterList) ? ' disabled' : '')}>
                        <label>Monster Search</label>
                        <Search
                            size='small'
                            onSearchChange={this.monsterSearch} onFocus={this.monsterSearch}
                            onResultSelect={this.handleMonsterSelect}
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
                        disabled={this.state.addCardOptions.rollInitiative}
                        required={!this.state.addCardOptions.rollInitiative}
                        onChange={this.changeAddCardOptions}
                        value={this.state.addCardOptions.initiative} />
                    <Popup
                        trigger={
                            <Checkbox width={2} label='Roll Initiative' name='rollInitiative'
                                checked={this.state.addCardOptions.rollInitiative}
                                onChange={this.changeAddCardOptions} />}
                        content='Roll initiative instead of setting'
                        size='small'>
                    </Popup>
                    <Form.Input label='Initiative Modifier' placeholder='Initiative Modifier' type='number' name='initiativeModifier'
                        disabled={!this.state.addCardOptions.rollInitiative}
                        required={this.state.addCardOptions.rollInitiative}
                        onChange={this.changeAddCardOptions}
                        value={this.state.addCardOptions.initiativeModifier} />
                </Form.Group>
                <Form.Group>
                    <Form.Input disabled={this.state.addCardOptions.cardType !== 'monster'}
                        label='Armour Class' placeholder='Armour Class' type='number' name='armourClass'
                        onChange={this.changeAddCardOptions}
                        value={this.state.addCardOptions.armourClass} />
                    <Form.Input disabled={this.state.addCardOptions.cardType !== 'monster'}
                        label='Hit Points' placeholder='Hit Points' type='number' name='hitPoints'
                        onChange={this.changeAddCardOptions}
                        value={this.state.addCardOptions.hitPoints} />
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