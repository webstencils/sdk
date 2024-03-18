import { DefaultEventHandlers } from '../events';
import {
  EditorState,
  EditorOptions,
  NodeEventTypes,
  NodeId
} from '../interfaces';
import {
  useMethods,
  SubscriberAndCallbacksFor,
  PatchListener
} from '../utils/useMethods';
import { EditorQueryMethods } from './query';
import { ActionMethods } from './actions';

export const editorInitialState: EditorState = {
  nodes: {},
  events: {
    dragged: new Set<NodeId>(),
    selected: new Set<NodeId>(),
    hovered: new Set<NodeId>()
  },
  indicator: null,
  options: {
    onNodesChange: () => null,
    onRender: ({ render }) => render,
    onBeforeMoveEnd: () => null,
    resolver: {},
    enabled: true,
    indicator: {
      error: 'red',
      success: 'rgb(98, 196, 98)'
    },
    handlers: (store) =>
      new DefaultEventHandlers({
        store,
        removeHoverOnMouseleave: false,
        isMultiSelectEnabled: (e: MouseEvent) => !!e.metaKey
      }),
    normalizeNodes: () => {
      /* empty */
    }
  }
};

export const ActionMethodsWithConfig = {
  methods: ActionMethods,
  ignoreHistoryForActions: [
    'setDOM',
    'setNodeEvent',
    'selectNode',
    'clearEvents',
    'setOptions',
    'setIndicator'
  ] as const,
  normalizeHistory: (state: EditorState) => {
    /**
     * On every undo/redo, we remove events pointing to deleted Nodes
     */
    Object.keys(state.events).forEach((eventName: NodeEventTypes) => {
      const nodeIds = Array.from(state.events[eventName] || []);

      nodeIds.forEach((id) => {
        if (!state.nodes[id]) {
          state.events[eventName].delete(id);
        }
      });
    });

    // Remove any invalid node[nodeId].events
    // TODO(prev): it's really cumbersome to have to ensure state.events and state.nodes[nodeId].events are in sync
    // Find a way to make it so that once state.events is set, state.nodes[nodeId] automatically reflects that (maybe using proxies?)
    Object.keys(state.nodes).forEach((id) => {
      const node = state.nodes[id];

      Object.keys(node.events).forEach((eventName: NodeEventTypes) => {
        const isEventActive = !!node.events[eventName];

        if (
          isEventActive &&
          state.events[eventName] &&
          !state.events[eventName].has(node.id)
        ) {
          node.events[eventName] = false;
        }
      });
    });
  }
};

export type EditorStore = SubscriberAndCallbacksFor<
  typeof ActionMethodsWithConfig,
  typeof EditorQueryMethods
>;

export const useEditorStore = (
  options: Partial<EditorOptions>,
  patchListener: PatchListener<
    EditorState,
    typeof ActionMethodsWithConfig,
    typeof EditorQueryMethods
  >
): EditorStore => {
  // TODO: fix type
  return useMethods(
    ActionMethodsWithConfig,
    {
      ...editorInitialState,
      options: {
        ...editorInitialState.options,
        ...options
      }
    },
    EditorQueryMethods,
    patchListener
  ) as EditorStore;
};
