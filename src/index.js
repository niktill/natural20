import React from 'react';
import ReactDOM from 'react-dom';
import MonsterCard from './CardContent';
import BattleTracker from './BattleTracker';
import BattleCard from './BattleCard';


class App extends React.Component {
    

    render() {
        return (
            <div>
                <BattleTracker></BattleTracker>
            </div>
        );
    } 
};

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);