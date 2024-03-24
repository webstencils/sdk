import MuiAccordionSummary, {
  AccordionSummaryProps as MuiAccordionSummaryProps
} from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export type AccordionSummaryProps = MuiAccordionSummaryProps & {
  label?: string;
  icon?: React.ReactNode;
  align?: 'left' | 'right';
};

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props}>
    {props.label && (
      <>
        {props.icon && props.icon}
        <Typography sx={{ paddingLeft: props.icon ? '0.5rem' : '0' }}>
          {props.label}
        </Typography>
      </>
    )}

    {props.children}
  </MuiAccordionSummary>
))(({ theme, align }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  display: 'flex',
  flexDirection: align === 'right' ? 'row-reverse' : 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
    // margin: '0px'
  }
}));
