import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useNode } from '@webstencils/core';
import React from 'react';

import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarTextInput } from './ToolbarTextInput';

const Title = styled.h4({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'rgba(128, 128, 128, 1)'
});

export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
};
export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue
  } = useNode((node) => ({
    propValue: node.data.props[propKey]
  }));
  const value = Array.isArray(propValue) ? propValue[index] : propValue;

  return (
    <Grid item xs={full ? 12 : 6}>
      <div style={{ marginBottom: '0.5rem' }}>
        {['text', 'color', 'bg', 'number'].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value;
                } else {
                  props[propKey] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        ) : type === 'slider' ? (
          <>
            {props.label ? <Title>{props.label}</Title> : null}
            <Slider
              size="small"
              value={parseInt(value) || 0}
              valueLabelDisplay="auto"
              onChange={
                ((_, value: number) => {
                  setProp((props: any) => {
                    if (Array.isArray(propValue)) {
                      props[propKey][index] = onChange
                        ? onChange(value)
                        : value;
                    } else {
                      props[propKey] = onChange ? onChange(value) : value;
                    }
                  }, 1000);
                }) as any
              }
            />
          </>
        ) : type === 'radio' ? (
          <>
            {props.label ? <Title>{props.label}</Title> : null}
            <RadioGroup
              value={value || 0}
              onChange={(e) => {
                const value = e.target.value;
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : type === 'select' ? (
          <ToolbarDropdown
            title={props.label}
            value={value || ''}
            onChange={(value) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : null}
      </div>
    </Grid>
  );
};
