import React from 'react';

import { EditorStore } from '../editor';
import { NodeId, NodeTree } from '../interfaces';
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
      connect: (_el: HTMLElement, _id: NodeId) => {
        /* empty */
      },
      select: (_el: HTMLElement, _id: NodeId) => {
        /* empty */
      },
      hover: (_el: HTMLElement, _id: NodeId) => {
        /* empty */
      },
      drag: (_el: HTMLElement, _id: NodeId) => {
        /* empty */
      },
      drop: (_el: HTMLElement, _id: NodeId) => {
        /* empty */
      },
      create: (
        _el: HTMLElement,
        _UserElement:
          | React.ReactElement
          | (() => NodeTree | React.ReactElement),
        _options?: Partial<CreateHandlerOptions>
      ) => {
        /* empty */
      }
    };
  }
}

export abstract class DerivedCoreEventHandlers<
  O extends Record<string, any> = {}
> extends DerivedEventHandlers<CoreEventHandlers, O> {}
