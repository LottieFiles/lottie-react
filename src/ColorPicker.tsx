import * as React from 'react';

interface ColorPickerProps {
  colorChangedEvent?: (hex: string) => void;
}
export class ColorPicker extends React.Component<ColorPickerProps> {
  state = {
    red: 0,
    green: 0,
    blue: 0,
    rgba: null,
    hex: '#000000',
    colorComponents: [],
  };

  handleChange = (rgb: string, value: any) => {
    if (rgb === 'r') {
      const hex =
        '#' +
        (value | (1 << 8)).toString(16).slice(1) +
        (this.state.green | (1 << 8)).toString(16).slice(1) +
        (this.state.blue | (1 << 8)).toString(16).slice(1);
      this.setState({ hex: hex });
    } else if (rgb === 'g') {
      const hex =
        '#' +
        (this.state.red | (1 << 8)).toString(16).slice(1) +
        (value | (1 << 8)).toString(16).slice(1) +
        (this.state.blue | (1 << 8)).toString(16).slice(1);
      this.setState({ hex: hex });
    } else if (rgb === 'b') {
      const hex =
        '#' +
        (this.state.red | (1 << 8)).toString(16).slice(1) +
        (this.state.green | (1 << 8)).toString(16).slice(1) +
        (value | (1 << 8)).toString(16).slice(1);
      this.setState({ hex: hex });
    }
  };
  parseColor = (input: string) => {
    if (typeof input !== 'string') {
      return;
    }
    if (input[0] === '#') {
      const _colorComponents =
        input.length === 4
          ? [input.slice(1, 2), input.slice(2, 3), input.slice(3, 4)].map(n => parseInt(`${n}${n}`, 16))
          : [input.slice(1, 3), input.slice(3, 5), input.slice(5, 7)].map(n => parseInt(n, 16));
      this.setState({ colorComponents: _colorComponents });
    } else if (input.startsWith('rgb')) {
      const _colorComponents = input.match(/\d+/g)?.map(n => parseInt(n));
      if (_colorComponents !== undefined) {
        this.setState({ colorComponents: _colorComponents });
      }
    }

    if (this.state.colorComponents.length) {
      this.setState({ red: this.state.colorComponents[0] });
      this.setState({ green: this.state.colorComponents[1] });
      this.setState({ blue: this.state.colorComponents[2] });
    }
  };

  componentDidUpdate(_prevProps: any, prevState: any) {
    if (this.props.colorChangedEvent) {
      if (this.state.hex !== prevState.hex) {
        this.props.colorChangedEvent(this.state.hex);
      }
    }
    return true;
  }
  public render() {
    return (
      <div className="lf-color-picker">
        <div className="lf-color-selectors">
          <div className="lf-color-component">
            <strong>Red</strong>
            <input
              type="range"
              min="0"
              max="255"
              value={this.state.red}
              onChange={event => {
                this.setState({ red: event.target.value });
                this.handleChange('r', event.target.value);
              }}
            />
            <input
              className="lf-text-input"
              type="number"
              min="0"
              max="255"
              value={this.state.red}
              onChange={event => {
                this.setState({ red: event.target.value });
                this.handleChange('r', event.target.value);
              }}
            />
          </div>
          <div className="lf-color-component">
            <strong>Green</strong>
            <input
              type="range"
              min="0"
              max="255"
              value={this.state.green}
              onChange={event => {
                this.setState({ green: event.target.value });
                this.handleChange('g', event.target.value);
              }}
            />
            <input
              className="lf-text-input"
              type="number"
              min="0"
              max="255"
              value={this.state.green}
              onChange={event => {
                this.setState({ green: event.target.value });
                this.handleChange('g', event.target.value);
              }}
            />
          </div>
          <div className="lf-color-component">
            <strong>Blue</strong>
            <input
              type="range"
              min="0"
              max="255"
              value={this.state.blue}
              onChange={event => {
                this.setState({ blue: event.target.value });
                this.handleChange('b', event.target.value);
              }}
            />
            <input
              className="lf-text-input"
              type="number"
              min="0"
              max="255"
              value={this.state.blue}
              onChange={event => {
                this.setState({ blue: event.target.value });
                this.handleChange('b', event.target.value);
              }}
            />
          </div>
        </div>
        <div className="lf-color-preview">
          <div
            className="lf-preview"
            style={{ background: `rgb(${this.state.red}, ${this.state.green}, ${this.state.blue})` }}
          />
          <div>
            <input
              className="lf-text-input"
              type="text"
              value={this.state.hex}
              onChange={e => {
                this.setState({ hex: e.target.value });
                this.parseColor(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
