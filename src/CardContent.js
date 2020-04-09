import React from 'react';
import { Grid, Icon, Statistic, Progress, Form, Button, Card, List, Popup } from 'semantic-ui-react'

export class PlayerCardContent extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.conditions = props.conditions;
    }
    render() {
        return (
            <Card.Content className='content center aligned'>
                <div className='column center aligned'>
                    <Statistic size='mini'>
                        <Statistic.Value>
                            <Icon name='sort amount up' />{this.initiative}
                        </Statistic.Value>
                    </Statistic>
                </div>
                <div className='ui hidden divider'></div>
                {this.conditions.length > 0 ? <Conditions conditions={this.conditions} /> : null}
            </Card.Content>
        );
    }
}

export class MonsterCardContent extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.armourClass = props.armourClass;
        this.hitPoints = props.hitPoints;
        this.updateHitPoints = this.updateHitPoints.bind(this);

        this.state = { currentHitPoints: props.hitPoints };
    }

    updateHitPoints = (event) => {
        event.preventDefault();

        let dmg = event.target.damage.value;
        this.setState({ dmgVal: dmg });

        let newHitPoints = this.state.currentHitPoints - dmg;
        if (newHitPoints > 0) {
            if (newHitPoints > this.hitPoints) {
                this.setState({ currentHitPoints: this.hitPoints });
            } else {
                this.setState({ currentHitPoints: newHitPoints })
            }
        } else {
            this.setState({ currentHitPoints: 0 });
        }
    }

    render() {
        return (
            <Card.Content className='content center aligned'>
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
                    label={<div className='label'><Icon name='heart outline'></Icon>Hit Points</div>}
                    active={false}
                    disabled={this.state.currentHitPoints === 0 ? true : false} />
                <div className='ui hidden divider'></div>
                <Grid centered>
                    <Form unstackable onSubmit={this.updateHitPoints}>
                        <Form.Group className="center aligned">
                            <Form.Input
                                type="number"
                                style={{ width: '100px' }}
                                name="damage"
                                placeholder='Damage'
                                required={true} />
                            <Button icon type='submit'><Icon name='checkmark' /></Button>
                        </Form.Group>
                    </Form>
                </Grid>
            </Card.Content>
        );
    }
}

const conditionIcons = {
    blinded: 'eye slash',
    charmed: 'magic',
    deafened: 'deaf',
    frightened: 'exclamation',
    paralyzed: 'meh',
    poisoned: 'syringe',
    prone: 'long arrow alternate down',
    stunned: 'question',
    unconscious: 'bed'
}

class Conditions extends React.Component {
    constructor(props) {
        super(props);
        this.conditions = props.conditions;

    }

    render() {
        return (
            <div>
                <p>Conditons</p>
                <List horizontal={true}>
                    {this.conditions.map((condition) => (
                        <List.Item key={condition}>
                            <Popup position='top center'
                                trigger={<Icon size='large' name={conditionIcons[condition]} />}
                                content={condition.charAt(0).toUpperCase() + condition.slice(1)}
                                size='mini'>
                            </Popup>
                        </List.Item>
                    ))}
                </List>
            </div>
        );
    }

}
