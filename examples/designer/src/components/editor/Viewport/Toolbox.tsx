import styled from '@emotion/styled';
import ContainerIcon from '@mui/icons-material/RectangleOutlined';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Tooltip from '@mui/material/Tooltip';
import { Element, useEditor } from '@webstencils/core';
import React from 'react';

import { Button } from '../../selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';

const ToolboxDiv = styled.div<{ enabled: boolean }>(
  {
    transition: '0.4s cubic-bezier(0.19, 1, 0.22, 1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  (props) => ({
    width: !props.enabled ? '0' : '3rem',
    opacity: !props.enabled ? '0' : ''
  })
);

const ToolboxItem = styled.a<{ move?: boolean }>(
  {
    margin: '0.5rem',
    paddingBottom: '0.5rem',
    display: 'block',
    '& > svg': {
      width: '22px',
      height: '22px',
      fill: '#707070'
    }
  },
  (props) => ({
    cursor: props.move ? 'move' : 'pointer'
  })
);

const ToolboxContent = styled.div({
  display: 'flex',
  flex: '1 1 0%',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '0.75rem'
});

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create }
  } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  return (
    <ToolboxDiv enabled={enabled} className="toolbox app-bg-white">
      <ToolboxContent>
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right" arrow>
            <ToolboxItem move>
              <ContainerIcon />
            </ToolboxItem>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Tooltip title="Text" placement="right" arrow>
            <ToolboxItem move>
              <TextFieldsIcon />
            </ToolboxItem>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Tooltip title="Button" placement="right" arrow>
            <ToolboxItem move>
              <SmartButtonIcon />
            </ToolboxItem>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right" arrow>
            <ToolboxItem move>
              <YouTubeIcon />
            </ToolboxItem>
          </Tooltip>
        </div>
      </ToolboxContent>
    </ToolboxDiv>
  );
};
