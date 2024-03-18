import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

export const ToolbarDropdown = ({ title, value, onChange, children }: any) => {
  return (
    <FormControl variant="standard" size="small">
      <InputLabel>{title}</InputLabel>
      <Select native value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </Select>
    </FormControl>
  );
};
