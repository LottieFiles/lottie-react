import * as React from 'react';

import { Controls } from '../src/Controls';
import { Player } from '../src/Player';

export default {
  title: 'Components',
  parameters: {
    info: { inline: true },
  },
};

export const LottiePlayer = () => (
  <div style={{ width: '374px' }}>
    <Player
      src="https://assets2.lottiefiles.com/packages/lf20_zezidsfk.json"
      autoplay
      loop
      background="#000000"
      style={{ height: '300px' }}
    >
      <Controls darkTheme={true} showLabels={true} visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
    </Player>
  </div>
);
