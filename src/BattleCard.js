import React from 'react';
import { PlayerCardContent, MonsterCardContent } from './CardContent';
import { Icon, Button, Card, Label, Message, Popup, List } from 'semantic-ui-react'


class BattleCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.cardType = props.cardType;
        this.armourClass = props.armourClass;
        this.hitPoints = props.hitPoints;
        this.conditions = ['deafened', 'blinded'];
    }

    renderCardContent() {
        if (this.cardType === 'player') {
            return (
                <PlayerCardContent
                    initiative={this.initiative}
                    conditions={this.conditions}>
                </PlayerCardContent>
            );
        } else if (this.cardType === 'monster') {
            return (
                <MonsterCardContent
                    initiative={this.initiative}
                    armourClass={this.armourClass}
                    hitPoints={this.hitPoints}
                    conditions={this.conditions}>
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
                    <ConditionsButton floated='left' conditions={this.conditions}/>
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

class ConditionsButton extends React.Component {
    constructor(props) {
        super(props);
        this.conditions = props.conditions;
    }
    render() {
        return (
            <Popup
                trigger={
                    <Button basic floated={this.props.floated} content='Conditions' />
                }
                content={
                    <List>
                        <List.Item></List.Item>
                    </List>
                }
                on='click'
                position='top left'
            />
        );
    }
}

export default BattleCard;