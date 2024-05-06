import React, { useState } from 'react';
import { TextField } from '@radix-ui/themes';
import { PropertyEditorProps } from './PropertyEditorProps';

export function StringPropEditor(props: PropertyEditorProps) {
  const [value, setValue] = useState(props.value || '');

  const updateValue = (value: string) => {
    setValue(value);
    props.onChanged(value);
  };

  return (
    <TextField.Root
      size={props.size}
      value={value}
      onChange={(event) => updateValue(event.target.value)}
    />
  );
}
