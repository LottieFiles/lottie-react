import { styled } from 'fannypack';
import * as React from 'react';
import { useMousePosition } from './useMousePosition';

const SeekerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  position: relative;

  .labels {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
  }
`;

const LabelContainer = styled.div`
  margin-top: 8px;
  width: 25px;
  display: block;
  border: 0px;
  background-color: #fffff;
  color: #000000;
  padding: 2px;
  text-align: center;
  border-radius: 3px;
  font-size: 8px;
  font-weight: bold;
  user-select: none;
  font-family: 'Inter', sans-serif;
`;

const TrackContainer = styled.div`
  height: 1px;
  position: relative;
  border-top: 3px rgba(196, 196, 196, 0.5) solid;
  border-radius: 3px;
  display: flex;
  width: 100%;
  z-index: 100;
`;

const MarkerContainer = styled.div`
  box-sizing: content-box;
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
  font-size: 8px;
  color: rgba(0, 0, 0, 1);
  text-overflow: clip;
  background: #ff8c30;
  transform: rotateZ(-45deg);
  margin-top: 5px;
  opacity: 0.5;
  cursor: pointer;

  :hover {
    opacity: 1;
  }
`;

const Marker = styled.div`
  margin-top: -20px;
  font-size: 10px;
  user-select: none;
`;

const SliderBlob = styled.div`
  background: #009688;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  margin-top: -7px;
  cursor: pointer;
`;

interface ILabelProps {
  children: React.ReactNode;
  formatter?: (value: any) => React.ReactNode;
  type: string;
  style?: any;
  visible?: boolean;
}

export const Label: React.FC<ILabelProps> = ({ children, formatter, style, type, visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <LabelContainer className={`seeker-label seeker-label-${type}`} style={style}>
      {typeof formatter === 'function' ? formatter(children) : children}
    </LabelContainer>
  );
};

interface ITrackMarker {
  percentage: number;
  class?: string;
  width: number;
  id: string;
  content: string;
  onClick: any;
}

interface ITrackProps {
  children?: any;
  markers: ITrackMarker[];
  trackDrag: boolean;
  onDrag: (event: any) => void;
  style?: any;
}

export const Track: React.FC<ITrackProps> = ({ children, markers, onDrag, style, trackDrag }) => {
  const trackElement = React.useRef<any>();
  const position = useMousePosition(trackElement);

  const handleMouseMove = (event: any) => {
    if (trackDrag) {
      const rect = trackElement.current.getBoundingClientRect();
      onDrag((position.x - rect.left) / rect.width);
    }
  };

  return (
    <TrackContainer style={style} onMouseMove={handleMouseMove} ref={trackElement}>
      {markers &&
        markers.map((marker, i) => {
          const left = `calc(${marker.percentage * 100}% - ${Math.round(marker.width / 2)}px)`;
          return (
            <MarkerContainer
              key={marker.percentage}
              className={marker.class}
              id={marker.id}
              onClick={e => {
                e.stopPropagation();
                marker.onClick(marker);
              }}
              style={{
                left,
                position: 'absolute',
                textAlign: 'center',
              }}
            >
              {marker.content}
            </MarkerContainer>
          );
        })}
      {children}
    </TrackContainer>
  );
};

interface ISliderProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onMouseDown: (event: any) => void;
  onMouseUp: (event: any) => void;
  percentage: number;
  style?: any;
  width: number;
}

const Slider: React.FC<ISliderProps> = ({
  children,
  className,
  id,
  onMouseDown,
  onMouseUp,
  percentage,
  style,
  width,
}) => {
  const left = `calc(${percentage * 100}% - ${Math.round(width / 2)}px)`;

  return (
    <SliderBlob
      key={percentage}
      className={className}
      id={id}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{
        ...style,
        left,
        position: 'absolute',
        textAlign: 'center',
      }}
    >
      {children}
    </SliderBlob>
  );
};

interface ISeekerProps {
  className?: string;
  disabled?: boolean;
  max: number;
  min: number;
  onChange: (e: any) => void;
  onChangeStart: (v: number) => void;
  onChangeEnd: (v: number) => void;
  showMaxLabel?: boolean;
  showMinLabel?: boolean;
  step: number;
  value: number;
}

export const Seeker: React.FC<ISeekerProps> = ({
  className,
  max,
  min,
  onChange,
  onChangeStart,
  onChangeEnd,
  showMaxLabel,
  showMinLabel,
  value,
}) => {
  const [isDragging, setDragging] = React.useState(false);
  const [activeValue, setActiveValue] = React.useState(0);

  const markers: ITrackMarker[] = [
    // { id: '1', content: '1', onClick: () => console.log(1), class: 'class', percentage: 0.25, width: 10 },
    // { id: '2', content: '2', onClick: () => console.log(2), class: 'class', percentage: 0.75, width: 10 },
  ];

  const changeStart = () => {
    setDragging(true);
  };

  const change = (newValue: any) => {
    const newFrame = Math.round(newValue * (max - min - 1));

    if (newFrame >= min && newFrame <= max) {
      setActiveValue(newValue);
      if (onChange) {
        onChange(newFrame);
      }
    }
  };

  const changeEnd = () => {
    setDragging(false);
  };

  const percentage = isDragging ? activeValue : value / max;

  return (
    <SeekerContainer className={className}>
      <Track onDrag={change} markers={markers} trackDrag={isDragging}>
        <Slider onMouseDown={changeStart} onMouseUp={changeEnd} percentage={percentage} width={10}>
          {/* <Marker>{value}</Marker> */}
        </Slider>
      </Track>

      <div className="labels">
        <Label type="min" visible={showMinLabel}>
          {min}
        </Label>
        <Label type="max" visible={showMaxLabel}>
          {max}
        </Label>
      </div>
    </SeekerContainer>
  );
};

Seeker.defaultProps = {
  showMaxLabel: true,
  showMinLabel: true,
  step: 1,
};
