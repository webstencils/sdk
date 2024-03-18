import { useEditor } from '@webstencils/core';
import cx from 'classnames';
import React, { useEffect } from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Toolbox } from './Toolbox';

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => {
  const {
    enabled,
    connectors,
    actions: { setOptions }
  } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className="viewport">
      <div
        style={{
          display: 'flex',
          height: '100%',
          overflow: 'hidden',
          flexDirection: 'row',
          width: '100%',
          position: 'fixed'
        }}
      >
        <Toolbox />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 0%',
            height: '100%'
          }}
          className="page-container"
        >
          <Header />
          <div
            style={{
              flex: '1 1 0%',
              height: '100%',
              width: '100%',
              overflow: 'auto',
              paddingBottom: '2rem'
            }}
            className={cx([
              'craftjs-renderer transition',
              {
                'app-bg-renderer-gray': enabled
              }
            ])}
            ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '2rem'
              }}
            >
              {children}
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
