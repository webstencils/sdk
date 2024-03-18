import React from 'react';
import { describe, vi } from 'vitest';
import {
  rootNode,
  card,
  primaryButton,
  secondaryButton,
  documentWithCardState
} from '../tests/fixtures';
import { EditorQueryMethods } from './query';

let mockedResolveComponent = vi.fn().mockImplementation(() => null);
const mockedCreateNode = vi.fn().mockImplementation(() => null);
let mockedParsedNodeFromJsx = vi.fn().mockImplementation(() => null);
let mockedDeserializeNode = vi.fn().mockImplementation((data) => data);

vi.mock('tiny-invariant', () => {
  return {
    default: vi.fn() //.mockImplementation(() => null)
  };
});

vi.mock('../utils/resolveComponent', () => ({
  resolveComponent: (...args: any[]) => mockedResolveComponent(...args)
}));
vi.mock('../utils/createNode', () => ({
  createNode: (...args: any[]) => mockedCreateNode(...args)
}));
vi.mock('../utils/parseNodeFromJSX', () => ({
  parseNodeFromJSX: (...args: any[]) => mockedParsedNodeFromJsx(...args)
}));
vi.mock('../utils/deserializeNode', () => ({
  deserializeNode: (...args: any[]) => mockedDeserializeNode(...args)
}));

describe('query', () => {
  const resolver = { H1: () => null };
  let query: any;
  let state: any;

  beforeEach(() => {
    state = { options: { resolver } };
    query = EditorQueryMethods(state);
  });

  describe('parseSerializedNode', () => {
    describe('toNode', () => {
      const data = {
        type: 'h2',
        props: { className: 'hello' },
        nodes: [],
        custom: {},
        isCanvas: false,
        parent: null,
        linkedNodes: {},
        name: null,
        displayName: 'h2',
        hidden: false
      };

      it('should call deserializeNode', () => {
        query.parseSerializedNode(data);

        expect(mockedDeserializeNode).toHaveBeenCalledWith(
          data,
          state.options.resolver
        );
      });

      it('should call parseNodeFromJSX', () => {
        query.parseSerializedNode(data);

        expect(mockedCreateNode).toHaveBeenCalledWith(
          {
            data
          },
          expect.any(Function)
        );
      });
    });
  });

  describe('parseFreshNode', () => {
    describe('toNode', () => {
      const data = {
        type: 'h1'
      };

      beforeEach(() => {
        query.parseFreshNode({
          data: {
            type: 'h1'
          }
        });
      });

      it('should call createNode', () => {
        expect(mockedCreateNode).toHaveBeenCalledWith(
          {
            data
          },
          expect.any(Function)
        );
      });
    });
  });

  describe('parseReactElement', () => {
    let tree: any;
    const node = <h1>Hello</h1>;
    const name = 'Document';

    describe('when we cant resolve a name', () => {
      it('should throw an error', () => {
        expect(() => query.parseReactElement(node)).toThrow();
      });
    });

    describe('when we can resolve the type', () => {
      beforeEach(() => {
        mockedResolveComponent = vi.fn().mockImplementation(() => name);
        mockedParsedNodeFromJsx = vi.fn().mockImplementation(() => {
          return { ...rootNode.data, type: 'div' };
        });

        tree = query.parseReactElement(node);
      });

      it('should have changed the displayName and name of the node', () => {
        expect(rootNode.data.name).toEqual(name);
      });

      describe('when there is a single node with no children', () => {
        const node = <button />;
        beforeEach(() => {
          mockedParsedNodeFromJsx = vi.fn().mockImplementation(() => rootNode);
          tree = query.parseReactElement(node);
        });

        it('should have called parseNodeFromJSX once', () => {
          expect(mockedParsedNodeFromJsx).toHaveBeenCalledTimes(1);
        });
        it('should have replied with the right payload', () => {
          expect(tree).toEqual({
            rootNodeId: rootNode.id,
            nodes: { [rootNode.id]: rootNode }
          });
        });
      });

      describe('when there is a complex tree', () => {
        const node = (
          <div id="root">
            <div id="card">
              <button>one</button>
              <button>two</button>
            </div>
          </div>
        );
        beforeEach(() => {
          mockedParsedNodeFromJsx = vi
            .fn()
            .mockImplementationOnce(() => rootNode)
            .mockImplementationOnce(() => card)
            .mockImplementationOnce(() => primaryButton)
            .mockImplementationOnce(() => secondaryButton);
          tree = query.parseReactElement(node);
        });
        it('should have called parseNodeFromReactNode 4 times', () => {
          expect(mockedParsedNodeFromJsx).toHaveBeenCalledTimes(4);
        });
        it('should have replied with the right payload', () => {
          expect(tree).toEqual({
            rootNodeId: rootNode.id,
            nodes: documentWithCardState.nodes
          });
        });
      });
    });
  });
  describe('getState', () => {
    it('should return the EditorState', () => {
      expect(query.getState()).toEqual(state);
    });
  });
});
