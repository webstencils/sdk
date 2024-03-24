import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import RadioGroup from '@mui/material/RadioGroup';

export type RadioGroupEditorProps = PropsWithChildren<{
  label?: string;
  value?: string;
  options?: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}>;

const Title = styled.h4({
  margin: 0,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'rgba(128, 128, 128, 1)'
});

export const RadioGroupEditor = ({
  label,
  value,
  onChange,
  children,
  options = []
}: RadioGroupEditorProps) => {
  return (
    <>
      {label ? <Title>{label}</Title> : null}
      <RadioGroup value={value || 0} onChange={(e) => onChange(e.target.value)}>
        {children ||
          options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              control={<Radio disableRipple size="small" />}
              label={opt.label}
            />
          ))}
      </RadioGroup>
    </>
  );
};
