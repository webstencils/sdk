import { useNode } from '@webstencils/core';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import React from 'react';
import { TextInputEditor } from './TextInputEditor';
import { RadioGroupEditor } from './RadioGroupEditor';
import { DropdownEditor } from './DropdownEditor';
import { BooleanEditor } from './BooleanEditor';
import { PropertyEditorType } from './PropertyEditorType';
import { ColorEditor } from './ColorEditor';
import { PaddingEditor } from './PaddingEditor';
import { MarginEditor } from './MarginEditor';

const Title = styled.h4({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'rgba(128, 128, 128, 1)'
});

export type PropertyEditorProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey: string;
  index?: number;
  children?: React.ReactNode;
  type: PropertyEditorType;
  options?: Array<{ value: string; label: string }>;
  onChange?: (value: any) => any;
};

export const PropertyEditor = ({
  full = false,
  propKey,
  type,
  onChange,
  index = 0,
  ...props
}: PropertyEditorProps) => {
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
        {/*// todo: review values*/}
        {['text', 'number'].includes(type) ? (
          <TextInputEditor
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
        ) : type === 'color' ? (
          <ColorEditor
            {...props}
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
            {/* todo: move to separate editor */}
            {props.label ? <Title>{props.label}</Title> : null}
            <Slider
              size="small"
              value={parseInt(value) || 0}
              valueLabelDisplay="auto"
              onChange={
                ((_: Event, value: number) => {
                  console.log(propKey, value, props);
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
          <RadioGroupEditor
            label={props.label}
            value={value || ''}
            options={props.options}
            onChange={(value) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : type === 'select' ? (
          <DropdownEditor
            label={props.label}
            value={value || ''}
            options={props.options}
            onChange={(value) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
            {...props}
          />
        ) : type === 'switch' ? (
          <BooleanEditor
            label={props.label}
            value={value}
            onChange={(value) =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange(value) : value)
              )
            }
          />
        ) : type === 'padding' ? (
          <PaddingEditor />
        ) : type === 'margin' ? (
          <MarginEditor />
        ) : null}
      </div>
    </Grid>
  );
};
