// Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import PlayerCard from './PlayerCard'
import MonsterCard from './MonsterCard'


// Create React Component
const App = () => {
    return (
        <div id='battleCards' className='ui cards'>
            <PlayerCard name='Nik' initiative='12' />
            <PlayerCard name='Nik' />
            <PlayerCard name='Nik' />
            <MonsterCard name='Veteran Goblin Raider'
                health='19'
                armourClass='12'
                initiative='10'
                hitPoints='32' />
            <MonsterCard name='Veteran Goblin Raider'
                health='19'
                initiative='10'
                hitPoints='32' />
        </div>
    );
};

// Render React Component
ReactDOM.render(
    <App />,
    document.querySelector('#root')
);