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
  showLabels?: boolean;
  step: number;
  value: number;
  darkTheme?: boolean;
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
      marginRight: '5px',
      marginLeft: '5px',
      position: 'relative',
    } as React.CSSProperties;

    const minLabelStyle = {
      position: 'absolute',
      left: 0,
      marginTop: '8px',
      width: '20px',
      display: 'block',
      border: '0px',
      backgroundColor: this.props.darkTheme ? '#505050' : 'rgb(218, 225, 231)',
      color: this.props.darkTheme ? '#B9B9B9' : '#555',
      padding: '2px',
      textAlign: 'center',
      borderRadius: '3px',
      fontSize: '8px',
      fontWeight: 'bold',
    } as React.CSSProperties;
    const maxLabelStyle = {
      position: 'absolute',
      right: 0,
      marginTop: '8px',
      width: '20px',
      display: 'block',
      border: '0px',
      backgroundColor: this.props.darkTheme ? '#505050' : 'rgb(218, 225, 231)',
      color: this.props.darkTheme ? '#B9B9B9' : '#555',
      padding: '2px',
      textAlign: 'center',
      borderRadius: '3px',
      fontSize: '8px',
      fontWeight: 'bold',
    } as React.CSSProperties;
    return (
      <div style={seekerContainerStyle}>
        <input
          ref={this.inputRef}
          id="track"
          className="lf-progress"
          name="progress"
          aria-label="progress"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onInput={this.handleChange()}
          onChange={this.handleChange()}
          style={seekerStyle}
        />
        {this.props.showLabels && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={minLabelStyle}>{this.props.min}</div>
            <div style={maxLabelStyle}>{this.props.max}</div>
          </div>
        )}
      </div>
    );
  }
}
