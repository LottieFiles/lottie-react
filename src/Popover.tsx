/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';

interface IPopoverProps {
  children: ReactNode;
  icon: ReactNode;
}

export const Popover: React.FC<IPopoverProps> = (props: IPopoverProps) => {
  const { children, icon } = props;
  const [_triggerRef, setTriggerRef] = useState<HTMLDivElement | null>(null);
  const [_contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [_alignment, setAlignment] = useState<number | null>(null);
  const [_open, setOpen] = useState(false);

  useEffect(() => {
    if (_triggerRef && _contentRef) {
      const triggerBounds = _triggerRef.getBoundingClientRect();
      const contentBounds = _contentRef.getBoundingClientRect();

      const alignment = triggerBounds.left + contentBounds.width > window.innerWidth ? -1 : 0;

      setAlignment(alignment);

      // Start with content box hidden
      // Hide();
    }
  }, [_alignment, _contentRef, _triggerRef]);
  // onMount(() => {

  // });

  // /**
  //  * Show content box
  //  */
  const show = () => {
    setOpen(true);
  };

  /**
   * Hide content box
   */
  const hide = () => {
    setOpen(false);
  };

  return (
    <div
      className="lf-popover"
      onMouseOver={() => {
        show();
      }}
      ref={triggerRef => {
        setTriggerRef(triggerRef);
      }}
    >
      <div className=" lf-player-btn">{icon}</div>
      {_open ? (
        <div
          className="lf-popover-content"
          ref={contentRef => {
            setContentRef(contentRef);
          }}
          onMouseLeave={() => {
            hide();
          }}
          style={{
            bottom: _triggerRef ? _triggerRef.getBoundingClientRect().height + 'px' : 0,
            zIndex: 2,
          }}
          // class:left-align={_alignment !== -1}
          // class:right-align={_alignment === -1}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
};
export default Popover;
