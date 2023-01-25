import lottie, { AnimationItem } from 'lottie-web';
import * as React from 'react';

import { LOTTIE_WEB_VERSION, REACT_LOTTIE_PLAYER_VERSION } from './versions';

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

// Necessary so that we can add Lottie to the window afterwards
declare global {
  interface Window {
    lottie: any;
  }
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
  InstanceSaved = 'instanceSaved',
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

export type Versions = {
  lottieWebVersion: string;
  lottiePlayerVersion: string;
};

export type PlayerDirection = -1 | 1;

export interface IPlayerProps {
  id?: string;
  lottieRef?: (ref: AnimationItem) => void;
  onEvent?: (event: PlayerEvent) => any;
  onStateChange?: (state: PlayerState) => any;
  onBackgroundChange?: (color: string) => void;
  autoplay?: boolean;
  background?: string;
  children?: React.ReactNode | React.ReactNode[];
  controls?: boolean;
  direction?: PlayerDirection;
  hover?: boolean;
  loop?: boolean | number;
  renderer?: any;
  speed?: number;
  src: object | string;
  style?: React.CSSProperties;
  rendererSettings?: object;
  keepLastFrame?: boolean;
  className?: string;
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
const defaultOptions = {
  clearCanvas: false,
  hideOnTransparent: true,
  progressiveLoad: true,
};

export class Player extends React.Component<IPlayerProps, IPlayerState> {
  public static async getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.background !== prevState.background) {
      return { background: nextProps.background };
    } else {
      return null;
    }
  }

  public container: Element | null = null;
  public unmounted = false;

  constructor(props: IPlayerProps) {
    super(props);

    if (typeof window !== 'undefined') {
      window.lottie = lottie;
    }
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

  /**
   * Returns the lottie-web version and this player's version
   */
  public getVersions(): Versions {
    return {
      lottieWebVersion: LOTTIE_WEB_VERSION,
      lottiePlayerVersion: REACT_LOTTIE_PLAYER_VERSION,
    };
  }

  static defaultProps = {
    loop: false,
  };

  public async componentDidMount() {
    if (!this.unmounted) {
      await this.createLottie();
    }
  }

  public componentWillUnmount() {
    this.unmounted = true;
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
  handleBgChange = (childData: any) => {
    this.setState({ background: childData });
  };
  triggerDownload = (dataUri: any, filename: any) => {
    const element = document.createElement('a');

    element.href = dataUri;
    element.download = filename;
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  snapshot = (download = true) => {
    let data;
    const id = this.props.id ? this.props.id : 'lottie';
    const lottieElement = document.getElementById(id);
    if (this.props.renderer === 'svg') {
      // Get SVG element and serialize markup
      if (lottieElement) {
        const svgElement = lottieElement.querySelector('svg');

        if (svgElement) {
          const serializedSvg = new XMLSerializer().serializeToString(svgElement);
          data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(serializedSvg);
        }
      }

      // Trigger file download if needed
      if (download) {
        // this.triggerDownload(data, `snapshot_${progress}.svg`);
        this.triggerDownload(data, `snapshot.svg`);
      }
    } else if (this.props.renderer === 'canvas') {
      if (lottieElement) {
        const canvas = lottieElement.querySelector('canvas');
        if (canvas) {
          data = canvas.toDataURL('image/png');
        }
      }
      // Trigger file download if needed
      if (download) {
        // this.triggerDownload(data, `snapshot_${progress}.png`);
        this.triggerDownload(data, `snapshot.png`);
      }
    }

    return data;
  };

  public render() {
    const { children, loop, style, onBackgroundChange, className } = this.props;
    const { animationData, instance, playerState, seeker, debug, background } = this.state;

    return (
      <div className="lf-player-container">
        {this.state.playerState === PlayerState.Error ? (
          <div className="lf-error">
            <span aria-label="error-symbol" role="img">
              ⚠️
            </span>
          </div>
        ) : (
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
            className={className}
          ></div>
        )}
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
              colorChangedEvent: (hex: string) => {
                this.handleBgChange(hex);
              },
              snapshot: () => {
                this.snapshot();
              },
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
    const {
      autoplay,
      direction,
      loop,
      lottieRef,
      renderer,
      speed,
      src,
      background,
      rendererSettings,
      hover,
    } = this.props;
    const { instance } = this.state;

    if (!src || !this.container) {
      return;
    }

    // Load the resource information
    try {
      // Parse the src to see if it is a URL or Lottie JSON data
      let animationData = parseSrc(src);

      if (typeof animationData === 'string') {
        const fetchResult = await fetch(animationData as string).catch(() => {
          this.setState({ playerState: PlayerState.Error });
          this.triggerEvent(PlayerEvent.Error);
          throw new Error('@LottieFiles/lottie-react: Animation data could not be fetched.');
        });

        animationData = await fetchResult.json().catch(() => {
          this.setState({ playerState: PlayerState.Error });
          this.triggerEvent(PlayerEvent.Error);
          throw new Error('@LottieFiles/lottie-react: Animation data could not be fetched.');
        });
      }

      // Clear previous animation, if any
      if (instance) {
        instance.destroy();
      }

      // Initialize lottie player and load animation
      const newInstance = lottie.loadAnimation({
        rendererSettings: rendererSettings || defaultOptions,
        animationData,
        autoplay: autoplay || false,
        container: this.container as Element,
        loop: loop || false,
        renderer,
      });
      if (speed) {
        newInstance.setSpeed(speed);
      }
      this.setState({ animationData });

      this.setState({ instance: newInstance }, () => {
        this.triggerEvent(PlayerEvent.InstanceSaved);

        if (typeof lottieRef === 'function') {
          lottieRef(newInstance);
        }
        if (autoplay) {
          this.play();
        }
      });

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
        this.triggerEvent(PlayerEvent.Error);
      });

      // Handle new loop event
      newInstance.addEventListener('loopComplete', () => {
        this.triggerEvent(PlayerEvent.Loop);
      });

      // Set state to paused if loop is off and anim has completed
      newInstance.addEventListener('complete', () => {
        this.triggerEvent(PlayerEvent.Complete);
        this.setState({ playerState: PlayerState.Paused });

        if (!this.props.keepLastFrame || this.props.loop) {
          this.setSeeker(0);
        }
      });

      // Set handlers to auto play animation on hover if enabled
      if (this.container) {
        this.container.addEventListener('mouseenter', () => {
          if (hover && this.state.playerState !== PlayerState.Playing) {
            if (this.props.keepLastFrame) {
              this.stop();
            }
            this.play();
          }
        });
        this.container.addEventListener('mouseleave', () => {
          if (hover && this.state.playerState === PlayerState.Playing) {
            this.stop();
          }
        });
      }

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
    } catch (e) {
      this.setState({ playerState: PlayerState.Error });
      this.triggerEvent(PlayerEvent.Error);
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
      this.triggerEvent(PlayerEvent.Pause);

      instance.pause();

      this.setState({ playerState: PlayerState.Paused });
    }
  }

  public stop() {
    const { instance } = this.state;

    if (instance) {
      this.triggerEvent(PlayerEvent.Stop);

      instance.stop();

      this.setState({ playerState: PlayerState.Stopped });
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
        this.triggerEvent(PlayerEvent.Pause);
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
