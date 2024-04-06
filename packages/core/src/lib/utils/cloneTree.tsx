import { useInternalEditorReturnType } from '../editor/useInternalEditor';
import { Node, NodeTree } from '../interfaces';
import { getRandomId } from './getRandomId';
import { Delete } from './utilityTypes';

export const cloneTree = (
  tree: NodeTree,
  query: Delete<useInternalEditorReturnType['query'], 'deserialize'>
) => {
  const newNodes: any = {};
  const changeNodeId = (node: Node, newParentId?: string) => {
    const newNodeId = getRandomId();
    const childNodes = node.data.nodes.map((childId) =>
      changeNodeId(tree.nodes[childId], newNodeId)
    );
    const linkedNodes = Object.keys(node.data.linkedNodes).reduce((acc, id) => {
      const newLinkedNodeId = changeNodeId(
        tree.nodes[node.data.linkedNodes[id]],
        newNodeId
      );
      return {
        ...acc,
        [id]: newLinkedNodeId
      };
    }, {});

    const tmpNode = {
      ...node,
      id: newNodeId,
      data: {
        ...node.data,
        parent: newParentId || node.data.parent,
        nodes: childNodes,
        linkedNodes
      }
    };
    newNodes[newNodeId] = query.parseFreshNode(tmpNode);
    return newNodeId;
  };

  const rootNodeId = changeNodeId(tree.nodes[tree.rootNodeId]);
  return {
    rootNodeId,
    nodes: newNodes
  };
};
