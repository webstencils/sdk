import React from 'react';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNode } from '@webstencils/core';
import Paper from '@mui/material/Paper';
import { MuiColorInput as ColorPicker } from 'mui-color-input';

export const Container = ({ background, padding, children, ...props }: any) => {
  const {
    connectors: { connect, drag }
  } = useNode();
  return (
    <Paper
      {...props}
      ref={(ref: any) => connect(drag(ref))}
      style={{ margin: '5px 0', background, padding: `${padding}px` }}
    >
      {children}
    </Paper>
  );
};

export const ContainerSettings = () => {
  const {
    background,
    padding,
    actions: { setProp }
  } = useNode((node) => ({
    background: node.data.props.background,
    padding: node.data.props.padding
  }));

  return (
    <div>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Background</FormLabel>
        <ColorPicker
          name="background-color"
          value={background}
          onChange={(color: any) => {
            setProp((props: any) => (props.background = color), 500);
          }}
        />
      </FormControl>
      <FormControl fullWidth={true} margin="normal" component="fieldset">
        <FormLabel component="legend">Padding</FormLabel>
        <Slider
          defaultValue={padding}
          onChange={(_, value) =>
            setProp((props: any) => (props.padding = value), 500)
          }
        />
      </FormControl>
    </div>
  );
};

export const ContainerDefaultProps = {
  background: '#ffffff',
  padding: 3
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings
  }
};
