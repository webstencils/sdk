import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

function StyledRadio(props) {
  return <Radio disableRipple size="small" {...props} />;
}

export const ToolbarRadio = ({ value, label }: any) => {
  return (
    <FormControlLabel value={value} control={<StyledRadio />} label={label} />
  );
};
