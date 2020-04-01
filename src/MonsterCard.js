import React from 'react';
import PlayerCard from './PlayerCard'
import { Grid, Icon, Statistic, Progress, Form, Button } from 'semantic-ui-react'


class MonsterCard extends PlayerCard {
    constructor(props) {
        super(props);
        this.hitPoints = props.hitPoints;
        this.armourClass = props.armourClass

        this.state = { currentHitPoints: props.hitPoints }
    }
    updateHitPoints(event) {
        console.log(this);

    }
    render() {
        return (
            <div className='ui card monsterCard'>
                <div className='header'>
                    <div className='column'>
                        <div className='ui large label fluid'>
                            <i className='icon fas fa-user'></i>
                            {this.name}
                        </div>
                    </div>
                </div>
                <div className='content center aligned'>
                    <div className='ui two column doubling stackable grid container'>
                        <div className='column center aligned'>
                            <Statistic size='mini'>
                                <Statistic.Value>
                                    <Icon name='sort amount up' />{this.initiative}
                                </Statistic.Value>
                            </Statistic>
                        </div>
                        <div className='column center aligned'>
                            <Statistic size='mini'>
                                <Statistic.Value>
                                    <Icon name='shield' />{this.armourClass}
                                </Statistic.Value>
                            </Statistic>
                        </div>
                    </div>
                    <div className='ui hidden divider'></div>
                    <Progress
                        indicating={true}
                        value={this.state.currentHitPoints}
                        total={this.hitPoints}
                        progress='ratio'
                        label='Hit Points'
                        active={false} />
                    <div className='ui hidden divider'></div>
                    <Grid centered>
                        <Form unstackable>
                            <Form.Group className="center aligned">
                                <Form.Input style={{ width: '100px' }} placeholder='Damage' />
                                <Button icon type='submit'><Icon name='checkmark' /></Button>
                            </Form.Group>
                        </Form>
                    </Grid>

                </div>
                <div className='ui bottom attached'>
                    <button className='ui icon button right floated'>
                        <i className='delete icon'></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default MonsterCard;