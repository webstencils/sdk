import React from 'react';
import { createPortal } from 'react-dom';

export const RenderIndicator = ({ style, parentDom }: any): any => {
  const indicator = (
    <div
      style={{
        position: 'fixed',
        display: 'block',
        opacity: 1,
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: 'transparent',
        zIndex: 99999,
        ...style
      }}
    ></div>
  );

  if (parentDom && parentDom.ownerDocument !== document) {
    return createPortal(indicator, parentDom.ownerDocument.body);
  }

  return indicator;
};
