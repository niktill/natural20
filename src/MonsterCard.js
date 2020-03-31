import React from 'react';
import PlayerCard from './PlayerCard'

class MonsterCard extends PlayerCard {
    constructor(props) {
        super(props);
        this.hitPoints = props.hitPoints;
        this.armourClass = props.armourClass
    }
    render() {
        return (
            <div className="ui card">
                <div class="header">    
                    <div class="left aligned">
                    <div class="ui huge label">
                        <i class="user circle icon"></i>
                        {this.name}
                    </div>
                        <div class="ui right floated mini statistic">
                            <div class="value">
                                {this.initiative}
                            </div>
                            Initiative
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MonsterCard;