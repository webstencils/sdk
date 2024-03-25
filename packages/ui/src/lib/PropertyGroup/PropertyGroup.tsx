import Grid from '@mui/material/Grid';
import { PropsWithChildren } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '../Accordion';

export type PropertyGroupProps = PropsWithChildren<{
  title: string;
}>;

export const PropertyGroup = ({ title, children }: PropertyGroupProps) => {
  return (
    <Accordion
      sx={{
        border: 'none'
      }}
    >
      <AccordionSummary
        align="right"
        sx={{
          backgroundColor: 'background.paper',
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        {title}
      </AccordionSummary>

      <AccordionDetails sx={{ borderTop: 'none', padding: '8px 24px' }}>
        <Grid container spacing={1}>
          {children}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
