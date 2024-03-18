import { render } from '@testing-library/react';
import React from 'react';
import { describe, vi } from 'vitest';

import { createTestNode } from '../utils/createTestNode';
import { Node } from '../interfaces';
import { Element } from './Element';

let parentNode: Node;
let existingLinkedNode: Node;
const newLinkedNode = createTestNode('newLinkedNode');

const addLinkedNodeFromTree = vi.fn();
const parseReactElement = vi.fn().mockImplementation(() => ({
  rootNodeId: newLinkedNode.id
}));

vi.mock('../editor/useInternalEditor', () => ({
  useInternalEditor: () => ({
    actions: {
      history: {
        ignore: vi.fn().mockImplementation(() => ({
          addLinkedNodeFromTree
        }))
      }
    },
    query: {
      parseReactElement,
      node: vi.fn().mockImplementation((id) => ({
        get() {
          return id === 'parent-node' ? parentNode : existingLinkedNode;
        }
      }))
    }
  })
}));

vi.mock('./useInternalNode', () => ({
  useInternalNode: () => ({
    node: parentNode,
    inNodeContext: true
  })
}));

const NodeElementTest = vi.fn().mockImplementation(() => null);

vi.mock('./NodeElement', () => ({
  NodeElement: vi.fn().mockImplementation((props) => NodeElementTest(props))
}));

describe('<Element />', () => {
  beforeEach(() => {
    parentNode = createTestNode('test');
  });

  describe('when no id is passed', () => {
    it('should throw error', () => {
      expect(() => render(<Element />)).toThrow();
    });
  });

  describe('when there is no existing node', () => {
    let elementProps: { color: string };
    let children: React.ReactElement;

    beforeEach(() => {
      elementProps = {
        color: '#fff'
      };

      children = <h1>Child</h1>;
      render(
        <Element id="test" {...elementProps}>
          {children}
        </Element>
      );
    });

    it('should call query.parseReactElement()', () => {
      expect(parseReactElement).toHaveBeenCalledWith(
        <Element {...elementProps}>{children}</Element>
      );
    });
    it('should call actions.addLinkedNodeFromTree()', () => {
      expect(addLinkedNodeFromTree).toHaveBeenCalled();
    });
    it('should render a new linked Node', () => {
      expect(NodeElementTest).toHaveBeenCalledWith({
        id: newLinkedNode.id
      });
    });
  });

  describe('when there is an existing node', () => {
    beforeEach(() => {
      existingLinkedNode = createTestNode('existing-linked-node', {
        type: 'div',
        props: {
          background: '#000',
          color: '#fff'
        }
      });

      parentNode = createTestNode('parent-node', {
        linkedNodes: {
          test: existingLinkedNode.id
        }
      });

      render(<Element id="test" color="#000" />);
    });
    it('should render existing Node', () => {
      expect(NodeElementTest).toHaveBeenCalledWith({
        id: existingLinkedNode.id
      });
    });
  });
});
