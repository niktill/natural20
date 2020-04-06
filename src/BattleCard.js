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
    }

    renderCardContent() {
        if (this.cardType === 'player') {
            return (
                <PlayerCardContent initiative={this.initiative}></PlayerCardContent>
            );
        } else if (this.cardType === 'monster') {
            return (
                <MonsterCardContent
                    initiative={this.initiative}
                    armourClass={this.armourClass}
                    hitPoints={this.hitPoints}>
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
                        <Icon size='large' name={this.cardType === 'player' ? 'user' : 'bug'} />
                        {this.name}
                    </Label>
                </Card.Header>
                {this.renderCardContent()}
                <div className='ui bottom attached'>
                    <Popup floated='right'
                        trigger={
                            <Button floated='right' icon='delete' />
                        }
                        content={<Button color='red' content='Delete Card' />}
                        on='click'
                        position='top right'
                        onClick={this.props.deleteSelf}
                    />
                </div>
            </Card>
        );
    }
}

export default BattleCard;