import React from 'react';
import { Icon, Statistic } from 'semantic-ui-react'

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.isTurn = false;
    }
    render() {
        return (
            <div className='ui raised card'>
                <div className='header'>
                    <div className='ui large label fluid'>
                        <i className='icon fas fa-user'></i>
                        {this.name}
                    </div>
                </div>
                <div className='content center aligned'>
                    <Statistic size='mini'>
                        <Statistic.Value>
                            <Icon name='sort amount up' />{this.initiative}
                        </Statistic.Value>
                    </Statistic>
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

export default PlayerCard;