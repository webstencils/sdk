import FormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';

export type BooleanEditorProps = {
  value: boolean;
  label?: string;
  onChange: (value: boolean) => void;
};

export function BooleanEditor(props: BooleanEditorProps) {
  return (
    <FormControlLabel
      value={props.value}
      control={
        <MuiSwitch
          size="small"
          checked={props.value}
          onChange={(e) => props.onChange(e.target.checked)}
        />
      }
      label={props.label}
    />
  );
}
