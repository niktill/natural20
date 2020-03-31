// Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';
import PlayerCard from './PlayerCard'
import MonsterCard from './MonsterCard'


// Create React Component
const App = () => {
    return (
        <div className="ui cards">
            <PlayerCard name="Nik" initiative="12"/>
            <PlayerCard name="Nik"/>
            <PlayerCard name="Nik"/>
            <MonsterCard name="Monster"/>
        </div>
    );
};

// Render React Component
ReactDOM.render(
    <App />,
    document.querySelector("#root")
);