import { useMemo } from 'react';

import {
  useInternalEditor,
  EditorCollector,
  useInternalEditorReturnType
} from '../editor/useInternalEditor';
import {
  Delete,
  Overwrite,
  OverwriteFnReturnType
} from '../utils/utilityTypes';

type PrivateActions =
  | 'addLinkedNodeFromTree'
  | 'setNodeEvent'
  | 'setDOM'
  | 'replaceNodes'
  | 'reset';

const getPublicActions = (actions) => {
  const {
    addLinkedNodeFromTree,
    setDOM,
    setNodeEvent,
    replaceNodes,
    reset,
    ...EditorActions
  } = actions;

  return EditorActions;
};

export type WithoutPrivateActions<S = null> = Delete<
  useInternalEditorReturnType<S>['actions'],
  PrivateActions | 'history'
> & {
  history: Overwrite<
    useInternalEditorReturnType<S>['actions']['history'],
    {
      ignore: OverwriteFnReturnType<
        useInternalEditorReturnType<S>['actions']['history']['ignore'],
        PrivateActions
      >;
      throttle: OverwriteFnReturnType<
        useInternalEditorReturnType<S>['actions']['history']['throttle'],
        PrivateActions
      >;
    }
  >;
};

export type useEditorReturnType<S = null> = Overwrite<
  useInternalEditorReturnType<S>,
  {
    actions: WithoutPrivateActions;
    query: Delete<useInternalEditorReturnType<S>['query'], 'deserialize'>;
  }
>;

/**
 * A Hook that that provides methods and information related to the entire editor state.
 */
export function useEditor(): useEditorReturnType;

/**
 * A Hook that that provides methods and information related to the entire editor state.
 * @param collect Collector function to consume values from the editor's state
 */
export function useEditor<S>(
  collect: EditorCollector<S>
): useEditorReturnType<S>;

export function useEditor<S>(collect?: any): useEditorReturnType<S> {
  const {
    connectors,
    actions: internalActions,
    query,
    store,
    ...collected
  } = useInternalEditor(collect);

  const EditorActions = getPublicActions(internalActions);

  const actions = useMemo(() => {
    return {
      ...EditorActions,
      history: {
        ...EditorActions.history,
        ignore: (...args) =>
          getPublicActions(EditorActions.history.ignore(...args)),
        throttle: (...args) =>
          getPublicActions(EditorActions.history.throttle(...args))
      }
    };
  }, [EditorActions]);

  return {
    connectors,
    actions,
    query,
    store,
    ...(collected as any)
  };
}
