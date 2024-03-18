import { useEventHandler } from '@webstencils/core';
import React, { useMemo } from 'react';

import { useLayerManager } from '../manager';
import { LayerEventHandlerContext } from './LayerEventContext';
import { LayerHandlers } from './LayerHandlers';
import { RenderLayerIndicator } from './RenderLayerIndicator';

export const LayerEventContextProvider = ({ children }) => {
  const { store: layerStore } = useLayerManager();
  const coreEventHandler = useEventHandler();

  const handler = useMemo(
    () =>
      coreEventHandler.derive(LayerHandlers, {
        layerStore
      }),
    [coreEventHandler, layerStore]
  );

  return (
    <LayerEventHandlerContext.Provider value={handler}>
      <RenderLayerIndicator />
      {children}
    </LayerEventHandlerContext.Provider>
  );
};
