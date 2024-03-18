import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useNode } from '@webstencils/core';

// TODO: use standard Accordion styles

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion {...props} />
))(() => ({
  // border: `1px solid ${theme.palette.divider}`,
  background: 'transparent',
  boxShadow: 'none',
  '&:before': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },
  '&.Mui-expanded': {
    margin: '0 0',
    minHeight: '40px',
    '&:before': {
      opacity: '1'
    },
    '& + .MuiAccordion-root:before': {
      display: 'block'
    }
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary {...props} />
))(() => ({
  'min-height': '36px',
  padding: 0,
  display: 'flex',
  '& .MuiAccordionSummary-content': {
    margin: '0px'
  }
}));

export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {})
  }));
  return (
    <Accordion>
      <AccordionSummary>
        <div
          style={{
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            width: '100%'
          }}
        >
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={4}>
              <h5
                style={{ textAlign: 'left', fontWeight: 500 }}
                className="app-text-sm app-text-light-gray-1"
              >
                {title}
              </h5>
            </Grid>
            {summary && props ? (
              <Grid item xs={8}>
                <h5
                  style={{ textAlign: 'right' }}
                  className="app-text-sm app-text-light-gray-2"
                >
                  {summary(
                    props.reduce((acc: any, key: any) => {
                      acc[key] = nodeProps[key];
                      return acc;
                    }, {})
                  )}
                </h5>
              </Grid>
            ) : null}
          </Grid>
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ padding: '0px 24px 20px' }}>
        <Grid container spacing={1}>
          {children}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
