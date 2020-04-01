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
            <div className="ui raised card">
                <div class="header">
                    <div class="ui large label">
                        <i class="icon fas fa-user"></i>
                        {this.name}
                    </div>
                </div>
                <div class="content">
                    <div class="ui mini no-margin statistic center aligned">
                        <div class="value">
                            {this.initiative}
                        </div>
                        Initiative
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

export default PlayerCard;