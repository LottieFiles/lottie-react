import * as React from 'react';
import styled from 'styled-components';

import { PlayerState } from './Player';
import { Seeker } from './Seeker';

const ControlButton = styled.div`
  display: inline-flex;
  cursor: pointer;
`;
interface IControlProps {
  instance?: any;
  loop?: boolean;
  pause?: () => void;
  play?: () => void;
  playerState?: PlayerState;
  seeker?: number;
  setLoop?: (value: boolean) => void;
  setSeeker?: (seek: number, play: boolean) => void;
  stop?: () => void;
  visible?: boolean;
  buttons?: string[];
  debug?: boolean;
  toggleDebug?: () => void;
}

export class Controls extends React.Component<IControlProps, { mouseDown: boolean; activeFrame: number }> {
  public constructor(props: IControlProps) {
    super(props);

    this.state = {
      activeFrame: 0,
      mouseDown: false,
    };
  }

  public render() {
    const { instance, loop, playerState, seeker, setLoop, setSeeker, play, pause, stop, visible, buttons } = this.props;

    // Render nothing if lottie instance is not available
    if (!instance) {
      return null;
    }

    // Hide controls if not set to visible
    if (!visible) {
      return null;
    }

    const showPlayButton = !buttons || buttons.includes('play');
    const showStopButton = !buttons || buttons.includes('stop');
    const showRepeatButton = !buttons || buttons.includes('repeat');

    return (
      <div
        style={{
          display: 'grid',
          height: '60px',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          paddingLeft: '10px',
          paddingRight: '10px',
          gridColumnGap: '10px',
          gridTemplateColumns: '25px 1fr 25px',
        }}
      >
        {showPlayButton && (
          <ControlButton
            onClick={() => {
              if (playerState === PlayerState.Playing) {
                if (typeof pause === 'function') {
                  pause();
                }
              } else {
                if (typeof play === 'function') {
                  play();
                }
              }
            }}
            className={playerState === PlayerState.Playing || playerState === PlayerState.Paused ? 'active' : ''}
          >
            {playerState === PlayerState.Playing ? (
              <svg width="24" height="24">
                <path d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z" />
              </svg>
            ) : (
              <svg width="24" height="24">
                <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />
              </svg>
            )}
          </ControlButton>
        )}
        {showStopButton && (
          <ControlButton onClick={() => stop && stop()} className={playerState === PlayerState.Stopped ? 'active' : ''}>
            <svg width="24" height="24">
              <path d="M6 6h12v12H6V6z" />
            </svg>
          </ControlButton>
        )}
        <Seeker
          min={1}
          step={1}
          max={instance ? instance.totalFrames : 1}
          value={seeker || 1}
          onChange={(newFrame: any) => {
            if (setSeeker) {
              this.setState({ activeFrame: newFrame }, () => {
                setSeeker(newFrame, false);
              });
            }
          }}
          onChangeEnd={(newFrame: any) => {
            if (setSeeker) {
              this.setState({ activeFrame: newFrame }, () => {
                setSeeker(newFrame, false);
              });
            }
          }}
        />
        {showRepeatButton && (
          <ControlButton onClick={() => setLoop && setLoop(true)} className={loop ? 'active' : ''}>
            <svg width="24" height="24">
              <path d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z" />
            </svg>
          </ControlButton>
        )}
      </div>
    );
  }
}
