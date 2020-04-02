import React from 'react';
import { Icon, Statistic, Card, Button, Label } from 'semantic-ui-react'

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.isTurn = false;
    }
    render() {
        return (
            <Card className="playerCard">
                <Card.Header>
                    <Label size='large' className='fluid' icon='user'>
                        <Icon name='user' />
                        {this.name}
                    </Label>
                </Card.Header>
                <Card.Content className='content center aligned'>
                    <div className='column center aligned'>
                        <Statistic size='mini'>
                            <Statistic.Value>
                                <Icon name='sort amount up' />{this.initiative}
                            </Statistic.Value>
                        </Statistic>
                    </div>
                </Card.Content>
                <div className='ui bottom attached'>
                    <Button icon floated='right' type='submit' onClick={this.deleteSelf}><Icon name='delete' /></Button>
                </div>
            </Card>
        );
    }
}

export default PlayerCard;