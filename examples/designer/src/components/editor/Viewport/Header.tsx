import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import PreviewIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import { useEditor } from '@webstencils/core';
import cx from 'classnames';

const HeaderDiv = styled.div`
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0 10px;
  background: #d4d4d4;
  display: flex;
  width: '100%';
`;

const Btn = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  border-radius: 3px;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  svg {
    margin-right: 6px;
    width: 12px;
    height: 12px;
    fill: #fff;
    opacity: 0.9;
  }
`;

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #707070;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

const HeaderContent = styled.div({
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  justifyContent: 'flex-end'
});

export const Header = () => {
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo()
  }));

  return (
    <HeaderDiv className="header app-text-white transition">
      <HeaderContent>
        {enabled && (
          <div style={{ display: 'flex', flex: '1 1 0%' }}>
            <Tooltip title="Undo" placement="bottom">
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                <UndoIcon />
              </Item>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                <RedoIcon />
              </Item>
            </Tooltip>
          </div>
        )}
        <div style={{ display: 'flex' }}>
          <Btn
            className={cx([
              'transition',
              {
                'app-bg-green-400': enabled,
                'app-bg-primary': !enabled
              }
            ])}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled));
            }}
          >
            {enabled ? <PreviewIcon /> : <EditIcon />}
            {enabled ? 'Preview' : 'Edit'}
          </Btn>
        </div>
      </HeaderContent>
    </HeaderDiv>
  );
};
