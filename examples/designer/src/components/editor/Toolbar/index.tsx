import styled from '@emotion/styled';
import { useEditor } from '@webstencils/core';
import React from 'react';

export * from './ToolbarItem';
export * from './ToolbarSection';
export * from './ToolbarTextInput';
export * from './ToolbarDropdown';
export * from './ToolbarRadio';

const Label = styled.h2({
  fontSize: 'inherit',
  fontWeight: 'inherit',
  paddingBottom: '0.25rem'
});

export const Toolbar = () => {
  const { active, related } = useEditor((state, query) => {
    // TODO: handle multiple selected elements
    const currentlySelectedNodeId = query.getEvent('selected')?.first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related
    };
  });

  return (
    <div
      style={{
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        height: '100%'
      }}
    >
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <div
          style={{
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            color: 'rgba(0, 0, 0, 0.5607843137254902)',
            fontSize: '11px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Label style={{ paddingBottom: '0.25rem' }}>
            Click on a component to start editing.
          </Label>
          <Label>
            You can also double click on the layers below to edit their names,
            drag and drop layers to reorder the content.
          </Label>
        </div>
      )}
    </div>
  );
};
