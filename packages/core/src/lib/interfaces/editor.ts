import React from 'react';

import { EditorQueryMethods } from '../editor/query';
import { EditorStore, ActionMethodsWithConfig } from '../editor/store';
import { useInternalEditorReturnType } from '../editor/useInternalEditor';
import { CoreEventHandlers } from '../events';
import { PatchListenerAction, QueryCallbacksFor } from '../utils/useMethods';
import { Delete } from '../utils/utilityTypes';
import { Nodes, NodeEventTypes, NodeId, Node } from './nodes';
import { Placement } from './events';

export type EditorOptions = {
  onRender: React.ComponentType<{ render: React.ReactElement }>;
  onBeforeMoveEnd: (
    targetNode: Node,
    newParentNode: Node,
    existingParentNode: Node
  ) => void;
  onNodesChange: (query: QueryCallbacksFor<typeof EditorQueryMethods>) => void;
  resolver: Resolver;
  enabled: boolean;
  indicator: Partial<{
    success: string;
    error: string;
    transition: string;
    thickness: number;
  }>;
  handlers: (store: EditorStore) => CoreEventHandlers;
  normalizeNodes: (
    state: EditorState,
    previousState: EditorState,
    actionPerformed: Delete<
      PatchListenerAction<typeof ActionMethodsWithConfig>,
      'patches'
    >,
    query: QueryCallbacksFor<typeof EditorQueryMethods>
  ) => void;
};

export type Resolver = Record<string, string | React.ElementType>;

export interface Indicator {
  placement: Placement;
  error: string | null;
}

export type EditorEvents = Record<NodeEventTypes, Set<NodeId>>;

export type EditorState = {
  nodes: Nodes;
  events: EditorEvents;
  options: EditorOptions;
  indicator: Indicator;
};

export type ConnectedEditor<S = null> = useInternalEditorReturnType<S>;
