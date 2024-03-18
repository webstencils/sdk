import { render } from '@testing-library/react';
import React from 'react';
import { describe, vi, Mock } from 'vitest';

import { useInternalEditor } from '../editor/useInternalEditor';
import { Frame } from './Frame';

vi.mock('tiny-invariant');
vi.mock('../editor/useInternalEditor');
vi.mock('../nodes/NodeElement', () => ({
  NodeElement: () => null
}));

const mockEditor = useInternalEditor as Mock;

describe('Frame', () => {
  const data = {};
  const addNodeTree = vi.fn();
  const deserialize = vi.fn();

  let actions: any;
  let query: any;

  beforeEach(() => {
    actions = {
      history: {
        ignore: vi.fn().mockImplementation(() => ({
          addNodeTree,
          deserialize
        }))
      }
    };
    query = { createNode: vi.fn(), parseTreeFromReactNode: vi.fn() };
    mockEditor.mockImplementation(() => ({ actions, query }));
  });

  describe('When rendering using `data`', () => {
    beforeEach(() => {
      render(<Frame data={data} />);
    });
    it('should deserialize the nodes', () => {
      expect(deserialize).toHaveBeenCalledWith(data);
    });
  });
});
