import lottie, { AnimationConfig, AnimationItem } from 'lottie-web';
import * as React from 'react';

/**
 * Parse a resource into a JSON object or a URL string
 */
export function parseSrc(src: string | object): string | object {
  if (typeof src === 'object') {
    return src;
  }

  try {
    return JSON.parse(src);
  } catch (e) {
    // Do nothing...
  }

  // Try construct an absolute URL from the src URL
  try {
    return new URL(src).toString();
  } catch (e) {
    // Do nothing...
  }

  return src;
}

// Define valid player states
export enum PlayerState {
  Loading = 'loading',
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped',
  Frozen = 'frozen',
  Error = 'error',
}

// Define player events
export enum PlayerEvent {
  Load = 'load',
  Error = 'error',
  Ready = 'ready',
  Play = 'play',
  Pause = 'pause',
  Stop = 'stop',
  Freeze = 'freeze',
  Loop = 'loop',
  Complete = 'complete',
  Frame = 'frame',
}

export type PlayerDirection = -1 | 1;

export interface IPlayerProps {
  id?: string;
  lottieRef?: (ref: AnimationItem) => void;
  onEvent?: (event: PlayerEvent) => any;
  onStateChange?: (state: PlayerState) => any;
  onBackgroundChange?: (color: string) => void;
  autoplay: boolean;
  background?: string;
  children?: React.ReactNode | React.ReactNode[];
  controls?: boolean;
  direction?: PlayerDirection;
  hover?: boolean;
  loop?: boolean | number;
  renderer?: 'svg' | 'canvas' | 'html';
  speed?: number;
  src: object | string;
  style?: { [key: string]: string | number };
}

interface IPlayerState {
  animationData: any;
  background: string;
  containerRef: React.Ref<HTMLDivElement> | null;
  debug?: boolean;
  instance: AnimationItem | null;
  seeker: number;
  playerState: PlayerState;
}

// Build default config for lottie-web player
const defaultOptions: Partial<AnimationConfig> = {
  rendererSettings: {
    clearCanvas: false,
    hideOnTransparent: true,
    progressiveLoad: true,
  },
};

