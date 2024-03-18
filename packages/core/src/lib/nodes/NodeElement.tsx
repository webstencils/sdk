import React from 'react';

import { NodeId } from '../interfaces';
import { RenderNodeToElement } from '../render/RenderNode';
import { NodeProvider } from './NodeContext';

export type NodeElementProps = {
  id: NodeId;
  render?: React.ReactElement;
};

export const NodeElement: React.FC<
  React.PropsWithChildren<NodeElementProps>
> = ({ id, render }) => {
  return (
    <NodeProvider id={id}>
      <RenderNodeToElement render={render} />
    </NodeProvider>
  );
};
