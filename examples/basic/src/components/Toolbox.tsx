import React from 'react';
import { useEditor, Element } from '@webstencils/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MaterialButton from '@mui/material/Button';

import { Button } from './user/Button';
import { Card } from './user/Card';
import { Container } from './user/Container';
import { Text } from './user/Text';

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Box px={2} py={2}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Box pb={2}>
          <Typography>Drag to add</Typography>
        </Box>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) =>
              connectors.create(ref, <Button text="Click me" size="small" />)
            }
            variant="contained"
            data-cy="toolbox-button"
          >
            Button
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Text text="Hi world" />)}
            variant="contained"
            data-cy="toolbox-text"
          >
            Text
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) =>
              connectors.create(
                ref,
                <Element canvas is={Container} padding={20} />
              )
            }
            variant="contained"
            data-cy="toolbox-container"
          >
            Container
          </MaterialButton>
        </Grid>
        <Grid container direction="column" item>
          <MaterialButton
            ref={(ref: any) => connectors.create(ref, <Card />)}
            variant="contained"
            data-cy="toolbox-card"
          >
            Card
          </MaterialButton>
        </Grid>
      </Grid>
    </Box>
  );
};
