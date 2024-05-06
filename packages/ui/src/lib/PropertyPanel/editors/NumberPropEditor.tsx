import React, { useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { PropertyEditorProps } from './PropertyEditorProps';

export function NumberPropEditor(props: PropertyEditorProps<number>) {
  const [value, setValue] = useState(props.value);

  const updateValue = (str: string) => {
    let value = parseInt(str, 10) || null;

    if (value !== null) {
      if (props.propertyDef.min !== undefined) {
        if (value && value < props.propertyDef.min)
          value = props.propertyDef.min;
      }

      if (props.propertyDef.max !== undefined) {
        if (value && value > props.propertyDef.max)
          value = props.propertyDef.max;
      }
    }

    setValue(value);
    props.onChanged(value);
  };

  return (
    <TextField.Root
      type="number"
      min={props.propertyDef.min}
      max={props.propertyDef.max}
      size={props.size}
      value={value || ''}
      onChange={(event) => updateValue(event.target.value)}
    />
  );
}
