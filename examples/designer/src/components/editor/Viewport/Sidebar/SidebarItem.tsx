import styled from '@emotion/styled';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

const SidebarItemDiv = styled.div<{ visible?: boolean; height?: string }>`
  display: flex;
  flex-direction: column;
  height: ${(props) =>
    props.visible && props.height !== 'full' ? `${props.height}` : 'auto'};
  flex: ${(props) =>
    props.visible && props.height === 'full' ? `1` : 'unset'};
  color: #545454;
`;

const Chevron = styled.a<{ visible: boolean }>`
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

export type SidebarItemProps = {
  title: string;
  height?: string;
  icon: any;
  visible?: boolean;
  onChange?: (bool: boolean) => void;
  children?: React.ReactNode;
};

const HeaderDiv = styled.div`
  color: #615c5c;
  height: 45px;
  cursor: pointer;
  border-bottom-width: 1px;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;

  &:last-child {
    border-bottom-width: 0;
  }

  & > svg {
    fill: #707070;
  }
`;

const Title = styled.div({
  display: 'flex',
  flex: '1 1 0%',
  alignItems: 'center'
});

export const SidebarItem: React.FC<SidebarItemProps> = ({
  visible,
  icon,
  title,
  children,
  height,
  onChange
}) => {
  return (
    <SidebarItemDiv visible={visible} height={height}>
      <HeaderDiv
        onClick={() => {
          if (onChange) onChange(!visible);
        }}
        className={`app-bg-white ${visible ? 'app-shadow-sm' : ''}`}
      >
        <Title>
          {React.createElement(icon, {
            style: { width: '1rem', height: '1rem', marginRight: '0.5rem' }
          })}
          <h2
            style={{
              fontSize: '0.75rem',
              lineHeight: '1rem',
              textTransform: 'uppercase'
            }}
          >
            {title}
          </h2>
        </Title>
        <Chevron visible={visible}>
          {visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Chevron>
      </HeaderDiv>
      {visible ? (
        <div style={{ width: 'full', overflow: 'auto', flex: '1 1 0%' }}>
          {children}
        </div>
      ) : null}
    </SidebarItemDiv>
  );
};
