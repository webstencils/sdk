import React from 'react';
import invariant from 'tiny-invariant';

import { ERROR_NOT_IN_RESOLVER } from '../constants';
import findPosition from '../events/findPosition';
import {
  NodeId,
  EditorState,
  Indicator,
  Node,
  NormalizeNodeCallback,
  EditorOptions,
  NodeEventTypes,
  NodeInfo,
  NodeSelector,
  NodeTree,
  SerializedNodes,
  SerializedNode,
  FreshNode,
  NormalizeJsxNodeCallback
} from '../interfaces';
import { createNode } from '../utils/createNode';
import { deserializeNode } from '../utils/deserializeNode';
import { fromEntries } from '../utils/fromEntries';
import { getDOMInfo } from '../utils/getDOMInfo';
import { getNodesFromSelector } from '../utils/getNodesFromSelector';
import { mergeTrees } from '../utils/mergeTrees';
import { parseNodeFromJSX } from '../utils/parseNodeFromJSX';
import { resolveComponent } from '../utils/resolveComponent';
import { QueryCallbacksFor } from '../utils/useMethods';
import { NodeHelpers } from './NodeHelpers';
import { EventHelpers } from './EventHelpers';

export function EditorQueryMethods(state: EditorState) {
  const options = state && state.options;

  const _: () => QueryCallbacksFor<typeof EditorQueryMethods> = () =>
    EditorQueryMethods(state) as any;

  return {
    /**
     * Determine the best possible location to drop the source Node relative to the target Node
     *
     * TODO: replace with Positioner.computeIndicator();
     */
    getDropPlaceholder: (
      source: NodeSelector,
      target: NodeId,
      pos: { x: number; y: number },
      nodesToDOM: (node: Node) => HTMLElement | null = (node) =>
        state.nodes[node.id].dom
    ) => {
      const targetNode = state.nodes[target],
        isTargetCanvas = _().node(targetNode.id).isCanvas();

      const targetParent = isTargetCanvas
        ? targetNode
        : targetNode.data.parent
          ? state.nodes[targetNode.data.parent]
          : null;

      if (!targetParent) return;

      const targetParentNodes = targetParent.data.nodes || [];

      const dimensionsInContainer = targetParentNodes
        ? targetParentNodes.reduce((result: NodeInfo[], id: NodeId) => {
            const dom = nodesToDOM(state.nodes[id]);
            if (dom) {
              const info: NodeInfo = {
                id,
                ...getDOMInfo(dom)
              };

              result.push(info);
            }
            return result;
          }, [] as NodeInfo[])
        : [];

      const dropAction = findPosition(
        targetParent,
        dimensionsInContainer,
        pos.x,
        pos.y
      );
      const currentNode: any =
        targetParentNodes.length &&
        state.nodes[targetParentNodes[dropAction.index]];

      const output: Indicator = {
        placement: {
          ...dropAction,
          currentNode
        },
        error: null
      };

      const sourceNodes = getNodesFromSelector(state.nodes, source);

      sourceNodes.forEach(({ node, exists }) => {
        // If source Node is already in the editor, check if it's draggable
        if (exists) {
          _()
            .node(node.id)
            .isDraggable((err) => (output.error = err));
        }
      });

      // Check if source Node is droppable in target
      _()
        .node(targetParent.id)
        .isDroppable(source, (err) => (output.error = err));

      return output;
    },

    /**
     * Get the current Editor options
     */
    getOptions(): EditorOptions {
      return options;
    },

    getNodes() {
      return state.nodes;
    },

    /**
     * Helper methods to describe the specified Node
     * @param id
     */
    node(id: NodeId) {
      return NodeHelpers(state, id);
    },

    /**
     * Returns all the `nodes` in a serialized format
     */
    getSerializedNodes(): SerializedNodes {
      const nodePairs = Object.keys(state.nodes).map((id: NodeId) => [
        id,
        this.node(id).toSerializedNode()
      ]);
      return fromEntries(nodePairs);
    },

    getEvent(eventType: NodeEventTypes) {
      return EventHelpers(state, eventType);
    },

    /**
     * Retrieve the JSON representation of the editor's Nodes
     */
    serialize(): string {
      return JSON.stringify(this.getSerializedNodes());
    },

    parseReactElement: (
      reactElement: React.ReactElement,
      normalize?: NormalizeJsxNodeCallback
    ): NodeTree => {
      const node = parseNodeFromJSX(reactElement, (node, jsx) => {
        const name = resolveComponent(state.options.resolver, node.data.type);

        node.data.displayName = node.data.displayName || name;
        node.data.name = name;

        if (normalize) {
          normalize(node, jsx);
        }
      });

      let childrenNodes: NodeTree[] = [];

      if (reactElement.props && reactElement.props.children) {
        childrenNodes = React.Children.toArray(
          reactElement.props.children
        ).reduce<NodeTree[]>((accum, child: any) => {
          if (React.isValidElement(child)) {
            accum.push(_().parseReactElement(child, normalize));
          }
          return accum;
        }, []);
      }

      return mergeTrees(node, childrenNodes);
    },

    parseSerializedNode: (
      serializedNode: SerializedNode,
      normalize?: NormalizeNodeCallback
    ): Node => {
      const data = deserializeNode(serializedNode, state.options.resolver);
      invariant(data.type, ERROR_NOT_IN_RESOLVER);

      return _().parseFreshNode(
        {
          data
        },
        normalize
      );
    },

    parseFreshNode: (
      node: FreshNode,
      normalize?: NormalizeNodeCallback
    ): Node => {
      return createNode(node, (node) => {
        const name = resolveComponent(state.options.resolver, node.data.type);
        invariant(name !== null, ERROR_NOT_IN_RESOLVER);

        node.data.displayName = node.data.displayName || name;
        node.data.name = name;

        if (normalize) {
          normalize(node);
        }
      });
    },

    getState() {
      return state;
    }
  };
}
