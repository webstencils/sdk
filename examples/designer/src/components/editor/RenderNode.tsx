import styled from '@emotion/styled';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import MoveIcon from '@mui/icons-material/DragIndicator';
import Tooltip from '@mui/material/Tooltip';
import { useNode, useEditor, ROOT_NODE } from '@webstencils/core';
import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

const IndicatorDiv = styled.div`
  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;

  svg {
    fill: #fff;
    width: 15px;
    height: 15px;
  }
`;

const Btn = styled.a`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`;

export const RenderNode = ({ render }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected')?.contains(id)
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props
  }));

  const currentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom, getPos]);

  useEffect(() => {
    document
      .querySelector('.craftjs-renderer')
      .addEventListener('scroll', scroll);

    return () => {
      document
        .querySelector('.craftjs-renderer')
        .removeEventListener('scroll', scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef}
              className="app-text-white app-bg-primary"
              style={{
                padding: '0.5rem',
                position: 'fixed',
                display: 'flex',
                alignItems: 'center',
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999
              }}
            >
              <h2
                style={{
                  flex: '1 1 0%',
                  margin: '0 1rem 0 0',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
              >
                {name}
              </h2>
              {moveable ? (
                <Tooltip title="Move node">
                  <Btn
                    style={{ marginRight: '0.5rem', cursor: 'move' }}
                    ref={drag}
                  >
                    <MoveIcon />
                  </Btn>
                </Tooltip>
              ) : null}
              {id !== ROOT_NODE && (
                <Tooltip title="Select parent node">
                  <Btn
                    style={{ marginRight: '0.5rem', cursor: 'pointer' }}
                    onClick={() => {
                      actions.selectNode(parent);
                    }}
                  >
                    <ArrowUpIcon />
                  </Btn>
                </Tooltip>
              )}
              {deletable ? (
                <Tooltip title="Delete node">
                  <Btn
                    style={{ cursor: 'pointer' }}
                    onMouseDown={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      actions.delete(id);
                    }}
                  >
                    <DeleteIcon />
                  </Btn>
                </Tooltip>
              ) : null}
            </IndicatorDiv>,
            document.querySelector('.page-container')
          )
        : null}
      {render}
    </>
  );
};
