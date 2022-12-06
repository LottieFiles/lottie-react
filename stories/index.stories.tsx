import '@storybook/addon-console';

import * as React from 'react';
import { useCallback, useRef, useEffect } from 'react';

import { Controls } from '../src/Controls';
import { Player } from '../src/Player';

export default {
  title: 'Components',
  parameters: {
    info: { inline: true },
  },
};

export const LottiePlayer = (): any => {
  const playerRef = useRef(null);

  const onEvent = useCallback((event: any) => {
    console.log('event', event);
  }, []);

  useEffect(() => {
    if (playerRef !== null && playerRef.current !== null) {
      // @ts-ignore: Object is possibly 'null'.
      console.log(playerRef.current.getVersions());
      console.log('Calling versions()');
    }
  }, [playerRef]);

  return (
    <div style={{ width: '374px' }}>
      <Player
        ref={playerRef}
        src="https://assets1.lottiefiles.com/packages/lf20_ybj0fjlo.json"
        hover
        loop
        background="#ffffff"
        style={{ height: '300px' }}
        renderer="svg"
        onEvent={onEvent}
        className="test"
        keepLastFrame={true}
      >
        <Controls
          transparentTheme={true}
          showLabels={true}
          visible={true}
          buttons={['play', 'repeat', 'frame', 'debug', 'snapshot', 'background', 'stop']}
        />
      </Player>
    </div>
  );
};
