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
            <div className="ui card monsterCard">
                <div class="header">
                    <div class="column">
                        <div class="ui large label">
                            <i class="icon fas fa-user"></i>
                            {this.name}
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="ui two column doubling stackable grid container">
                        <div class="column">
                            <div class="ui mini no-margin statistic center aligned">
                                <div class="value">
                                    {this.initiative}
                                </div>
                                Initiative
                            </div>
                        </div>
                        <div class="column">
                            <div class="ui mini no-margin statistic center aligned">
                                <div class="value">
                                    {this.armourClass}
                                </div>
                                AC
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui bottom attached">
                    <button class="ui icon button right floated">
                        <i class="delete icon"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default MonsterCard;