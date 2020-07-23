import './Styles.css';

import * as React from 'react';

// const active = 'rgba(15, 204, 206, 0.4)';
// const inactive = '#dbdbdb';

interface ISeekerProps {
  className?: string;
  disabled?: boolean;
  max: number;
  min: number;
  onChange: (e: any) => void;
  onChangeStart?: (v: number) => void;
  onChangeEnd?: (v: number) => void;
  showMaxLabel?: boolean;
  showMinLabel?: boolean;
  step: number;
  value: number;
}

export class Seeker extends React.Component<ISeekerProps> {
  inputRef: any = React.createRef();

  constructor(props: ISeekerProps) {
    super(props);
    this.state = { value: 0 };
  }

  handleChange = () => (event: any) => {
    const value = event.target.value;
    const frame = Math.floor((value / 100) * this.props.max);
    this.props.onChange(frame);
  };

  render() {
    const progress = (this.props.value / this.props.max) * 100;
    const seekerStyle = {
      backgroundImage: `-webkit-gradient(linear, left top, right top, color-stop(${progress}%, rgba(15, 204, 206, 0.4)), color-stop(${progress}%, #DAE1E7))`,
    };
    const seekerContainerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    } as React.CSSProperties;
    return (
      <div style={seekerContainerStyle}>
        <input
          ref={this.inputRef}
          id="track"
          className="progress"
          name="progress"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onInput={this.handleChange()}
          style={seekerStyle}
        />
      </div>
    );
  }
}
