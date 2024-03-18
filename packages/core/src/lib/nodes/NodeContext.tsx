import React, { PropsWithChildren, createContext } from 'react';
import { NodeId } from '../interfaces';

export type NodeContextType = {
  id: NodeId;
  related?: boolean;
};

export const NodeContext = createContext<NodeContextType | null>(null);

export type NodeProviderProps = Omit<NodeContextType, 'connectors'>;

export const NodeProvider = ({
  id,
  related = false,
  children
}: PropsWithChildren<NodeProviderProps>) => {
  return (
    <NodeContext.Provider value={{ id, related }}>
      {children}
    </NodeContext.Provider>
  );
};
