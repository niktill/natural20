import React from 'react';
import { PlayerCardContent, MonsterCardContent } from './CardContent';
import { Icon, Button, Card, Label, Message, Popup } from 'semantic-ui-react'


class BattleCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.cardType = props.cardType;
        this.armourClass = props.armourClass;
        this.hitPoints = props.hitPoints;

        this.state = {
            conditions: []
        }
    }

    setConditions = (newConditions) => {
        this.setState({conditions: newConditions});          
    }

    renderCardContent() {
        if (this.cardType === 'player') {
            return (
                <PlayerCardContent
                    initiative={this.initiative}
                    conditions={this.state.conditions}
                    setConditions={this.setConditions}>
                </PlayerCardContent>
            );
        } else if (this.cardType === 'monster') {
            return (
                <MonsterCardContent
                    initiative={this.initiative}
                    armourClass={this.armourClass}
                    hitPoints={this.hitPoints}
                    conditions={this.state.conditions}
                    setConditions={this.setConditions}>
                </MonsterCardContent>
            );
        } else {
            return (
                <Card.Content>
                    <Message negative>
                        <Message.Header>Invalid Card Type</Message.Header>
                        <p>Please delete this card and add agian</p>
                    </Message>
                </Card.Content>
            );
        }
    }

    render() {
        return (
            <Card className="monsterCard">
                <Card.Header>
                    <Label size='large' className='fluid'>
                        {this.cardType === 'player' ? <Icon size='large' name='user' /> : <i className='monster-icon fas fa-skull'></i>}
                        {this.name}
                    </Label>
                </Card.Header>
                {this.renderCardContent()}
                <div className='ui bottom attached'>
                    <ConditionsButton floated='left' conditions={this.state.conditions} setConditions={this.setConditions} />
                    <Popup
                        trigger={
                            <Button floated='right' icon='delete' />
                        }
                        content={<Button color='red' content='Delete' onClick={this.props.deleteSelf} />}
                        on='click'
                        position='top right'
                    />
                </div>
            </Card>
        );
    }
}

const conditions = [
    { name: 'Blinded', icon: 'eye slash' },
    { name: 'Charmed', icon: 'magic' },
    { name: 'Deafened', icon: 'deaf' },
    { name: 'Frightened', icon: 'exclamation' },
    { name: 'Paralyzed', icon: 'meh' },
    { name: 'Poisoned', icon: 'syringe' },
    { name: 'Prone', icon: 'long arrow alternate down' },
    { name: 'Stunned', icon: 'question' },
    { name: 'Unconscious', icon: 'bed' }
]

class ConditionsButton extends React.Component {
    
    activateCondition = (event, data) => {
        let condition = data.content.toLowerCase();
        if (this.props.conditions.includes(condition)) {
            let newConditions = this.props.conditions.filter(item => item !== condition);                                 
            this.props.setConditions(newConditions);
        } else {
            let curConditions = this.props.conditions;
            curConditions.push(condition);
            this.props.setConditions(curConditions);
        }           
    }

    render() {
        return (
            <Popup
                trigger={
                    <Button basic floated={this.props.floated} content='Conditions' />
                }
                content={
                    <Button.Group vertical size='mini'>
                        {conditions.map((condition) => (
                                <Button
                                    basic
                                    key={condition.name + 'Button'}
                                    active={this.props.conditions.includes(condition.name.toLowerCase())}
                                    content={condition.name}
                                    icon={condition.icon}
                                    onClick={this.activateCondition} />
                        ))}
                    </Button.Group>
                }
                on='click'
                position='top left'
            />
        );
    }
}

export default BattleCard;