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
  <Player src="https://assets6.lottiefiles.com/private_files/lf30_T5tVEx.json" autoplay style={{ height: '300px' }}>
    <Controls visible={true} buttons={['play', 'repeat', 'debug']} />
  </Player>
);
