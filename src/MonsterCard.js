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
                    <span class="left floated">
                    <div class="ui huge label">
                        <i class="icon fas fa-user"></i>
                        {this.name}
                    </div>
                    </span>
                    <span class="right floated headerStats">
                        <div class="ui mini no-margin statistic center aligned">
                            <div class="value">
                                {this.armourClass}
                            </div>
                            AC
                        </div>
                        <div class="ui mini no-margin statistic center aligned">
                            <div class="value">
                                {this.initiative}
                            </div>
                            Initiative
                        </div>
                    </span>
                </div>
                <div class="content">      
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