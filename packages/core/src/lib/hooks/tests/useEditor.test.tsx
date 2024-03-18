import React from 'react';
import { describe, vi } from 'vitest';
import { useEditor } from '../useEditor';

const mocks = vi.hoisted(() => {
  return {
    internalEditorMock: vi.fn()
  };
});

vi.mock('../../editor/useInternalEditor', () => ({
  useInternalEditor: mocks.internalEditorMock
}));

describe('useEditor', () => {
  const otherActions = { one: 'one' };
  const actions = {
    setDOM: 'setDOM',
    setNodeEvent: 'setNodeEvent',
    replaceNodes: 'replaceNodes',
    reset: 'reset',
    ...otherActions
  };
  const query = { another: 'query' };
  const state = {
    aRandomValue: 'aRandomValue',
    connectors: 'one',
    actions,
    query,
    store: {}
  };
  let collect: any;
  let editor: any;

  beforeEach(() => {
    React.useMemo = (f) => f();

    mocks.internalEditorMock.mockImplementation(() => state);

    collect = vi.fn();
    editor = useEditor(collect);
  });

  it.skip('should return the correct editor', () => {
    expect(editor).toEqual(
      expect.objectContaining({
        actions: {
          ...otherActions,
          history: expect.any(Object)
        },
        connectors: state.connectors,
        query,
        aRandomValue: state.aRandomValue
      })
    );
  });
});
