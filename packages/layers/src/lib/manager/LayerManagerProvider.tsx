import { useMethods } from '@webstencils/core';
import React from 'react';

import { LayerEventContextProvider } from '../events';
import { LayerOptions } from '../interfaces';
import { DefaultLayer } from '../layers/DefaultLayer';
import { LayerManagerContext, LayerStore } from './context';
import { LayerMethods } from './actions';

export const LayerManagerProvider: React.FC<{
  options: Partial<LayerOptions>;
  children?: React.ReactNode;
}> = ({ children, options }) => {
  // TODO: fix type
  const store = useMethods(LayerMethods, {
    layers: {},
    events: {
      selected: null,
      dragged: null,
      hovered: null
    },
    options: {
      renderLayer: DefaultLayer,
      ...options
    }
  }) as LayerStore;

  return (
    <LayerManagerContext.Provider value={{ store }}>
      <LayerEventContextProvider>{children}</LayerEventContextProvider>
    </LayerManagerContext.Provider>
  );
};
