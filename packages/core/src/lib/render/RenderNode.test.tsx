import React from 'react';
import { render } from '@testing-library/react';
import { describe, vi } from 'vitest';
import identity from 'lodash/identity';

import { NodeData } from '../interfaces';
import { RenderNodeToElement } from './RenderNode';

const nodeContext = {
  id: 1,
  connectors: { connect: identity, drag: identity }
};

let node: Partial<NodeData> = {};
let onRender = vi.fn();

vi.mock('../editor/useInternalEditor', () => ({
  useInternalEditor: () => ({ onRender })
}));

vi.mock('../nodes/useInternalNode', () => ({
  useInternalNode: () => ({
    ...node,
    ...nodeContext
  })
}));

vi.mock('../nodes/NodeElement', () => ({
  NodeElement: () => null
}));

vi.mock('./SimpleElement', () => ({
  SimpleElement: () => null
}));

describe('RenderNode', () => {
  let component: any;

  beforeEach(() => {
    onRender = vi.fn().mockImplementation(({ render }) => render);
  });

  describe('When the node is hidden', () => {
    beforeEach(() => {
      node = { hidden: true, type: vi.fn() as any };
      component = render(<RenderNodeToElement />);
    });
    it('should not have called onRender', () => {
      expect(onRender).not.toHaveBeenCalled();
    });
    it('should not have called type', () => {
      expect(node.type).not.toHaveBeenCalled();
    });
  });

  describe('When the component is a simple component', () => {
    const props = { className: 'hello' };
    beforeEach(() => {
      node = { type: 'h1', props };
      component = render(<RenderNodeToElement />);
    });
    it('should have called onRender', () => {
      expect(onRender).toHaveBeenCalled();
    });
  });

  describe('When the node has type and no nodes', () => {
    const type = () => (
      <p>
        <button data-testid="test-button" />
      </p>
    );
    const props = { className: 'hello' };
    beforeEach(() => {
      node = { type, props };
      component = render(<RenderNodeToElement />);
    });
    it('should have called onRender', () => {
      expect(onRender).toHaveBeenCalled();
    });
    it('should contain a button', () => {
      expect(component.getByTestId('test-button')).not.toEqual(null);
    });
  });

  describe('When the node has type and contains nodes', () => {
    const type = ({ children }: any) => (
      <p>
        <button data-testid="test-button" />
        {children}
      </p>
    );
    const props = { className: 'hello' };
    const nodeId = '3910';

    beforeEach(() => {
      node = { type, props, nodes: [nodeId] };
      component = render(<RenderNodeToElement />);
    });
    it('should have called onRender', () => {
      expect(onRender).toHaveBeenCalled();
    });
    it('should contain a button', () => {
      expect(component.getByTestId('test-button')).not.toEqual(null);
    });
  });
});
