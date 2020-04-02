import React from 'react';
import ReactDOM from 'react-dom';
import PlayerCard from './PlayerCard';
import MonsterCard from './MonsterCard';
import BattleTracker from './BattleTracker';

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