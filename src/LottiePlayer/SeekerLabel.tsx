import { styled } from 'fannypack';
import * as React from 'react';

const LabelContainer = styled.div`

`;

interface ILabelProps {
  children: React.ReactNode;
  formatLabel: (value: any) => React.ReactNode;
  type: string;
  style?: any;
  visible?: boolean;
}

export const SeekerLabel: React.FC<ILabelProps> = ({ children, formatLabel, style, type, visible }) => {
  const displayText = (typeof formatLabel ==='function') ? formatLabel(children) : children;

  if (!visible) {
    return null;
  }

  return (
    <LabelContainer className={`seeker-label-${type}`} style={style}>
      {displayText}
    </LabelContainer>
  );
}
