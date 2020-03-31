import React from 'react';

class PlayerCard extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.initiative = props.initiative;
        this.isTurn = false;
    }
    render() {
        return (
            <div className="ui card">
                <div class="header">    
                    <div class="left aligned">
                    <div class="ui huge label">
                        <i class="icon fas fa-user"></i>
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
                <div class="content">

                </div>
            </div>
        );
    }
}

export default PlayerCard;