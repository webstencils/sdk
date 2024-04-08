import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useEditor } from '@webstencils/core';

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
        <MuiBreadcrumbs sx={{ p: '4px' }}>
          {selectedAncestorNodes.map((node, index, arr) => {
            const displayName =
              node.data.custom.displayName || node.data.displayName;
            return index === arr.length - 1 ? (
              <Typography key={node.id} color="text.primary">
                {displayName}
              </Typography>
            ) : (
              <Link
                key={node.id}
                underline="hover"
                color="inherit"
                href="/"
                onClick={() => {
                  if (index + 1 < selectedAncestorNodes.length) {
                    actions.selectNode(node.id);
                  }
                }}
              >
                {displayName}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      ) : null}
    </div>
  );
}
