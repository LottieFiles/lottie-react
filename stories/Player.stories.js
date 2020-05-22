import './App.css';

import React from 'react';

import { Controls } from '../src/Controls.tsx';
import { Player } from '../src/Player.tsx';

export const LottiePlayer = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Player src="https://assets8.lottiefiles.com/temp/lf20_ssLgHu.json" autoplay style={{ height: '300px' }}>
          <Controls visible={true} buttons={['play', 'repeat', 'debug']} />
        </Player>
      </header>
    </div>
  );
};

export default {
  component: LottiePlayer,
  title: 'LottiePlayer',
};
