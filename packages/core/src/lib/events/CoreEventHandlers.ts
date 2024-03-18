import React from 'react';

import { EditorStore } from '../editor/store';
import { NodeId, NodeTree } from '../interfaces/nodes';
import { DerivedEventHandlers } from './EventHandlers/DerivedEventHandlers';
import { EventHandlers } from './EventHandlers/EventHandlers';

export interface CreateHandlerOptions {
  onCreate: (nodeTree: NodeTree) => void;
}

export class CoreEventHandlers<O = {}> extends EventHandlers<
  { store: EditorStore } & O
> {
  handlers() {
    return {
      connect: (el: HTMLElement, id: NodeId) => {
        /* empty */
      },
      select: (el: HTMLElement, id: NodeId) => {
        /* empty */
      },
      hover: (el: HTMLElement, id: NodeId) => {
        /* empty */
      },
      drag: (el: HTMLElement, id: NodeId) => {
        /* empty */
      },
      drop: (el: HTMLElement, id: NodeId) => {
        /* empty */
      },
      create: (
        el: HTMLElement,
        UserElement: React.ReactElement | (() => NodeTree | React.ReactElement),
        options?: Partial<CreateHandlerOptions>
      ) => {
        /* empty */
      }
    };
  }
}

export abstract class DerivedCoreEventHandlers<
  O = {}
> extends DerivedEventHandlers<CoreEventHandlers, O> {}
