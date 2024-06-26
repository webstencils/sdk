import React from 'react';

import { EditorQueryMethods } from '../editor/query';
import { QueryCallbacksFor } from '../utils/useMethods';

export type UserComponentConfig<T> = {
  displayName: string;
  rules: Partial<NodeRules>;
  related: Partial<NodeRelated>;
  props: Partial<T>;
  custom: Record<string, any>;
  info: Record<string, any>;
  isCanvas: boolean;
  template: ComponentTemplate;
};

export type UserComponent<T = any> = React.ComponentType<T> & {
  craft?: Partial<UserComponentConfig<T>>;
};

export type NodeId = string;
export type NodeEventTypes = 'selected' | 'dragged' | 'hovered';

export type Node = {
  id: NodeId;
  data: NodeData;
  info: Record<string, any>;
  events: Record<NodeEventTypes, boolean>;
  dom: HTMLElement | null;
  related: Record<string, React.ElementType>;
  rules: NodeRules;
  template: ComponentTemplate;
  _hydrationTimestamp: number;
};

// Creates a union type of string literals with strings, but retains intellisense for the literals.
// Union<string, 'foo' | 'bar'> => string | Omit<string, 'foo' | 'bar'>
export type Union<S = string, T extends string | number = string> =
  | T
  | Omit<S, T>;

export type ComponentTemplate = {
  name: string;
  description: string;
  props: ComponentTemplateProperties;
};

export type ComponentTemplateProperties = Record<
  string,
  ComponentTemplateProperty
>;

export type ComponentTemplateProperty<T = any> = {
  /* The type of the property */
  type: Union<string, 'enum' | 'boolean' | 'string' | 'text' | 'number'>;
  /* The category of the property */
  category?: string;
  /* The label of the property */
  label?: string;
  /* The description of the property */
  description?: string;
  /* The placeholder to use when property value is not set */
  placeholder?: string;
  /* The list of possible values for the property, used only for `enum` type */
  values?: readonly T[];
  /* The default value of the property */
  default?: T;
  /* Min and max are only used for number types */
  min?: T;
  /* Min and max are only used for number types */
  max?: T;
};

export type NormalizeNodeCallback = (node: Node) => void;
export type NormalizeJsxNodeCallback = (
  node: Node,
  jsx: React.ReactElement
) => void;

export type NodeHelpersType = QueryCallbacksFor<
  typeof EditorQueryMethods
>['node'];
export type NodeRules = {
  canDrag(node: Node, helpers: NodeHelpersType): boolean;
  canDrop(dropTarget: Node, self: Node, helpers: NodeHelpersType): boolean;
  canMoveIn(canMoveIn: Node[], self: Node, helpers: NodeHelpersType): boolean;
  canMoveOut(canMoveOut: Node[], self: Node, helpers: NodeHelpersType): boolean;
};
export type NodeRelated = Record<string, React.ElementType>;

export type NodeData = {
  props: Record<string, any>;
  type: string | React.ElementType;
  name: string;
  displayName: string;
  isCanvas: boolean;
  parent: NodeId | null;
  linkedNodes: Record<string, NodeId>;
  nodes: NodeId[];
  hidden: boolean;
  custom?: any;
  _childCanvas?: Record<string, NodeId>; // TODO: Deprecate in favour of linkedNodes
};

export type FreshNode = {
  id?: NodeId;
  data: Partial<NodeData> & Required<Pick<NodeData, 'type'>>;
};

export type ReduceCompType =
  | string
  | {
      resolvedName: string;
    };

export type ReducedComp = {
  type: ReduceCompType;
  isCanvas: boolean;
  props: any;
};

export type SerializedNode = Omit<
  NodeData,
  'type' | 'subtype' | 'name' | 'event'
> &
  ReducedComp;

export type SerializedNodes = Record<NodeId, SerializedNode>;

export type Nodes = Record<NodeId, Node>;

/**
 * A NodeTree is an internal data structure for CRUD operations that involve
 * more than a single node.
 *
 * For example, when we drop a component we use a tree because we
 * need to drop more than a single component.
 */
export interface NodeTree {
  rootNodeId: NodeId;
  nodes: Nodes;
}

type NodeIdSelector = NodeId | NodeId[];
type NodeObjSelector = Node | Node[];

export enum NodeSelectorType {
  Any,
  Id,
  Obj
}

export type NodeSelector<T extends NodeSelectorType = NodeSelectorType.Any> =
  T extends NodeSelectorType.Id
    ? NodeIdSelector
    : T extends NodeSelectorType.Obj
      ? NodeObjSelector
      : NodeIdSelector | NodeObjSelector;

export type NodeSelectorWrapper = {
  node: Node;
  exists: boolean;
};
