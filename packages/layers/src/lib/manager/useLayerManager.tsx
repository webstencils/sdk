import { useCollector } from '@webstencils/core';
import { useContext, useMemo } from 'react';

import { LayerState } from '../interfaces';
import { LayerManagerContext } from './context';

export function useLayerManager<C>(collector?: (state: LayerState) => C) {
  const { store } = useContext(LayerManagerContext);
  const collected = useCollector(store, collector);

  return useMemo(
    () => ({
      store,
      ...collected
    }),
    [store, collected]
  );
}
