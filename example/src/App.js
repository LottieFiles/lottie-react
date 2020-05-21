import React from 'react';

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Player src="https://assets8.lottiefiles.com/temp/lf20_ssLgHu.json" autoplay style={{ height: '300px' }}>
          <Controls visible={true} buttons={['play', 'repeat', 'debug']} />
        </Player>
      </header>
    </div>
  );
}

export default App;