export class Player extends React.Component<IPlayerProps, IPlayerState> {
  public static async getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.background !== prevState.background) {
      return { background: nextProps.background };
    } else {
      return null;
    }
  }

  private container: Element | null = null;

  constructor(props: IPlayerProps) {
    super(props);

    this.state = {
      animationData: null,
      background: 'transparent',
      containerRef: React.createRef(),
      debug: true,
      instance: null,
      playerState: PlayerState.Loading,
      seeker: 0,
    };
  }

  static defaultProps = {
    loop: false,
  };

  public async componentDidMount() {
    await this.createLottie();
  }

  public componentWillUnmount() {
    if (this.state.instance) {
      this.state.instance.destroy();
    }
  }

  public async componentDidUpdate(prevProps: any) {
    if (this.props.src !== prevProps.src) {
      if (this.state.instance) {
        this.state.instance.destroy();
      }
      await this.createLottie();
    }
  }

  public render() {
    const { children, loop, style, onBackgroundChange } = this.props;
    const { animationData, instance, playerState, seeker, debug, background } = this.state;

    return (
      <div>
        <div
          id={this.props.id ? this.props.id : 'lottie'}
          ref={el => (this.container = el)}
          style={{
            background,
            margin: '0 auto',
            outline: 'none',
            overflow: 'hidden',
            ...style,
          }}
        />
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              animationData,
              background,
              debug,
              instance,
              loop,
              pause: () => this.pause(),
              play: () => this.play(),
              playerState,
              seeker,
              setBackground: (value: string) => {
                this.setState({ background: value });

                if (typeof onBackgroundChange === 'function') {
                  onBackgroundChange(value);
                }
              },
              setSeeker: (f: number, p: boolean) => this.setSeeker(f, p),
              stop: () => this.stop(),
              toggleDebug: () => this.toggleDebug(),
              setLoop: (loop: boolean) => this.setLoop(loop),
            });
          }

          return null;
        })}
      </div>
    );
  }

  private toggleDebug() {
    this.setState({ debug: !this.state.debug });
  }

  private async createLottie() {
    const { autoplay, direction, loop, lottieRef, renderer, speed, src, background } = this.props;
    const { instance } = this.state;

    if (!src || !this.container) {
      return;
    }

    // Load the resource information
    try {
      // Parse the src to see if it is a URL or Lottie JSON data
      let animationData = parseSrc(src);

      if (typeof animationData === 'string') {
        const fetchResult = await fetch(animationData as string);
        animationData = await fetchResult.json();
      }

      // Clear previous animation, if any
      if (instance) {
        instance.destroy();
      }

      // Initialize lottie player and load animation
      const newInstance = lottie.loadAnimation({
        ...defaultOptions,
        animationData,
        autoplay: false,
        container: this.container as Element,
        loop: loop || false,
        renderer,
      });

      this.setState({ animationData });

      // Handle new frame event
      newInstance.addEventListener('enterFrame', () => {
        this.triggerEvent(PlayerEvent.Frame);

        this.setState({
          seeker: Math.floor((newInstance as any).currentFrame),
        });
      });

      // Handle lottie-web ready event
      newInstance.addEventListener('DOMLoaded', () => {
        this.triggerEvent(PlayerEvent.Load);
      });

      // Handle animation data load complete
      newInstance.addEventListener('data_ready', () => {
        this.triggerEvent(PlayerEvent.Ready);
      });

      // Set error state when animation load fail event triggers
      newInstance.addEventListener('data_failed', () => {
        this.setState({ playerState: PlayerState.Error });
      });

      // Set state to paused if loop is off and anim has completed
      newInstance.addEventListener('complete', () => {
        this.setState({ playerState: PlayerState.Paused });
        this.setSeeker(0);
      });

      // Set initial playback speed and direction
      if (speed) {
        this.setPlayerSpeed(speed);
      }

      if (direction) {
        this.setPlayerDirection(direction);
      }

      if (background) {
        this.setState({ background });
      }

      this.setState({ instance: newInstance }, () => {
        if (typeof lottieRef === 'function') {
          lottieRef(newInstance);
        }
        if (autoplay) {
          this.play();
        }
      });
    } catch (e) {
      this.setState({ playerState: PlayerState.Error });
    }
  }

  public play() {
    const { instance } = this.state;

    if (instance) {
      this.triggerEvent(PlayerEvent.Play);

      instance.play();

      this.setState({ playerState: PlayerState.Playing });
    }
  }

  public pause() {
    const { instance } = this.state;

    if (instance) {
      this.triggerEvent(PlayerEvent.Play);

      instance.pause();

      this.setState({ playerState: PlayerState.Paused });
    }
  }

  public stop() {
    const { instance } = this.state;

    if (instance) {
      this.triggerEvent(PlayerEvent.Play);

      instance.stop();

      this.setState({ playerState: PlayerState.Playing });
    }
  }

  public setPlayerSpeed(speed: number) {
    const { instance } = this.state;

    if (instance) {
      instance.setSpeed(speed);
    }
  }

  public setPlayerDirection(direction: PlayerDirection) {
    const { instance } = this.state;

    if (instance) {
      instance.setDirection(direction);
    }
  }

  public setSeeker(seek: number, play = false) {
    const { instance, playerState } = this.state;

    if (instance) {
      if (!play || playerState !== PlayerState.Playing) {
        instance.goToAndStop(seek, true);
        this.setState({ playerState: PlayerState.Paused });
      } else {
        instance.goToAndPlay(seek, true);
      }
    }
  }

  public setLoop(loop: boolean) {
    const { instance } = this.state;

    if (instance) {
      instance.loop = loop;
      this.setState({ instance: instance });
    }
  }
  private triggerEvent(event: PlayerEvent) {
    const { onEvent } = this.props;

    if (onEvent) {
      onEvent(event);
    }
  }
}
