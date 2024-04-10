import React from 'react';
import { useEditor } from '@webstencils/core';
import { Text, Separator, Flex, Link } from '@radix-ui/themes';

export function Breadcrumbs() {
  const { actions, selectedAncestorNodes } = useEditor((_, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first();

    return {
      selected: currentlySelectedNodeId,
      selectedAncestorNodes: currentlySelectedNodeId
        ? [
            query.node(currentlySelectedNodeId).get(),
            ...query
              .node(currentlySelectedNodeId)
              .ancestors(true)
              .map((id) => query.node(id).get())
          ].reverse()
        : []
    };
  });

  return (
    <div role="presentation" onClick={(e) => e.preventDefault()}>
      {selectedAncestorNodes.length > 0 ? (
        <Flex gap="3" align="center">
          {selectedAncestorNodes.map((node, index, arr) => {
            const displayName =
              node.data.custom.displayName || node.data.displayName;
            return index === arr.length - 1 ? (
              <Text key={node.id}>{displayName}</Text>
            ) : (
              <React.Fragment key={node.id}>
                <Link
                  underline="hover"
                  href="/"
                  color="gray"
                  onClick={() => {
                    if (index + 1 < selectedAncestorNodes.length) {
                      actions.selectNode(node.id);
                    }
                  }}
                >
                  {displayName}
                </Link>
                <Separator orientation="vertical" />
              </React.Fragment>
            );
          })}
        </Flex>
      ) : (
        <Text color="gray">Click on a component to start editing</Text>
      )}
    </div>
  );
}
