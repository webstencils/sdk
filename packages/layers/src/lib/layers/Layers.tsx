import React from 'react';
import { ROOT_NODE } from '@webstencils/core';
import { LayerOptions } from '../interfaces';
import { LayerManagerProvider } from '../manager/LayerManagerProvider';
import { LayerContextProvider } from './LayerContextProvider';

export const Layers = ({ ...options }: Partial<LayerOptions>) => {
  return (
    <LayerManagerProvider options={options}>
      <LayerContextProvider id={ROOT_NODE} depth={0} />
    </LayerManagerProvider>
  );
};
