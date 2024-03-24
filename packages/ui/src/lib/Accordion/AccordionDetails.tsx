import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),
  padding: theme.spacing(0),
  borderTop: '1px solid rgba(0, 0, 0, .125)',

  display: 'flex',
  flex: '1 1 0%',
  flexDirection: 'column'
}));
