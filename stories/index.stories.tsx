import '@storybook/addon-console';

import * as React from 'react';

import { Controls } from '../src/Controls';
import { Player } from '../src/Player';

export default {
  title: 'Components',
  parameters: {
    info: { inline: true },
  },
};

export const LottiePlayer = () => {
  const onEvent = (event: any) => {
    console.log('event', event);
  };
  return (
    <div style={{ width: '374px' }}>
      <Player
        src="https://assets6.lottiefiles.com/packages/lf20_V9t630.json"
        autoplay
        loop
        background="#ffffff"
        style={{ height: '300px' }}
        renderer="svg"
        onEvent={onEvent}
      >
        <Controls
          darkTheme={true}
          showLabels={true}
          visible={true}
          buttons={['play', 'repeat', 'frame', 'debug', 'stop']}
        />
      </Player>
    </div>
  );
};
