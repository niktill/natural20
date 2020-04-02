import React from 'react';
import {PlayerCardContent, MonsterCardContent} from './CardContent';
import { Icon, Button, Card, Label } from 'semantic-ui-react'


class BattleCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.cardType = props.cardType;
        this.armourClass = props.armourClass;
        this.hitPoints = props.hitPoints;
    }
    deleteCard = () => {        
    }
    renderCardContent() {
        if (this.cardType == 'player') {
            return (
                <PlayerCardContent initiative={this.initiative}></PlayerCardContent>
            );
        } else if (this.cardType == 'monster') {
            return (
                <MonsterCardContent 
                initiative={this.initiative}
                armourClass={this.armourClass}
                hitPoints={this.hitPoints}>
                </MonsterCardContent>
            );
        } else {
            return (
                <p>Invalid Card Type</p>
            );
        }
    }
    render() {
        return (
            <Card className="monsterCard">
                <Card.Header>
                    <Label size='large' className='fluid'>
                        <Icon name='user' />
                        {this.name}
                    </Label>
                </Card.Header>
                {this.renderCardContent()}
                <div className='ui bottom attached'>
                    <Button icon floated='right' onClick={this.deleteCard.bvin}><Icon name='delete' /></Button>
                </div>
            </Card>
        );
    }
}

export default BattleCard;