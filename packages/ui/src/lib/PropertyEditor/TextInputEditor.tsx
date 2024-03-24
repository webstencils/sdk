import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { PropertyEditorType } from './PropertyEditorType';

export type TextInputEditorProps = {
  label?: string;
  type: PropertyEditorType;
  onChange: (value: string) => void;
  value?: string;
};

export const TextInputEditor = ({
  onChange,
  value,
  label,
  type,
  ...props
}: TextInputEditorProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <TextField
        label={label}
        value={internalValue || ''}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onChange((e.target as HTMLInputElement).value);
          }
        }}
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        onBlur={(e) => {
          onChange(e.target.value);
        }}
        margin="dense"
        variant="standard"
        size="small"
        fullWidth
        {...props}
      />
    </div>
  );
};
