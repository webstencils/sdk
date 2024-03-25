import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { PropsWithChildren } from 'react';

export type DropdownEditorProps = PropsWithChildren<{
  label?: string;
  value: string;
  options?: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}>;

export const DropdownEditor = ({
  label,
  value,
  onChange,
  children,
  options = []
}: DropdownEditorProps) => {
  return (
    <FormControl variant="standard" size="small" fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {children ||
          options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
