import { EditorQueryMethods } from '../editor';
import { cloneTree } from './cloneTree';
import { fromEntries } from './fromEntries';
import { QueryCallbacksFor } from './useMethods';

export const parseTree = (
  template: string | { rootNodeId: string; nodes: any },
  query: QueryCallbacksFor<typeof EditorQueryMethods>
): any => {
  const data =
    typeof template === 'string'
      ? (JSON.parse(template) as { rootNodeId: string; nodes: any })
      : template;

  const newNodes = data.nodes;

  const nodePairs = Object.keys(newNodes).map((id) => {
    const nodeId = id;

    return [
      nodeId,
      query.parseSerializedNode(newNodes[id], (node: any) => (node.id = nodeId))
    ];
  });

  const tree = {
    rootNodeId: newNodes.rootNodeId,
    nodes: fromEntries(nodePairs)
  };
  const result = cloneTree(tree, query);
  console.log(result);
  return result;
};
